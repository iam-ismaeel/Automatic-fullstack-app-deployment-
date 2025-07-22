import { Cart2 } from "@/components/svg";
import { IWishList } from "@/interfaces/api";
import Image from "next/image";
import React from "react";
import productplaceholder from "../../../../public/img/product-placeholder.png";
import { useMoveWishListToCart } from "@/api/user";
import { useUserStore } from "@/zustand/userStore";
import { showsuccess } from "@/utils/showPopup";
import { Loader } from "rizzui";
import { formatPrice } from "@/utils/formatPrice";
import { countryToCurrencyMap } from "@/utils/currencymapper";

function Saved({ product }: { product: IWishList }) {
  const { user } = useUserStore();
  const { mutateAsync: moveCartToWishList, isPending } =
    useMoveWishListToCart();
  const handleMoveToCart = async () => {
    try {
      await moveCartToWishList({
        user_id: user.user_id,
        product_id: product.product_id,
      });
      showsuccess("Item moved to cart");
    } catch (err) {}
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="bg-[#EEEEEE] w-full h-[240px] flex items-center justify-center rounded-md">
        <div className="relative w-[194px] h-[194px]">
          <Image
            src={product.product_image || productplaceholder}
            alt="product"
            className="object-contain"
            fill
          />
        </div>
      </div>

      <div className="flex flex-col gap-[10px]">
        <h4 className="font-inter text-[18px] font-semibold text-[#1C1C1C] leading-[22px]">
          {countryToCurrencyMap(product?.currency)}
          {formatPrice(product?.product_price)}
        </h4>
        <p className="text-[#606060] text-[16px] font-normal">
          {product.product_name}
        </p>

        <div className="flex justify-between items-center">
          <button
            onClick={handleMoveToCart}
            className="text-[#DB4444] text-[16px] flex items-center space-x-[14px] border border-[#DEE2E7] rounded-md py-[9px] px-[11px] min-w-[140px] justify-center"
            disabled={isPending}
          >
            {isPending ? (
              <Loader />
            ) : (
              <>
                <Cart2 className="fill-[#DB4444]" />
                <span>Move to cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Saved;
