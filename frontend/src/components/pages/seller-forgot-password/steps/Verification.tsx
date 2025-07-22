import React, { useState } from "react";
import { Button, PinCode } from "rizzui";
import Link from "next/link";

const Verification = ({ callback }: { callback: () => void }) => {
  const [otp, setOtp] = useState<string>();
  return (
    <>
      <div className=" w-full">
        <h1 className="text-heading-1-bold mb-2 smd:text-heading-2-bold sm:text-heading-4-bold">
          Verification
        </h1>
        <h2 className="text-base-regular sm:text-small-regular text-[#687076]">
          Enter your 4 digits code that you received on your email.
        </h2>

        <div className="my-4">
          <PinCode size="lg" setValue={setOtp as any} />
        </div>
        <Button
          rounded="lg"
          type="submit"
          className="w-full text-white  !text-base-bold !bg-primary"
          onClick={callback}
          disabled={otp?.length! < 4 || !otp}
        >
          Continue
        </Button>
      </div>
    </>
  );
};

export default Verification;
