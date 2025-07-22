"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Input } from "rizzui";
import { Lock } from "@icons";
import Image from "next/image";
import { useGetCountryQuery } from "@/api/country";
import { getAvailablePaymentMethods } from "@/utils";
import Skeleton from "react-loading-skeleton";

function ShippingAddress({
  profileFeed,
  selectedAddress,
  setSelectedAddress,
  errors,
  register,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  userCountryId,
  onPaymentMethodChange,
}: any) {
  // Fetch the list of countries
  const { data: countryData, isPending: loadingCountry } = useGetCountryQuery();
  const countries = useMemo(() => countryData?.data ?? [], [countryData]);

  // Get available payment methods for the user's country
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);

  useEffect(() => {
    if (userCountryId && countries.length > 0) {
      const availableMethods = getAvailablePaymentMethods(userCountryId);
      const filteredMethods = availableMethods.map((method) => ({
        id: method === "paystack" ? 3 : 5, // Assign IDs based on method name
        name: method === "paystack" ? "PayStack" : "Authorize.net",
      }));
      setPaymentMethods(filteredMethods);

      // Pre-select the first available method
      if (filteredMethods.length > 0) {
        setSelectedPaymentMethod(filteredMethods[0].id);
        onPaymentMethodChange(filteredMethods[0].id); // Notify parent about the selected method
      }
    }
  }, [
    userCountryId,
    countries,
    onPaymentMethodChange,
    setSelectedPaymentMethod,
  ]);

  // Handle payment method selection
  const handlePaymentMethodChange = (methodId: number) => {
    setSelectedPaymentMethod(methodId);
    onPaymentMethodChange(methodId); // Notify parent about the selected method
  };

  return (
    <div className="flex-1 flex flex-col gap-7">
      <div className="p-[28px] lg:p-6 bg-white rounded">
        <h4 className="text-base-bold">Shipping Address</h4>

        <div className="space-y-3 mt-[30px]">
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

        <div className="mt-8">
          <label className="flex">
            <input
              type="radio"
              name="address"
              className="w-[14px] h-[14px] mr-[10px] rounded-full focus:ring-0 text-primary-light"
              value="new"
              checked={selectedAddress === 0}
              onChange={() => setSelectedAddress(0)}
            />

            <p className="text-[#4F4F4F] text-small-regular">
              Create new Shipping Address
            </p>
          </label>
        </div>
      </div>

      {selectedAddress === 0 && (
        <div className="p-[28px] bg-white rounded">
          <h4 className="text-base-bold">New Shipping Address</h4>

          <div className="gap-[18px] mt-[30px] grid grid-cols-2">
            <div className="">
              <Input
                label="First Name"
                type="text"
                placeholder="Enter your firstname"
                inputClassName={`${
                  errors.first_name && "border-2 border-red-500"
                } `}
                {...register("first_name")}
                error={errors.first_name?.message}
                errorClassName="text-red-500"
              />
            </div>

            <div className="">
              <Input
                label="Last Name"
                type="text"
                placeholder="Enter your lastname"
                inputClassName={`${
                  errors.last_name && "border-2 border-red-500"
                }`}
                {...register("last_name")}
                error={errors.last_name?.message}
                errorClassName="text-red-500"
              />
            </div>

            <div className="col-span-2">
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                inputClassName={`${errors.email && "border-2 border-red-500"}`}
                {...register("email")}
                error={errors.email?.message}
                errorClassName="text-red-500"
              />
            </div>

            <div className="col-span-2 space-y-[18px]">
              <Input
                label="Street Address"
                type="text"
                placeholder="Enter your address"
                inputClassName={`${
                  errors.street_address && "border-2 border-red-500"
                }`}
                {...register("street_address")}
                error={errors.street_address?.message}
                errorClassName="text-red-500"
              />

              <Input
                type="text"
                placeholder=" "
                errorClassName="text-red-500"
              />
            </div>

            <div className="">
              <Input
                label="State/Province"
                type="text"
                placeholder="Enter your state"
                inputClassName={`${errors.state && "border-2 border-red-500"}`}
                {...register("state")}
                error={errors.state?.message}
                errorClassName="text-red-500"
              />
            </div>

            <div className="">
              <Input
                label="City"
                type="text"
                placeholder="Enter your city"
                inputClassName={`${errors.city && "border-2 border-red-500"}`}
                {...register("city")}
                error={errors.city?.message}
                errorClassName="text-red-500"
              />
            </div>

            <div className="">
              <Input
                label="Zip/Postal Code"
                type="text"
                placeholder="Enter your postal code"
                inputClassName={`${errors.zip && "border-2 border-red-500"}`}
                {...register("zip")}
                error={errors.zip?.message}
                errorClassName="text-red-500"
              />
            </div>

            <div className="">
              <Input
                label="Phone"
                type="text"
                placeholder="Enter your phone number"
                inputClassName={`${errors.phone && "border-2 border-red-500"}`}
                {...register("phone")}
                error={errors.phone?.message}
                errorClassName="text-red-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Payment Method Section */}
      <div className="p-[28px] lg:p-6 bg-white rounded flex flex-col gap-7">
        <div className="flex flex-col gap-7">
          <h4 className="text-base-bold">Payment Method</h4>

          <div className="flex flex-col gap-7 lg:gap-5">
            {loadingCountry ? (
              <>
                <Skeleton className="h-[100px]" />
              </>
            ) : (
              paymentMethods.map((item: any, index: number) => (
                <label
                  key={index}
                  className="flex items-start justify-between gap-2 border border-[#B2BCCA] rounded px-5 py-4 lg:px-4 lg:py-2 cursor-pointer"
                >
                  <div className="flex-1 flex slg:flex-col gap-5 lg:gap-2">
                    <div className="flex gap-[10px]">
                      <input
                        type="radio"
                        className="w-[14px] h-[14px] border border-[#DEE2E7] rounded-full mt-[5px] focus:ring-0 text-primary-light"
                        name="payment"
                        value={item.id}
                        checked={selectedPaymentMethod === item.id}
                        onChange={() => () =>
                          handlePaymentMethodChange(item.id)}
                      />
                      <h5 className="text-[16px] font-semibold">{item.name}</h5>
                    </div>
                    <div className="max-w-[335px]">
                      <p className="text-[#4F4F4F] text-[14px]">
                        You will be redirected to the {item.name} website after
                        submitting your order
                      </p>
                    </div>
                  </div>
                  <div className="self-center overflow-hidden">
                    <Image
                      src={`${
                        item.name === "PayStack"
                          ? "/img/paystack.png"
                          : "/img/authorize.net.png"
                      }`}
                      alt={item.name}
                      width={60}
                      height={50}
                      className="object-contain h-full"
                    />
                  </div>
                </label>
              ))
            )}
          </div>

          <div className="flex items-center gap-[11px]">
            <div className="flex-shrink-0 flex items-center justify-center w-[28px] h-[28px] rounded-full border border-[#DB4444]">
              <Lock className="w-[11px] h-[13px] fill-[#DB4444]" />
            </div>
            <p className="text-[#828282] text-[12px]">
              We protect your payment information using encryption to provide
              bank-level security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingAddress;
