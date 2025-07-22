"use client";
import React, { useState } from "react";
import { PinCode, Button } from "rizzui";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import { useSearchParams } from "next/navigation";
import { loginVerify } from "@/lib/api";
import { useUserStore } from "@/zustand/userStore";
import Link from "next/link";
import { emailVerification } from "@/lib/api";
import { useResendCodeMutation, useVerifyLoginMutation } from "@/api/auth";
import { showerror, showsuccess } from "@/utils/showPopup";
import useAuthStore from "@/zustand/authStore";
import Image from "next/image";
import BaskervilleHeading from "@/components/common/BaskervilleHeading";
import SpaceBetween from "@/components/common/SpaceBetween";

const VerifyOtp = () => {
  const router = useRouter();
  const localActive = useLocale();
  const searchParams = useSearchParams();
  const currentEmail = searchParams.get("email");
  const redirect = searchParams.get("redirect");
  const context = searchParams.get("context");
  const isAffiliate = searchParams.get("isAffiliate");
  const [otp, setOtp] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync: verifyLogin, isPending: verifyingLogin } =
    useVerifyLoginMutation();
  const { mutateAsync: resendCode, isPending: resendingCode } =
    useResendCodeMutation();

  const { setUser, resetUser } = useUserStore();
  const { login } = useAuthStore();

  const handleOTPSubmit = async () => {
    if (!otp) {
      return showerror("Please enter the OTP");
    }
    setIsSubmitting(!isSubmitting);
    try {
      if (context === "login") {
        const result = await loginVerify({
          email: currentEmail ?? "",
          code: otp,
        });

        if (result?.status) {
          resetUser();
          // setUser({
          //   user_type: result?.data?.user_type,
          //   token: result?.data?.token,
          //   is_logged_in: true,
          //   user_id: result?.data?.user_id,
          // });

          showsuccess("Otp verified Successfully 🥳");

          router.push(`/${localActive}`);
        }
      } else {
        const result = await emailVerification({
          email: currentEmail ?? "",
          code: otp,
        });

        if (result?.status) {
          setUser(result?.data);
          login(result.data);
          showsuccess("Otp verified Successfully 🥳");

          if (isAffiliate === "true") {
            router.push(`/${localActive}/affiliate/dashboard`);
          } else {
            router.push(`/${localActive}/`);
          }
        }
      }
    } catch (error: any) {
      showerror(`${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="my-form">
      <div>
        <Image
          alt="mail-icon"
          className="mx-auto object-cover w-[200px]"
          src="/img/mail.png"
          width={300}
          height={300}
        />
        <BaskervilleHeading text="Check your Email" className="text-center" />
      </div>
      <div className="mb-4">
        <p className="text-center text-[#424242] font-public-sans text-[1.2rem]">
          We sent a verification code to {currentEmail}
        </p>
      </div>
      <div className="space-y-5">
        <PinCode length={6} size="lg" setValue={(val: any) => setOtp(val)} />
        <Button
          className="w-full text-white  !text-base-bold !bg-primary"
          rounded="lg"
          type="button"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          onClick={handleOTPSubmit}
        >
          Verify
        </Button>
      </div>

      <SpaceBetween className="font-public-sans lg:flex-col">
        <p className="flex gap-2 text-[14px] font-[500]">
          Didn&apos;t Receive Email?
          <span
            className="text-main underline cursor-pointer hover:opacity-80 hover:transition-all font-[800]"
            onClick={async () => {
              await resendCode({ email: currentEmail! }).then(() =>
                showsuccess(
                  `Verification code sent to your inbox. Please check ${currentEmail}`
                )
              );
            }}
          >
            Click to resend
          </span>
        </p>

        <Link
          className="text-[14px] font-[500] underline cursor-pointer hover:opacity-80 hover:transition-all"
          href={"seller-login"}
        >
          Back to Login
        </Link>
      </SpaceBetween>
    </div>
  );
};

export default VerifyOtp;
