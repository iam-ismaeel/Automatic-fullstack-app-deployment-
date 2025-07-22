"use client";
import React, { ReactElement } from "react";
import Step1 from "./steps/step-1";
import Step2 from "./steps/step-2";
import Step3 from "./steps/step-3";
import Stepper from "./steps/Stepper";
import { useSearchParams } from "next/navigation";

const SellerSignUp = () => {
  const searchParams = useSearchParams();
  const coupon = searchParams.get("coupon");
  const referrer = searchParams.get("referrer");

  const [currentStep, setCurrentStep] = React.useState(1);
  const [email, setEmail] = React.useState("");

  const onNext = () => setCurrentStep(currentStep + 1);

  const StepComponents: Record<number, ReactElement> = {
    1: (
      <Step1
        callback={(email) => {
          setEmail(email);
          onNext();
        }}
        coupon={coupon!}
        referrer={referrer!}
      />
    ),
    2: <Step2 email={email} callback={onNext} />,
    3: <Step3 />,
  };
  const steps = ["Personal Info", "Verify Email", "Verified"];
  return (
    <div className="max-w-[26rem] w-full mx-auto space-y-6">
      <div className="mx-auto">
        <h1 className="text-heading-1-bold lg:text-heading-2-bold smd:text-heading-2-bold sm:text-heading-4-bold">
          Join AZANY
          <label className="text-primary"> Sellers</label> 🛍️
        </h1>
        <h2 className="text-base-regular sm:text-small-regular text-[#687076]">
          🚀 Sign Up Today and Start Your Journey to Success with AZANY!
        </h2>
      </div>

      <Stepper currentStep={currentStep} steps={steps} />
      <div className="flex justify-center items-center ">
        {currentStep && (
          <div className=" px-4 md:px-1 w-full">
            {StepComponents[currentStep]}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerSignUp;
