"use client";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FormContext } from "./page";
import { Input, Password } from "rizzui";

const FormStepFour = () => {
  const { setSteps, setFormData, formdata } = useContext(FormContext);
  const validationSchemaStep = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchemaStep),
    defaultValues: {
      password: formdata.password,
      confirmPassword: "",
    },
  });
  const onSubmit = (data: any) => {
    console.log("Step 2 values:", data);

    // Handle final submission or further actions
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <label className="mb-2 block" htmlFor="name">
          Enter password
        </label>
        <Password
          id="password"
          {...register("password")}
          inputClassName={`w-full rounded-[4px] border  ${
            errors.password ? "border-[#E02014]" : "border-black"
          }`}
        />
      </div>
      <div className="mb-6">
        <label className="mb-2 block" htmlFor="name">
          Re-enter password
        </label>
        <Password
          id="confirmpassword"
          {...register("confirmPassword")}
          inputClassName={`w-full rounded-[4px] border  ${
            errors.confirmPassword ? "border-[#E02014]" : "border-black"
          }`}
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => setSteps((s) => s - 1)}
          className="border border-black rounded-lg px-6 py-3 "
        >
          Back
        </button>
        <button className="border border-main  bg-main text-white rounded-lg px-6 py-3 ">
          Start Sourcing
        </button>
      </div>
    </form>
  );
};

export default FormStepFour;
