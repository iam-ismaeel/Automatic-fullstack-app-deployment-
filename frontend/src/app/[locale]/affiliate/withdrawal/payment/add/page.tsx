"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "@components/svg/seller/icons";
import * as Yup from "yup";
import AuthorizeNetForm from "@/components/common/AuthorizeNetForm";
import PayStackForm from "@/components/common/PayStackForm";
import { useAddBankAccountMutation } from "@/api/affiliate";
import useAuthStore from "@/zustand/authStore";
import { useLocale } from "next-intl";
import { showerror, showsuccess } from "@/utils/showPopup";
import { useProfileQuery } from "@/api/user";
import { getAvailablePaymentMethods } from "@/utils";
import { Button } from "rizzui";

interface PaymentFormFields {
  platform: string;
  bank_name?: string;
  account_number?: string;
  account_name?: string;
  routing_number?: string;
  is_default: boolean;
}

const validationSchema = Yup.object().shape({
  platform: Yup.string().required("Platform is required"),
  bank_name: Yup.string().when("type", {
    is: "Bank Transfer",
    then: (schema) => schema.required("Bank name is required"),
    otherwise: (schema) => schema.optional(),
  }),
  account_number: Yup.string().when("type", {
    is: "Bank Transfer",
    then: (schema) => schema.required("Account number is required"),
    otherwise: (schema) => schema.optional(),
  }),
  account_name: Yup.string().when("type", {
    is: "Bank Transfer",
    then: (schema) => schema.required("Account holder's name is required"),
    otherwise: (schema) => schema.optional(),
  }),
  is_default: Yup.boolean().required("Default Payment Method is required"), // Change to boolean
});

const AddPayment = () => {
  const [platform, setPlatform] = useState<string>("");
  const localActive = useLocale();

  const { data: profileDetail } = useProfileQuery();
  const countryId = profileDetail?.data?.country_id;

  // Get available payment methods based on the user's country
  const availableMethods = getAvailablePaymentMethods(countryId!);

  const methods = useForm<PaymentFormFields>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      platform: "",
      bank_name: "",
      account_number: "",
      account_name: "",
      routing_number: "",
      is_default: false,
    },
  }) as UseFormReturn<PaymentFormFields>;

  // If only one method is available, preselect it
  useEffect(() => {
    if (availableMethods.length === 1) {
      setPlatform(availableMethods[0]);
      methods.setValue(
        "platform" as keyof PaymentFormFields,
        availableMethods[0]
      );
    }
  }, [availableMethods, methods]);

  const router = useRouter();

  const { mutateAsync, isPending: isAddingPayment } =
    useAddBankAccountMutation();

  const {
    userData: { user_id },
  } = useAuthStore();

  const onSubmit = async (data: PaymentFormFields) => {
    const bankData = {
      user_id: parseInt(user_id ?? "0"),
      type: "bank_transfer",
      platform: data.platform,
      bank_name: data.bank_name,
      account_number: data.account_number,
      account_name: data.account_name,
      routing_number: data.routing_number,
      is_default: data.is_default,
    };

    await mutateAsync(bankData)
      .then(() => showsuccess("Account Added"))
      .then(() => router.push(`/${localActive}/affiliate/withdrawal/payment`))
      .catch(() => showerror("Something went wrong"));
  };

  const handleMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setPlatform(value);
    methods.setValue("platform" as keyof PaymentFormFields, value);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="container mx-auto lg:p-0 p-8">
      <div
        onClick={handleGoBack}
        style={{ cursor: "pointer" }}
        className="mb-4 flex items-center space-x-2"
      >
        <span>
          <ArrowLeft />
        </span>
        <h1 className="md:text-xl text-2xl text-[#49454F] font-bold ">
          Add New Payment Methods
        </h1>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="max-w-4xl w-full mx-auto"
        >
          <div className="space-y-4">
            <div>
              <label>Method Type :</label>
              <select
                {...methods.register("platform" as "platform")}
                onChange={handleMethodChange}
                className="w-full p-2 border rounded"
                value={platform}
              >
                <option value="">Select Method Type</option>
                {availableMethods.includes("authorize") && (
                  <option value="authorize">Bank Transfer</option>
                )}
                {availableMethods.includes("paystack") && (
                  <option value="paystack">Bank Transfer</option>
                )}
              </select>
              {methods.formState.errors.platform && (
                <p className="text-red-500">
                  {methods.formState.errors.platform.message}
                </p>
              )}
            </div>

            {platform === "authorize" && <AuthorizeNetForm />}
            {platform === "paystack" && <PayStackForm />}
          </div>

          <Button
            type="submit"
            className="bg-[#BE1E2D] text-white mt-4"
            disabled={isAddingPayment}
            isLoading={isAddingPayment}
          >
            Add Payment Method
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddPayment;
