"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "@components/svg/seller/icons";
import { useWithdrawFundsMutation } from "@/api/affiliate";
import { useGetPaymentMethodsQuery } from "@/api/affiliate";
import useAuthStore from "@/zustand/authStore";
import { useLocale } from "next-intl";
import { showsuccess } from "@/utils/showPopup";
import { Button, Input, Loader } from "rizzui";
import { countryToCurrencyMap } from "@/utils/currencymapper";
import { useProfileQuery } from "@/api/user";
import Link from "next/link";

type WithdrawFormInputs = {
  amount: number;
};

const WithdrawPage: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WithdrawFormInputs>();
  const searchParams = useSearchParams();
  const localActive = useLocale();

  const currentBalance = searchParams.get("currentBalance");

  const { mutateAsync, isPending: isWithdrawing } = useWithdrawFundsMutation();
  const {
    userData: { user_id },
  } = useAuthStore();

  const { data: profile, isFetching: isFetchingUser } = useProfileQuery();
  const userCurrency = profile?.data?.default_currency;

  // Fetch payment methods
  const { data: paymentMethodData, isLoading: isLoadingPaymentMethods } =
    useGetPaymentMethodsQuery(String(user_id));

  // Check if user has payment methods
  const hasPaymentMethods =
    paymentMethodData?.data &&
    Array.isArray(paymentMethodData.data) &&
    paymentMethodData.data.length > 0;

  const onSubmit: SubmitHandler<WithdrawFormInputs> = async (data) => {
    if (!hasPaymentMethods) {
      return; // Prevent withdrawal if no payment methods
    }

    const withdrawData = {
      user_id: parseInt(user_id ?? "0"),
      amount: data.amount,
    };
    await mutateAsync(withdrawData)
      .then(() => showsuccess("Withdrawal successful"))
      .then(() => router.push(`/${localActive}/affiliate/dashboard`));
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="container mx-auto p-8">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {currentBalance && (
            <div onClick={handleGoBack} className="cursor-pointer">
              <ArrowLeft className="text-[#49454F] stroke-[#49454F]" />
            </div>
          )}
          <h1 className="text-2xl text-[#49454F] font-bold">
            Funds Withdrawal
          </h1>
        </div>

        <Link href={`/${localActive}/affiliate/withdrawal/payment`}>
          <Button className="bg-[#BE1E2D] text-white">
            Add Payment Method
          </Button>
        </Link>
      </div>

      <div className="flex flex-col items-center h-screen p-4">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Available Balance:
            </label>
            <div className="bg-gray-100 p-3 rounded-lg text-green-600 shadow-sm">
              {isFetchingUser ? (
                <Loader />
              ) : (
                <>
                  {countryToCurrencyMap(userCurrency!)}
                  {currentBalance || profile?.data?.wallet.available_balance}
                </>
              )}
            </div>
          </div>

          {/* Form starts here */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Amount to Withdraw:
              </label>
              <Input
                type="text"
                {...register("amount", {
                  required: "Amount is required",
                  min: {
                    value: 1,
                    message: "Amount must be greater than zero",
                  },
                })}
                placeholder="Enter Amount to withdraw"
                inputClassName={`w-full p-3 rounded-lg border ${
                  errors.amount ? "border-red-500" : "border-gray-300"
                } shadow-sm`}
                disabled={!hasPaymentMethods && !isLoadingPaymentMethods}
              />
              {errors.amount && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.amount.message}
                </p>
              )}
            </div>

            {/* Payment method warning message */}
            {!isLoadingPaymentMethods && !hasPaymentMethods && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-amber-700 text-sm">
                  <span className="font-semibold">
                    No payment method found!
                  </span>{" "}
                  Please add a payment method before withdrawing funds.
                </p>
              </div>
            )}

            <Button
              type="submit"
              className="bg-[#BE1E2D] text-white mt-4 rounded"
              disabled={
                isWithdrawing ||
                (!hasPaymentMethods && !isLoadingPaymentMethods)
              }
              isLoading={isWithdrawing}
            >
              Withdraw
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WithdrawPage;
