"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocale } from "next-intl";
import { toast } from "sonner";

import { Input, Button } from "rizzui";
import { ResetKey } from "@/components/svg";
import { forgotPassword } from "@/lib/api";
import { showerror, showsuccess } from "@/utils/showPopup";

const ForgetPassword = () => {
  const router = useRouter();
  const localActive = useLocale();

  const schema = yup
    .object({
      email: yup
        .string()
        .email("Please enter a Valid e-mail")
        .required("Email is required"),
    })
    .required();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleForm: SubmitHandler<Record<string, any>> = async (data) => {
    const { email } = data;
    try {
      const result = await forgotPassword({ email });
      showsuccess("Please Check your mail for further instructions");
    } catch (error: any) {
      console.log(error);
      showerror(`${error.message}`);
    }
  };

  return (
    <div className="my-form">
      <div className="mb-4">
        <div className="flex items-center justify-center pb-3">
          <ResetKey className="w-20 md:w-12 h-20 md:h-12" />
        </div>
        <h1 className="text-heading-1-bold smd:text-heading-2-bold sm:text-heading-4-bold">
          Forgot your Password?
        </h1>
        <h2 className="text-base-regular sm:text-small-regular text-[#687076]">
          Enter your email below for Password reset
        </h2>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(handleForm)}>
        <Input
          label="Email"
          type="email"
          placeholder="Enter your name"
          inputClassName={`${errors.email && "border-2 border-red-500"}`}
          {...register("email")}
          error={errors.email?.message}
          errorClassName="text-red-500"
        />
        <Button
          className="w-full text-white !text-base-bold !bg-primary"
          rounded="lg"
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Recover Password
        </Button>
      </form>
      <div className="flex justify-between items-center">
        <label className="font-degular_medium text-base">
          Remember your Password?
        </label>
        <Link
          href={`login`}
          className="underline decoration-primary underline-offset-2"
        >
          Log in
        </Link>
      </div>
    </div>
  );
};

export default ForgetPassword;
