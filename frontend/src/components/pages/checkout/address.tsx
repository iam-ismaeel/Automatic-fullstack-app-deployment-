import React from "react";
import { Input } from "rizzui";

function NewAddress() {
  return (
    <div className="p-[28px] bg-white rounded">
      <h4 className="text-base-bold">New Shipping Address</h4>

      <div className="gap-[18px] mt-[30px] grid grid-cols-2">
        <div className="">
          <Input
            label="First Name"
            type="text"
            placeholder="Enter your name"
            errorClassName="text-red-500"
          />
        </div>

        <div className="">
          <Input
            label="Last Name"
            type="text"
            placeholder="Enter your name"
            errorClassName="text-red-500"
          />
        </div>

        <div className="col-span-2">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            errorClassName="text-red-500"
          />
        </div>

        <div className="col-span-2 space-y-[18px]">
          <Input
            label="Street Address"
            type="text"
            placeholder="Enter your address"
            errorClassName="text-red-500"
          />

          <Input type="text" placeholder=" " errorClassName="text-red-500" />
        </div>

        <div className="">
          <Input
            label="State/Province"
            type="text"
            placeholder="Enter your state"
            errorClassName="text-red-500"
          />
        </div>

        <div className="">
          <Input
            label="City"
            type="text"
            placeholder="Enter your city"
            errorClassName="text-red-500"
          />
        </div>

        <div className="">
          <Input
            label="Zip/Postal Code"
            type="text"
            placeholder="Enter your postal code"
            errorClassName="text-red-500"
          />
        </div>

        <div className="">
          <Input
            label="Phone"
            type="text"
            placeholder="Enter your phone number"
            errorClassName="text-red-500"
          />
        </div>
      </div>
    </div>
  );
}

export default NewAddress;
