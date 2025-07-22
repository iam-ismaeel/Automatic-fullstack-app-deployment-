"use client";
import React from "react";
import Link from "next/link";
import { Input, Password, Button } from "rizzui";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocale } from "next-intl";
import { ResetKey } from "@/components/svg";
import { resetPassword } from "@/lib/api";
import { toast } from "sonner";
import { showerror, showsuccess } from "@/utils/showPopup";

const ResetPassword = () => {
  const router = useRouter();
  const localActive = useLocale();
  const searchParams = useSearchParams();
  const currentEmail = searchParams.get("email");
  const token = searchParams.get("token");

  const schema = yup
    .object({
      password: yup.string().required("Password is required"),
      confirmPassword: yup.string().required("Password is required"),
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
    const { password, confirmPassword } = data;
    try {
      const result = await resetPassword({
        token: token ?? "",
        email: currentEmail ?? "",
        password,
        password_confirmation: confirmPassword,
      });
      showsuccess("Password reset Successfully 🥳");
      router.push(`/${localActive}/`);
    } catch (error: any) {
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
          Reset your password
        </h1>
        <h2 className="text-base-regular sm:text-small-regular text-[#687076]">
          Insert your new password
        </h2>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(handleForm)}>
        <Input
          label="Email"
          type="email"
          value={currentEmail ?? ""}
          inputClassName={`text-base-medium`}
          readOnly
        />
        <Password
          label="Password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Password
          label="Confirm Password"
          placeholder="Confirm your new Password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <Button
          className="w-full text-white  !text-base-bold !bg-primary"
          rounded="lg"
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Change Password
        </Button>
      </form>
      <div className="flex justify-between items-center">
        <label className=" text-base">Remember your Password?</label>
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

export default ResetPassword;
