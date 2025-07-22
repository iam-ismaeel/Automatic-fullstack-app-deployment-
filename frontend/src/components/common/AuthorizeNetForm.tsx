import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Switch } from "rizzui";

const AuthorizeNetForm = () => {
  const {
    register,
    formState: { errors },
    control,
    setValue,
  } = useFormContext();

  // Watch the `is_default` field to manage its state
  const isDefault = useWatch({
    control,
    name: "is_default",
    defaultValue: false,
  });

  return (
    <div className="space-y-4">
      <div>
        <label>Bank Name</label>
        <input
          type="text"
          {...register("bank_name")}
          className="w-full p-2 border rounded"
          placeholder="Enter bank name"
        />
        {errors.bank_name && (
          <p className="text-red-500">{errors.bank_name.message as string}</p>
        )}
      </div>

      <div>
        <label>Account Number</label>
        <input
          type="text"
          {...register("account_number")}
          className="w-full p-2 border rounded"
          placeholder="Enter your Bank Account Number"
        />
        {errors.account_number && (
          <p className="text-red-500">
            {errors.account_number.message as string}
          </p>
        )}
      </div>

      <div>
        <label>Account Name</label>
        <input
          type="text"
          {...register("account_name")}
          className="w-full p-2 border rounded"
          placeholder="Enter Account Holder's Name"
        />
        {errors.account_name && (
          <p className="text-red-500">
            {errors.account_name.message as string}
          </p>
        )}
      </div>

      <div>
        <label>Routing Number</label>
        <input
          type="text"
          {...register("routing_number")}
          className="w-full p-2 border rounded"
          placeholder="Enter Routing Number"
        />
        {errors.routing_number && (
          <p className="text-red-500">
            {errors.routing_number.message as string}
          </p>
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

export default AuthorizeNetForm;
