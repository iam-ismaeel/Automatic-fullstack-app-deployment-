import BaskervilleHeading from "@/components/common/BaskervilleHeading";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "rizzui";

const Step3 = () => {
  const localActive = useLocale();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Image
          alt="email verified icon"
          className="mx-auto object-cover w-[200px]"
          src="/img/mail-verified.png"
          width={300}
          height={300}
        />
        <BaskervilleHeading
          text="Email Verified"
          className="text-[40px] text-center"
        />
      </div>
      <p className="text-center text-[#424242] font-public-sans text-[1.2rem]">
        Your Email has been verified successfully. You may now proceed to log
        into your account.
      </p>
      <Link href={`/${localActive}/seller/dashboard`}>
        <Button
          rounded="lg"
          className="w-full py-8 text-white !text-base-bold !bg-primary"
        >
          Continue
        </Button>
      </Link>
    </div>
  );
};

export default Step3;
