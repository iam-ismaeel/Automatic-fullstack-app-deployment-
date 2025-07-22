"use client";

import React, { ReactElement } from "react";
import SendCode from "./SendCode";
import Step3 from "../seller-signup/steps/step-2";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

const SellerVerify = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const searchParams = useSearchParams();
  const email = searchParams.get("email") as string;
  const router = useRouter();
  const localActive = useLocale();

  const onNext = () => setCurrentStep(currentStep + 1);

  const StepComponents: Record<number, ReactElement> = {
    1: <SendCode callback={onNext} email={email} />,
    2: (
      <Step3
        callback={() => router.push(`/${localActive}/seller-login`)}
        email={email}
      />
    ),
  };

  return (
    <div className="max-w-4xl overflow-y-auto  w-full flex gap-8 flex-col justify-between pb-4 lg:pt-32 pt-24 md:pt-0">
      <div className="mb-2 md:mt-0 mx-auto">
        <h1 className="text-heading-1-bold mb-2 smd:text-heading-2-bold sm:text-heading-4-bold">
          Account Verification
        </h1>
      </div>
      <div className="h-full overflow-y-auto flex justify-center items-center ">
        {currentStep && (
          <div className=" px-4 md:px-1 w-full max-w-[26rem]">
            {StepComponents[currentStep]}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerVerify;
