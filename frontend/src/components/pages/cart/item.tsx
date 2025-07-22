import { Ellipsis, Trash } from "@/components/svg";
import Image from "next/image";
import React, { useState } from "react";
import { Dropdown } from "rizzui";
import { InternationalItem } from "@interfaces/cart";
import { addCartItem, removeCartItem } from "@interfaces/common";
import {
  useRemoveCartItemMutation,
  useUpdateCartMutation,
} from "@/api/fetchAllCartItem";
import productplaceholder from "../../../../public/img/product-placeholder.png";
import { useSaveForLater } from "@/api/user";
import { useStore } from "zustand";
import { useUserStore } from "@/zustand/userStore";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/common/loader";
import { showerror, showsuccess } from "@/utils/showPopup";
import { countryToCurrencyMap } from "@/utils/currencymapper";
import { formatPrice } from "@/utils/formatPrice";

// interface CartItemProps {
//   image: string;
//   title: string;
//   size: string;
//   color: string;
//   material: string;
//   seller: string;
//   price: number;
//   count: number;
//   onRemove?: () => void;
//   onSaveForLater?: () => void;
//   onIncrease?: () => void;
//   onDecrease?: () => void;
// }

function CartItem({
  data,
  removeParam,
}: {
  data: InternationalItem;
  removeParam: removeCartItem;
}) {
  let [quantity, setQuantity] = useState(data.quantity);
  const { mutateAsync: removeCartItem, isPending: isRemovingCartItem } =
    useRemoveCartItemMutation();
  const { mutateAsync: updateCart, isPending: isUpdatePending } =
    useUpdateCartMutation();
  let cart: addCartItem = {
    user_id: removeParam.user_id,
    product_id: data?.product.id,
    quantity: quantity,
  };
  const { mutateAsync: handleSaveForLater, isPending } = useSaveForLater();
  const userStore = useStore(useUserStore, (state: any) => state);
  const user = userStore?.user;
  const queryClient = useQueryClient();

  const userCurrency = userStore?.user.data?.default_currency;

  const handleUpdateCartQuantity = async (quantity: number) => {
    cart = {
      user_id: removeParam.user_id,
      product_id: data?.product.id,
      quantity: quantity,
    };
    await updateCart(cart).then((res) => {
      showsuccess(res.message);
      setQuantity(quantity);
    });
  };

  const saveForLater = () => {
    const productid = data?.product?.id;
    if (!user?.user_id) {
      showerror("Login to add product to wishlist");
      return;
    }
    if (!productid) return;
    handleSaveForLater({ user_id: user.user_id, product_id: productid }).then(
      () => {
        queryClient.invalidateQueries({
          queryKey: ["GET_CART_ITEM"],
        });
        showsuccess(`Saved for later`);
      }
    );
  };

  const isloading = isRemovingCartItem || isUpdatePending || isPending;

  return (
    <div className="flex md:flex-col justify-between items-start pb-[60px] md:pb-[20px] pt-[24px] border-b border-[#DEE2E7]">
      {isloading && <Loader transparent />}
      <div className="flex gap-[40px] md:gap-3 md:items-start">
        <div className=" bg-[#F7F7F7]  border border-[#E0E0E0] rounded-md p-2 md:p-1">
          <div className="relative size-[100px] md:size-[72px]">
            <Image
              src={data.product.image || productplaceholder}
              alt="product"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="space-y-[6px]">
          <h4 className="text-[#1C1C1C] text-[16px] font-medium md:font-normal">
            {data.product.name}
          </h4>
          <div className="text-[#8B96A5] text-[16px] md:text-[13px] font-normal">
            {/* <p className="">Size: 45, Color: Red, Material: Simple</p> */}
            <p>
              Seller: {data.seller.first_name} {data.seller.last_name}
            </p>
          </div>

          <div className="flex gap-3 md:hidden">
            <button
              className="border border-[#DEE2E7] p-2 rounded-md"
              style={{
                boxShadow: "0px 1px 2px 0px #38383814",
              }}
              onClick={async () => {
                await removeCartItem(removeParam).then((res) => {
                  const userData = res?.data;
                  showsuccess("Item successfully Removed from the cart ");
                });
              }}
            >
              <Trash className="w-[14px] h-[15px] fill-[#FF3333]" />
            </button>

            <button
              className="px-[10px] py-1 bg-white border border-[#DEE2E7] rounded-md text-[#8B909A] text-[13px]"
              style={{
                boxShadow: "0px 1px 2px 0px #38383814",
              }}
              onClick={saveForLater}
            >
              Save for later
            </button>
          </div>
        </div>

        <div className="md:block hidden">
          <Dropdown>
            <Dropdown.Trigger>
              <button>
                <Ellipsis />
              </button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={async () => {
                  await removeCartItem(removeParam).then((res) => {
                    const userData = res?.data;
                    showsuccess("Item successfully Removed from the cart");
                  });
                }}
              >
                Remove
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {}}>Save for later</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <div className="md:w-full">
        <div className="flex flex-col md:flex-row-reverse md:justify-between md:items-center md:mt-5 gap-2">
          <div className="text-[#1C1C1C] text-base font-medium text-end">
            <span>
              {countryToCurrencyMap(userCurrency!)}
              {formatPrice(data?.product.price)}
            </span>
          </div>

          <div className="flex bg-white border border-[#DEE2E7] rounded divide-x justify-center items-stretch">
            <button
              className="w-[40px] h-[40px] text-[#8B96A5]"
              onClick={() => handleUpdateCartQuantity(quantity - 1)}
            >
              -
            </button>

            <div className="w-[60px] text-center flex-1 flex items-center justify-center">
              <span className="text-[#1c1c1c] font-medium">{quantity}</span>
            </div>

            <button
              className="w-[40px] h-[40px] text-[#8B96A5] text-sm"
              onClick={() => handleUpdateCartQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
