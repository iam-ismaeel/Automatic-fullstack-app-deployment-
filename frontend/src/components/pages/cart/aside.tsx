import { useLocale } from "next-intl";
import React, { useState } from "react";
import { Button } from "rizzui";
import { Cart } from "@interfaces/cart";
import { countryToCurrencyMap } from "@/utils/currencymapper";
import { formatPrice } from "@/utils/formatPrice";
import { useGetProfileQuery } from "@/api/fetchAllCartItem";
import { Profile } from "@/interfaces/profile";
import Link from "next/link";

function Aside({ data, userCurrency }: { data: Cart; userCurrency?: string }) {
  const localActive = useLocale();

  const { data: profileRes, isLoading: profLoad } = useGetProfileQuery();
  let profileFeed = profileRes?.data as Profile;

  const [selectedAddress, setSelectedAddress] = useState(0);

  const isDisabled =
    !data?.international_items?.length && !data?.local_items?.length;

  // Calculate total discount for international_items
  const totalInternationalDiscount = data?.international_items?.reduce(
    (total, item) => {
      return total + (item.product.discount_price || 0);
    },
    0
  );

  // Calculate total discount for local_items
  const totalLocalDiscount = data?.local_items?.reduce((total, item) => {
    return total + (item.product.discount_price || 0);
  }, 0);

  // Total discount (international + local)
  const totalDiscount =
    (totalInternationalDiscount || 0) + (totalLocalDiscount || 0);

  return (
    <aside className="w-[280px] md:w-full sticky top-[100px] space-y-3">
      <div className="border border-[#DEE2E7] bg-white p-4 rounded-md">
        <h4 className="text-[#505050] text-base-regular">Have a coupon?</h4>

        <div className="flex mt-2 border border-[#DEE2E7] rounded-md">
          <input
            type="text"
            className="w-full p-2 border-none rounded-md"
            placeholder="Enter coupon code"
          />
          <button
            className="min-w-[80px] font-public-sans border-l text-[#DB4444]"
            type="button"
          >
            Apply
          </button>
        </div>
      </div>

      <div
        className="border border-md border-[#DEE2E7] p-4 bg-white rounded-md divide-y"
        style={{
          boxShadow: "0px 4px 10px 0px #3838381A",
        }}
      >
        <div className="space-y-1 pb-[24px]">
          <div className="flex items-center justify-between">
            <span className="text-[#505050]">Total Intl Price:</span>
            <span className="text-[#505050]">
              {countryToCurrencyMap(userCurrency ? userCurrency : "")}
              {formatPrice(data?.total_international_price)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#505050]">Total Local Price:</span>
            <span className="text-[#505050]">
              {countryToCurrencyMap(userCurrency ? userCurrency : "")}
              {formatPrice(data?.total_local_price)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#505050]">Total Discount:</span>
            <span className="text-[#FA3434]">
              -{countryToCurrencyMap(userCurrency ? userCurrency : "")}
              {formatPrice(totalDiscount)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#505050]">Tax:</span>
            <span className="text-[#00B517]">
              +{countryToCurrencyMap(userCurrency ? userCurrency : "")}
              {formatPrice(0)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#505050]">Shipping:</span>
            <span className="text-[#00B517]">Free</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-[18px]">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[16px]">Total:</span>
            <span className="text-[20px] font-semibold">
              {countryToCurrencyMap(userCurrency ? userCurrency : "")}
              {formatPrice(
                data?.total_international_price + data?.total_local_price
              )}
            </span>
          </div>

          <Link href={`/${localActive}/checkout`}>
            <Button
              className="text-white !text-base-medium !bg-[#E02014] !min-w-full !h-[50px] !font-public-sans whitespace-nowrap"
              type="button"
              disabled={isDisabled}
            >
              <span>Continue to checkout</span>
            </Button>
          </Link>
        </div>
      </div>

      {profileFeed?.shipping_address.length !== 0 && (
        <div className="flex flex-col gap-[30px] border border-md border-[#DEE2E7] p-4 bg-white rounded-md divide-y">
          <h4 className="text-base-bold">Shipping Address</h4>

          <div className="flex flex-col gap-3">
            {profileFeed?.shipping_address.map((item: any, index: number) => (
              <label
                className="flex items-start border border-[#B2BCCA] rounded px-4 py-1"
                key={index}
              >
                <input
                  type="radio"
                  className="w-[14px] h-[14px] border border-[#DEE2E7] mr-[10px] rounded-full mt-2 focus:ring-0 text-primary-light"
                  name="address"
                  value={item.id}
                  checked={selectedAddress === item.id}
                  onChange={() => {
                    setSelectedAddress(item.id);
                  }}
                />
                <div className="text-[#4F4F4F] text-[14px] font-medium">
                  <h5 className="font-bold">{item.street_address}</h5>
                  <p className="">
                    {item.city} - {item.state}
                  </p>
                  <p className="">{item.street_address}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}

export default Aside;
