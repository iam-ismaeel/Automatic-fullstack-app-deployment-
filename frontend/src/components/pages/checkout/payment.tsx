import { Lock } from "@/components/svg";
import React from "react";

function PaymentMethod() {
  return (
    <>
      <div className="p-[28px] bg-white rounded">
        <h4 className="text-base-bold">Payment Method</h4>

        <div className="gap-[18px] mt-[30px]">
          <label className="flex items-start justify-between border border-[#B2BCCA] rounded px-4 py-6">
            <div className="flex">
              <input
                type="radio"
                className="w-[14px] h-[14px] border border-[#DEE2E7] mr-[8px] rounded-full mt-2"
                name="address"
              />

              <h5 className="text-[16px] font-semibold mr-5">Paystack</h5>

              <p className="text-[#4F4F4F] text-[14px]">
                You will be redirected to the PayPal website after submitting
                your order
              </p>
            </div>
          </label>

          <div className="flex items-center gap-[11px] mt-8">
            <div className="flex-shrink-0 flex items-center justify-center w-[28px] h-[28px] rounded-full border border-[#DB4444]">
              <Lock className="w-[11px] h-[13px] fill-[#DB4444]" />
            </div>
            <p className="text-[#828282] text-[12px]">
              We protect your payment information using encryption to provide
              bank-level security.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentMethod;
