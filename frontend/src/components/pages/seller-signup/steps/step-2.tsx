import { useResendCodeMutation, useVerifyEmailMutation } from "@/api/auth";
import BaskervilleHeading from "@/components/common/BaskervilleHeading";
import SpaceBetween from "@/components/common/SpaceBetween";
import { showerror, showsuccess } from "@/utils/showPopup";
import useAuthStore from "@/zustand/authStore";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button, PinCode } from "rizzui";

const Step2 = ({
  callback,
  email,
}: {
  callback: () => void;
  email: string;
}) => {
  const { login } = useAuthStore();
  const [otp, setOtp] = useState<string>();
  const { mutateAsync: verifyEmail, isPending: verifyingEmail } =
    useVerifyEmailMutation();
  const { mutateAsync: resendCode, isPending: resendingCode } =
    useResendCodeMutation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOTPSubmit = async () => {
    if (!otp) {
      return showerror("Please enter the OTP");
    }

    setIsSubmitting(!isSubmitting);
    try {
      await verifyEmail({ code: otp as string, email }).then((res) => {
        showsuccess("Account successfully verified");
        login(res.data);
        callback();
      });
    } catch (error: any) {
      showerror(`${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
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
      <p className="text-center text-[#424242] font-public-sans text-[1.2rem]">
        We sent a verification code to {email}
      </p>

      <div>
        <PinCode
          setValue={setOtp as any}
          length={6}
          size="xl"
          className="w-full mb-4"
          inputClassName="sm:!w-9 sm:!h-9 !border-[#4D4D4D]"
        />

        <Button
          rounded="lg"
          className="w-full md:py-5 py-6 text-white !text-base-bold !bg-primary"
          onClick={handleOTPSubmit}
          isLoading={verifyingEmail}
          disabled={otp?.length! < 6 || !otp}
        >
          Verify Email
        </Button>
      </div>
      {/* )} */}
      <SpaceBetween className="font-public-sans lg:flex-col">
        <p className="flex gap-2 text-[14px] font-[500]">
          Didn&apos;t Receive Email?
          <span
            className="text-main underline cursor-pointer hover:opacity-80 hover:transition-all font-[800]"
            onClick={async () => {
              await resendCode({ email }).then(() =>
                showsuccess(
                  `Verification code sent to your inbox. Please check ${email}`
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

export default Step2;
