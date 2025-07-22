import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Input } from "rizzui";
import useAuthStore from "@/zustand/authStore";
import { useUserStore } from "@/zustand/userStore";
import { showsuccess } from "@/utils/showPopup";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { countryToCurrencyMap } from "@/utils/currencymapper";
import {
  useGetSellerPaymentMethodsQuery,
  useWithdrawSellerFundsMutation,
} from "@/api/seller";

interface WithdrawBalanceModalProps {
  onClose: () => void;
  currentBalance: number;
}

interface WithdrawFormInputs {
  amount: number;
  method: string;
}

const WithdrawBalanceModal: React.FC<WithdrawBalanceModalProps> = ({
  onClose,
  currentBalance,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WithdrawFormInputs>();

  const { mutateAsync, isPending: isWithdrawing } =
    useWithdrawSellerFundsMutation();

  const {
    userData: { user_id },
  } = useAuthStore();

  const { userData } = useAuthStore();
  const userCurrency = userData?.data?.default_currency!;

  // Fetch payment methods
  const { data: paymentMethodData, isLoading: isLoadingPaymentMethods } =
    useGetSellerPaymentMethodsQuery(String(user_id));

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
      .then(() => showsuccess("Request sent successfully"))
      .then(() => onClose());
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[9999] bg-black bg-opacity-50"
      />

      {/* Form positioned on top of overlay */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fixed z-[10000] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[400px] flex flex-col gap-5"
      >
        <div className="mb-4 flex items-center space-x-3">
          <div onClick={onClose} className="cursor-pointer">
            <ArrowLeft className="text-[#49454F] stroke-[#49454F] size-4" />
          </div>

          <h1 className="text-[#49454F] font-bold">Funds Withdrawal</h1>
        </div>

        <div className="flex flex-col items-center p-4">
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Available Balance:
            </label>
            <div className="bg-gray-100 p-3 rounded-lg text-green-600 shadow-sm">
              {countryToCurrencyMap(userCurrency!)}
              {currentBalance}
            </div>
          </div>

          <div className="w-full">
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
              className="bg-[#BE1E2D] text-white mt-4"
              disabled={
                isWithdrawing ||
                (!hasPaymentMethods && !isLoadingPaymentMethods)
              }
              isLoading={isWithdrawing}
            >
              Request Withdrawal
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default WithdrawBalanceModal;
