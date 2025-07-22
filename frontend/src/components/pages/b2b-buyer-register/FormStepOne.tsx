"use client";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Mail } from "@icons";
import { FormContext } from "./page";
import { Input } from "rizzui";

const FormStepone = () => {
  const { setSteps, setFormData, formdata } = useContext(FormContext);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { name: formdata.name, email: formdata.email },
  });
  const onSubmit = (data: any) => {
    console.log("Step 1 values:", data);
    setFormData((formdata) => ({ ...formdata, ...data }));
    setSteps((s) => s + 1);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <label className="mb-2 block" htmlFor="name">
          Enter your name
        </label>
        <Input
          type="text"
          id="name"
          {...register("name")}
          inputClassName={`w-full rounded-[4px] border  ${
            errors.name ? "border-[#E02014]" : "border-black"
          }`}
        />
      </div>
      <div className="mb-6">
        <label className="mb-2 block" htmlFor="email">
          Enter your business email *
        </label>
        <div
          className={`flex border rounded-[4px] items-center ${
            errors.name ? "border-[#E02014]" : "border-black"
          } px-3 gap-3`}
        >
          <Mail className="w-6 h-6" />

          <Input
            type="text"
            {...register("email")}
            id="email"
            inputClassName="flex-1 border-none"
            placeholder="hello@azany.co"
          />
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          className="border border-black rounded-lg px-6 py-3 "
        >
          Cancel
        </button>
        <button className="border border-[#E02014]  bg-[#E02014] text-white rounded-lg px-6 py-3 ">
          Next
        </button>
      </div>
    </form>
  );
};

export default FormStepone;
