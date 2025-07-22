import { ArrowBack, Check2 } from "@/components/svg";
import CartItem from "./item";
import { Button } from "rizzui";
import { useClearCartItemMutation } from "@/api/fetchAllCartItem";
import useStore from "@/zustand/useStore";
import { IUserStore, useUserStore } from "@/zustand/userStore";
import { Cart } from "@interfaces/cart";
import Loader from "@components/common/loader";
import Link from "next/link";
import { showsuccess } from "@/utils/showPopup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

// const international_shipping_options = [
//   {
//     id: 1,
//     name: "Azany Shipping",
//     delivery_time: "2-3 working days",
//     cost: "free",
//   },
//   {
//     id: 2,
//     name: "DHL Express",
//     delivery_time: "Next day delivery",
//     cost: "$17.99",
//   },
// ];

// const local_shipping_options = [
//   {
//     id: 1,
//     name: "DHL",
//     delivery_time: "2-3 working days",
//     cost: "$7.99",
//   },
//   {
//     id: 2,
//     name: "DHL Express",
//     delivery_time: "4-7 working days",
//     cost: "$3.99",
//   },
// ];

function CartList({ cartResponse }: { cartResponse: Cart }) {
  const userStore = useStore<IUserStore, IUserStore>(
    useUserStore,
    (state: any) => state
  );
  const { mutateAsync: clearCart, isPending: isClearCartPending } =
    useClearCartItemMutation();
  const router = useRouter();
  const localActive = useLocale();

  let userID: number;
  userID = userStore?.user.user_id!;
  const isloading = isClearCartPending;

  // const [internationalShippingOption, setInternationalShippingOption] =
  //   useState(0);

  // const [localShippingOption, setLocalShippingOption] = useState(0);

  const isDisabled =
    !cartResponse?.international_items?.length &&
    !cartResponse?.local_items?.length;

  const handlecheckout = () => {
    router.push(`/${localActive}/checkout`);
  };

  return (
    <div className="flex-1 flex flex-col gap-[52px] bg-white border border-[#DEE2E7] px-5 py-[38px] rounded-md">
      {isloading && <Loader transparent />}

      <div className="">
        <div className="flex gap-4">
          <Check2 className="w-[24px] h-[24px] fill-[#00B517]" />
          <h5 className="text-xl font-medium text-[#00B517]">
            Shipped Internationally
          </h5>
        </div>

        <div className="mt-9 [&>div]:pb-[60px] [&>div]:pt-[24px] [&>div]:border-b [&>div]:border-[#DEE2E7]">
          {cartResponse?.international_items?.map((item, index) => (
            <CartItem
              key={index}
              data={item}
              removeParam={{ user_id: userID, cart_id: item.id }}
            />
          ))}

          {/* {cartResponse?.international_items?.length !== 0 && (
            <div className="w-full flex flex-col gap-2 !p-3 mt-4 rounded shadow-[0_2px_6px_0_#00000024]">
              <p className="text-black font-bold">
                International Shipping Options
              </p>

              {international_shipping_options.map((item, index) => (
                <label
                  className="flex justify-between items-center border border-[#B2BCCA] rounded px-4 py-1"
                  key={index}
                >
                  <div className="flex gap-6">
                    <input
                      type="radio"
                      className="w-[14px] h-[14px] border border-[#828282] rounded-full mt-2 focus:ring-0 text-primary-light"
                      name="shipping_option"
                      value={item.id}
                      checked={internationalShippingOption === item.id}
                      onChange={() => {
                        setInternationalShippingOption(item.id);
                      }}
                    />
                    <div className="text-[#4F4F4F] text-[14px]">
                      <h5 className="font-bold">{item.name}</h5>
                      <p className="font-medium">{item.delivery_time}</p>
                    </div>
                  </div>

                  <span className="text-[#4F4F4F] font-medium">
                    {item.cost}
                  </span>
                </label>
              ))}
            </div>
          )} */}
        </div>
      </div>

      {cartResponse?.local_items?.length !== 0 ? (
        <div className="">
          <div className="flex space-x-4">
            <Check2 className="w-[24px] h-[24px] fill-[#00B517]" />
            <h5 className="text-xl font-medium text-[#00B517]">
              Shipped Locally
            </h5>
          </div>

          <div className="mt-9 ">
            {cartResponse?.local_items?.map((item, index) => (
              <CartItem
                key={index}
                data={item}
                removeParam={{ user_id: userID, cart_id: item.id }}
              />
            ))}

            {/* <div className="w-full flex flex-col gap-2 !p-3 mt-4 rounded shadow-[0_2px_6px_0_#00000024]">
              <p className="text-black font-bold">Local Shipping Options</p>

              {local_shipping_options.map((item, index) => (
                <label
                  className="flex justify-between items-center border border-[#B2BCCA] rounded px-4 py-1"
                  key={index}
                >
                  <div className="flex gap-6">
                    <input
                      type="radio"
                      className="w-[14px] h-[14px] border border-[#828282] rounded-full mt-2 focus:ring-0 text-primary-light"
                      name="shipping_option"
                      value={item.id}
                      checked={localShippingOption === item.id}
                      onChange={() => {
                        setLocalShippingOption(item.id);
                      }}
                    />
                    <div className="text-[#4F4F4F] text-[14px]">
                      <h5 className="font-bold">{item.name}</h5>
                      <p className="font-medium">{item.delivery_time}</p>
                    </div>
                  </div>

                  <span className="text-[#4F4F4F] font-medium">
                    {item.cost}
                  </span>
                </label>
              ))}
            </div> */}
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="flex sm:flex-col justify-between gap-5">
        <Button
          className="text-[#DB4444] !text-base-medium !font-public-sans whitespace-nowrap"
          variant="outline"
          onClick={async () => {
            await clearCart(userID).then((res) => {
              showsuccess("Cart cleared successfully");
            });
          }}
        >
          <span>Clear Cart</span>
        </Button>

        <div className="flex slg:flex-col gap-3">
          <Link
            className="text-[#DB4444] !text-base-medium !bg-transparent !h-fit !font-public-sans whitespace-nowrap flex items-center px-3 py-2 rounded-md underline"
            href={"/"}
          >
            <span>Continue to shopping</span>
          </Link>

          <Link href={`/${localActive}/checkout`}>
            <Button
              className="text-white !text-base-medium !bg-[#E02014] !h-[50px] !font-public-sans"
              type="button"
              onClick={handlecheckout}
              disabled={isDisabled}
            >
              <span>Continue to checkout</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartList;
