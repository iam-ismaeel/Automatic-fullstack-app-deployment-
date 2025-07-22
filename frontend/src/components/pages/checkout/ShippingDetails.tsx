"use client";
import React, { Fragment, useState } from "react";
import { Button, Loader, Textarea } from "rizzui";

import { ChevronDown } from "@icons";
import useStore from "@/zustand/useStore";
import { IUserStore, useUserStore } from "@/zustand/userStore";
import Item from "@components/pages/checkout/item";
import { Cart } from "@/interfaces/cart";
import { countryToCurrencyMap } from "@/utils/currencymapper";
import Slider from "@/components/common/slider";
import { formatPrice } from "@/utils/formatPrice";
import { log } from "node:console";

function ShippingDetails({
  cartResponse,
  handleSubmit,
  isPending,
}: {
  cartResponse: Cart;
  handleSubmit: any;
  isPending: any;
}) {
  const [sliderValue, setSliderValue] = useState(50);
  const [openSections, setOpenSections] = useState([true, true, true]);

  const userStore = useStore<IUserStore, IUserStore>(
    useUserStore,
    (state: any) => state
  );

  const userCurrency = userStore?.user.data?.default_currency;

  let grandcurrency = cartResponse?.local_items
    ? cartResponse?.local_items[0]?.product?.currency
    : cartResponse?.international_items
    ? cartResponse?.international_items[0]?.product?.currency
    : "";
  grandcurrency = countryToCurrencyMap(userCurrency!);
  const userID = userStore?.user.user_id!;

  const handleToggle = (index: number) => {
    setOpenSections((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <Fragment>
      <aside className="w-[370px] md:w-full flex flex-col gap-5">
        {["Order Review", "Bill Summary"].map((title, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded"
            style={{
              boxShadow: "0px 2px 6px 0px #00000024",
            }}
          >
            {/* Toggle Header */}
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleToggle(idx)}
            >
              <h4 className="text-base-bold font-open-sans">{title}</h4>

              <ChevronDown
                className={`w-[13px] h-[9px] transition-transform duration-300 ${
                  openSections[idx] ? "" : "rotate-180"
                }`}
              />
            </div>

            {/* Content Section */}
            <div
              className={`transition-all duration-300 overflow-hidden ${
                openSections[idx]
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {idx === 0 && (
                <div className="flex flex-col gap-4 mt-1">
                  <p className="text-[12px] font-normal">
                    {cartResponse?.local_items?.length! +
                      cartResponse?.international_items?.length! || 0}{" "}
                    items in card
                  </p>

                  <div className="space-y-4">
                    {cartResponse?.local_items?.map(
                      (item: any, index: number) => (
                        <Item
                          key={index}
                          item={item}
                          removeParam={{ user_id: userID, cart_id: item.id }}
                        />
                      )
                    )}
                    {cartResponse?.international_items?.map(
                      (item: any, index: number) => (
                        <Item
                          key={index}
                          item={item}
                          removeParam={{ user_id: userID, cart_id: item.id }}
                        />
                      )
                    )}
                  </div>
                </div>
              )}

              {/* {idx === 1 && (
                  <div className="flex flex-col mt-4">
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={sliderValue}
                      onChange={setSliderValue}
                    />

                    <div className="flex mt-5">
                      <div className="flex-1">
                        <label className="font-inter text-[16px]">
                          Points Available
                        </label>
                        <h4 className="text-[20px] font-semibold h-[40px]">
                          3400
                        </h4>
                      </div>

                      <div className="flex-1">
                        <label className="font-inter">Enter points</label>
                        <input
                          type="number"
                          className="w-full bg-white h-[40px] rounded border border-[#DEE2E7]"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="">
                      <button className="w-full text-[#FF5C00] bg-white h-[40px] rounded mt-4 border border-[#DEE2E7] shadow-sm">
                        Apply
                      </button>
                    </div>
                  </div>
                )} */}

              {idx === 1 && (
                <div className="flex flex-col gap-6 mt-7">
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                      <span className="text-[#4F4F4F] text-[14px] font-open-sans">
                        Intl Order Subtotal
                      </span>

                      <span className="text-[#4F4F4F] text-[15px] font-open-sans font-semibold">
                        {grandcurrency}
                        {formatPrice(
                          cartResponse?.total_international_price || "0"
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-[#4F4F4F] text-[14px] font-open-sans">
                        Local Subtotal
                      </span>

                      <span className="text-[#4F4F4F] text-[15px] font-open-sans font-semibold">
                        {grandcurrency}
                        {formatPrice(cartResponse?.total_local_price || "0")}
                      </span>
                    </div>

                    {/* <div className="flex justify-between">
                      <div className="flex flex-col">
                        <span className="text-[#4F4F4F] text-[14px] font-open-sans">
                          Azany Points
                        </span>

                        <button className="text-[#DB4444] text-[12px] font-open-sans w-fit">
                          Remove
                        </button>
                      </div>

                      <span className="text-[#4F4F4F] text-[15px] font-open-sans font-semibold">
                        -{grandcurrency}
                        {formatPrice(0)}
                      </span>
                    </div> */}

                    <div className="flex justify-between">
                      <span className="text-[#4F4F4F] text-[14px] font-open-sans">
                        Shipping
                      </span>

                      <span className="text-[#4F4F4F] text-[15px] font-open-sans font-semibold">
                        {grandcurrency}
                        {formatPrice(0)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-[#4F4F4F] text-[14px] font-open-sans">
                        Tax
                      </span>

                      <span className="text-[#4F4F4F] text-[15px] font-open-sans font-semibold">
                        {grandcurrency}
                        {formatPrice(0)}
                      </span>
                    </div>
                  </div>

                  <div className="h-[1px] w-full bg-[#E0E0E0]" />

                  <div className="flex flex-col gap-5">
                    <div className="flex justify-between">
                      <span className="text-[16px] font-open-sans font-bold">
                        Grand Total
                      </span>

                      <span className="text-[16px] font-open-sans font-bold">
                        {grandcurrency}
                        {formatPrice(
                          cartResponse?.total_local_price +
                            cartResponse?.total_international_price
                        )}
                      </span>
                    </div>

                    <Textarea
                      label="Order Comment"
                      labelClassName="text-xs text-[#828282]"
                      placeholder="Type here"
                      textareaClassName="h-[65px] border-[#B2BCCA] ring-0"
                    />

                    <label
                      className="flex items-center"
                      htmlFor="acknowledge-checkbox"
                    >
                      <input
                        type="checkbox"
                        id="acknowledge-checkbox"
                        className="w-[12px] h-[12px] mr-[10px] text-primary-light outline-none focus:ring-0"
                      />
                      <span className="text-[14px] font-open-sans">
                        Please check to acknowledge our{" "}
                        <span className="text-[#DB4444]">
                          Privacy & Terms Policy
                        </span>
                      </span>
                    </label>

                    <Button
                      type="submit"
                      className="w-full text-[#F6F6F6] bg-[#DB4444] py-[10px] px-3 rounded-md font-bold font-open-sans"
                      disabled={isPending}
                      isLoading={isPending}
                      onClick={handleSubmit}
                    >
                      {`Pay ${grandcurrency}${formatPrice(
                        cartResponse?.total_local_price +
                          cartResponse?.total_international_price
                      )}`}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </aside>
    </Fragment>
  );
}

export default ShippingDetails;
