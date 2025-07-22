import { Close } from "@/components/svg";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import { InternationalItem } from "@interfaces/cart";
import productplaceholder from "../../../../public/img/product-placeholder.png";
import { useUpdateCartMutation } from "@/api/fetchAllCartItem";
import { showsuccess } from "@/utils/showPopup";
import { removeCartItem } from "@/interfaces/common";
import Loader from "@/components/common/loader";
import { formatPrice } from "@/utils/formatPrice";
import { countryToCurrencyMap } from "@/utils/currencymapper";

function Item({
  item,
  removeParam,
}: {
  item: InternationalItem;
  removeParam: removeCartItem;
}) {
  let [quantity, setQuantity] = useState(item.quantity);
  const { mutateAsync: updateCart, isPending: isUpdatePending } =
    useUpdateCartMutation();
  const handleUpdateCartQuantity = async (quantity: number) => {
    let cart = {
      user_id: removeParam.user_id,
      product_id: item?.product.id,
      quantity: quantity,
    };
    await updateCart(cart).then((res) => {
      showsuccess(res.message);
      setQuantity(quantity);
    });
  };

  return (
    <Fragment>
      {isUpdatePending && <Loader transparent />}
      <div className="flex gap-[14px] border-b border-[#E0E0E0] pb-4">
        <div className="w-[80px] h-[80px] bg-[#F5F5F5] rounded flex items-center justify-center">
          <div className="relative w-[60px] h-[60px]">
            <Image
              src={item.product.image || productplaceholder}
              alt="product"
              fill
              sizes="100%"
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <p className="text-[12px] font-open-sans w-[80%]">
              {item.product.name}
            </p>

            <button>
              <Close className="w-4 h-4" />
            </button>
          </div>

          <div className="flex justify-between mt-[10px]">
            <div className="flex items-center">
              <button
                type="button"
                className="w-[29px] h-[29px] border border-[#B2BCCA] rounded font-open-sans"
                onClick={() => handleUpdateCartQuantity(quantity - 1)}
              >
                -
              </button>
              <p className="text-[12px] font-open-sans w-[29px] text-center">
                {quantity}
              </p>
              <button
                type="button"
                className="w-[29px] h-[29px] border border-[#B2BCCA] rounded font-open-sans"
                onClick={() => handleUpdateCartQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            <div className="">
              <p className="text-[12px] font-open-sans text-[#B2BCCA] line-through text-end">
                {countryToCurrencyMap(item ? item?.product?.currency : "")}
                {formatPrice(item?.product.product_price)}
              </p>
              <p className="text-[15px] font-semibold font-open-sans text-end">
                {countryToCurrencyMap(item ? item?.product?.currency : "")}
                {formatPrice(item?.product.price)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Item;
