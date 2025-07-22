import SearchableDropDown from "@/components/common/searchable-dropdown";
import React from "react";
import { Input } from "rizzui";

const AccountDefaultSettings = () => {
  return (
    <div className="px-6 py-10 rounded-lg bg-[#F6F8FB]">
      <p className="text-[#0C0C0C] mb-6 text-[20px] font-bold">
        Account Default Settings
      </p>
      <div className="flex flex-col gap-4">
        {[
          { label: "Courier selection", placeholder: "Select courier" },
          {
            label: "Form of sending the invoice",
            placeholder: "Select type",
          },
          { label: "Payment method", placeholder: "Select payment method" },
        ].map((a) => (
          <div key={a.label}>
            <label className="text-[#434447] text-[14px]">{a.label}</label>
            <SearchableDropDown
              data={[]}
              handleSelection={() => {}}
              className="!py-4 bg-white border-[#EAECEE]"
              placeholder={a.placeholder}
            />
          </div>
        ))}
        <Input
          placeholder="johndoe@gmail.com"
          inputClassName="!py-[27px] bg-white border-[#EAECEE]"
          label="Shipping e-mail address"
          labelClassName="text-[#434447] font-[400] text-[14px]"
        />
      </div>
    </div>
  );
};

export default AccountDefaultSettings;
