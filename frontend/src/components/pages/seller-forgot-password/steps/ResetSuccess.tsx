"use client";

import { SuccessIcon } from "@/components/svg/seller";
import Router, { useRouter } from "next/navigation";
import React from "react";
import { Button } from "rizzui";

const ResetSuccess = () => {
  const router = useRouter();
  return (
    <>
      <div className=" w-full">
        <SuccessIcon className="w-full h-[100px] mb-6" />
        <h1 className="text-heading-1-bold mb-2 smd:text-heading-2-bold sm:text-heading-4-bold">
          Reset Successful
        </h1>
        <h2 className="text-base-regular mb-4 sm:text-small-regular text-[#687076]">
          Your Password Has been Reset Successfully
        </h2>

        <Button
          rounded="lg"
          type="submit"
          className="w-full text-white  !text-base-bold !bg-primary"
          onClick={() => router.push("seller-login")}
        >
          Continue
        </Button>
      </div>
    </>
  );
};

export default ResetSuccess;
