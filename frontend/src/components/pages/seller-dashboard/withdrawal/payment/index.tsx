"use client";

import { Button } from "rizzui";
import useAuthStore from "@/zustand/authStore";
import EmptyData from "@components/common/empty-data";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import Loader from "@/components/common/loader";
import { renderStatusBadge } from "@/components/common/custom-badge";
import { maskAccountNumber } from "@/utils";
import { ArrowLeft } from "@/components/svg/seller/icons";
import { useGetSellerPaymentMethodsQuery } from "@/api/seller";
import Link from "next/link";

const SellerPayment = () => {
  const { userData } = useAuthStore();
  const userId = String(userData?.user_id);
  const router = useRouter();
  const localActive = useLocale();

  // Fetch payment methods
  const {
    data: paymentMethodData,
    isLoading,
    error,
  } = useGetSellerPaymentMethodsQuery(String(userId));

  if (isLoading) {
    return <Loader transparent />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const paymentMethods = Array.isArray(paymentMethodData.data)
    ? paymentMethodData.data
    : [];

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="container max-w-[1024px] lg:p-0 p-8">
      <div onClick={handleGoBack} className="flex items-center space-x-3 mb-4">
        <div className="cursor-pointer">
          <ArrowLeft className="stroke-[#49454F] stroke-2 size-5" />
        </div>
        <h1 className="text-xl text-[#49454F] font-bold">Payment Methods</h1>
      </div>

      {paymentMethods.length === 0 ? (
        <>
          <EmptyData />
          <div className="flex justify-start mt-4">
            <Link href={`/${localActive}/seller/withdrawal/payment/add`}>
              <Button className="flex items-center bg-[#BE1E2D] text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add New
              </Button>
            </Link>
          </div>
        </>
      ) : (
        paymentMethods.map((method: any, index: number) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg py-4 px-6 mb-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div>
                {method.platform === "authorize" ? (
                  <h2 className="text-lg font-semibold text-[#49454F] capitalize">
                    {method.platform}
                  </h2>
                ) : (
                  <h2 className="text-lg font-semibold text-[#49454F]">
                    {method.bank_name}
                  </h2>
                )}
                <p className="text-sm text-[#0094FF]">
                  {maskAccountNumber(method.account_number)}
                </p>
              </div>
            </div>

            <div className="text-[#49454F]">
              {method.is_default === true && renderStatusBadge["default"]}
            </div>
          </div>
        ))
      )}

      {paymentMethods.length > 0 && (
        <div className="flex justify-start">
          <Button
            onClick={() =>
              router.push(`/${localActive}/seller/withdrawal/payment/add`)
            }
            className="flex items-center bg-[#BE1E2D] text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New
          </Button>
        </div>
      )}
    </div>
  );
};

export default SellerPayment;
