import React, { Fragment } from "react";
import { Input } from "rizzui";
import {Cart} from "@interfaces/cart";

function Summary({data}:{data: Cart}) {
  return (
      <Fragment>
        <div className="">
          <div className="space-y-1 mt-[30px]">
            <div className="flex justify-between">
            <span className="text-[#4F4F4F] text-[14px] font-open-sans">
              Intl Order Subtotal
            </span>

              <span className="text-[#4F4F4F] text-[15px] font-open-sans font-semibold">
              ${data?.total_international_price}
            </span>
            </div>

            <div className="flex justify-between">
            <span className="text-[#4F4F4F] text-[14px] font-open-sans">
              Local Subtotal
            </span>

              <span className="text-[#4F4F4F] text-[15px] font-open-sans font-semibold">
              -${data?.total_local_price}
            </span>
            </div>

            <div className="flex justify-between">
              <div className="flex flex-col">
              <span className="text-[#4F4F4F] text-[14px] font-open-sans">
                Azany Points
              </span>

                <button className="text-[#DB4444] text-[12px] font-open-sans w-fit">
                  Remove
                </button>
              </div>

              <span className="text-[#4F4F4F] text-[15px] font-open-sans font-semibold">
              -$259.99
            </span>
            </div>

            <div className="flex justify-between">
            <span className="text-[#4F4F4F] text-[14px] font-open-sans">
              Shipping
            </span>

              <span className="text-[#4F4F4F] text-[15px] font-open-sans font-semibold">
              $0.00
            </span>
            </div>

            <div className="flex justify-between">
            <span className="text-[#4F4F4F] text-[14px] font-open-sans">
              Tax
            </span>

              <span className="text-[#4F4F4F] text-[15px] font-open-sans font-semibold">
              $0.00
            </span>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex justify-between">
            <span className="text-[16px] font-open-sans font-bold">
              Grand Total
            </span>

              <span className="text-[16px] font-open-sans font-bold">
              ${data?.total_local_price + data?.total_international_price}
            </span>
            </div>

            <Input placeholder="Order Comment" className="h-[65px]" />

            <label className="flex items-center">
              <input
                  type="checkbox"
                  className="w-[12px] h-[12px] mr-[10px] text-primary-light outline-none focus:ring-0"
              />
              <span className="text-[14px] font-open-sans">
              Please check to acknowledge our{" "}
                <span className="text-[#DB4444]">Privacy & Terms Policy</span>
            </span>
            </label>

            <button className="w-full text-white bg-[#DB4444] h-[40px] rounded-md font-bold text-[16px] font-open-sans">
              Pay $${data?.total_local_price + data?.total_international_price}
            </button>
          </div>
        </div>
      </Fragment>
  );
}

export default Summary;
