import { useGetBankListQuery, useLookUpPaystackAccount } from "@/api/payment";
import SearchableDropDown from "@/components/common/searchable-dropdown";
import React, { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Input, Switch } from "rizzui";

const ACCOUNT_NUMBER_LENGTH = 10;

const PayStackForm = () => {
  const {
    register,
    formState: { errors },
    setValue,
    clearErrors,
    control,
  } = useFormContext();

  const { mutateAsync: lookupAccount, isPending } = useLookUpPaystackAccount();
  const { data, isLoading: isBankListLoading } = useGetBankListQuery();
  const bankList = data?.data ?? [];

  const [selectedBankCode, setSelectedBankCode] = useState<string>("");

  // Watch the `is_default` field to manage its state
  const isDefault = useWatch({
    control,
    name: "is_default",
    defaultValue: false, // Default value for the switch
  });

  // Function to handle account number change and lookup
  const handleAccountNumberChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const accountNumber = event.target.value;

    // Only proceed with lookup if we have a 10-digit account number
    if (accountNumber.length === ACCOUNT_NUMBER_LENGTH) {
      try {
        const response = await lookupAccount({
          account_number: accountNumber,
          bank_code: selectedBankCode, // You might want to make this dynamic based on selected bank
        });

        if (response?.account_name) {
          setValue("account_name", response.account_name, {
            shouldValidate: true,
          });
        }
      } catch (error) {
        console.error("Account validation error:", error);
        setValue("account_name", "", {
          shouldValidate: true,
        });
      }
    } else {
      // Clear account holder name if account number is not complete
      setValue("account_name", "");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="">Bank Name</label>

        <SearchableDropDown
          data={bankList}
          handleSelection={(e: any) => {
            setValue("bank_name", e?.name);
            clearErrors("bank_name");
            setSelectedBankCode(e?.code);
          }}
          placeholder="Search for a Bank"
          clearSelection={true}
          className={errors.bank_name && "border-2 border-red-500"}
        />
        {errors.bank_name && (
          <p className="text-red-500">{errors.bank_name.message as string}</p>
        )}
      </div>

      <div>
        <label>Account Number</label>
        <Input
          type="text"
          {...register("account_number", {
            onChange: handleAccountNumberChange,
          })}
          placeholder="Enter your Bank Account Number"
          maxLength={ACCOUNT_NUMBER_LENGTH}
        />
        {errors.account_number && (
          <p className="text-red-500">
            {errors.account_number.message as string}
          </p>
        )}
      </div>

      <div>
        <label>Account Holder&apos;s Name</label>
        <Input
          type="text"
          {...register("account_name")}
          placeholder="Account Holder's Name"
          readOnly
          disabled={isPending}
          className={isPending ? "bg-gray-100" : ""}
        />
        {errors.account_name && (
          <p className="text-red-500">
            {errors.account_name.message as string}
          </p>
        )}
        {isPending && (
          <p className="text-blue-500 text-sm mt-1">Verifying account...</p>
        )}
      </div>

      <div>
        <label>Set as Default Payment Method</label>
        <Switch
          switchKnobClassName="bg-white"
          switchClassName={`${isDefault ? "bg-blue-500" : "bg-gray-400"}`}
          checked={isDefault}
          {...register("is_default")}
        />
        {errors.is_default && (
          <p className="text-red-500">{errors.is_default.message as string}</p>
        )}
      </div>
    </div>
  );
};

export default PayStackForm;
