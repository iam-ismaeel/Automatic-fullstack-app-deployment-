"use client";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FormContext } from "./page";
import { Input } from "rizzui";

const FormStepTwo = () => {
  const { setSteps, setFormData, formdata } = useContext(FormContext);
  const servicetypes = [
    { no: "A", text: "Product Sourcing" },
    { no: "B", text: "Window Shopping" },
    { no: "C", text: "OEM & ODM Deals" },
    { no: "D", text: "Other" },
  ];
  const [service, setservice] = useState(formdata.service);
  const validationSchemaStep = Yup.object().shape({
    money: Yup.string().required("Field is required"),
  });

  // React Hook Form setup for step 2
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchemaStep),
    defaultValues: { money: formdata.money },
  });

  const handleactive = (id: string) => {
    setservice(id);
  };
  const onSubmit = (data: any) => {
    setFormData((formdata) => ({ ...formdata, ...data, service: service }));
    setSteps((s) => s + 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <label className="mb-2 block" htmlFor="name">
          Service type
        </label>

        <div className="flex flex-wrap gap-4">
          {servicetypes.map((item) => (
            <div
              key={item.no}
              className={`border  rounded flex p-2 pr-4 gap-2 items-center ${
                service == item.no
                  ? "text-white bg-[#470505] border-[#470505]"
                  : "border-main"
              }`}
              onClick={() => handleactive(item.no)}
            >
              <div
                className={`w-10 h-10 rounded-sm  border grid place-content-center font-semibold  ${
                  service == item.no ? " border-[#470505]" : "border-main"
                }`}
              >
                {item.no}
              </div>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <label className="mb-2 block" htmlFor="email">
          How much will you spend on an average?
        </label>
        <Input
          type="text"
          id="name"
          {...register("money")}
          inputClassName={`w-full rounded-[4px] border  ${
            errors.money ? "border-[#E02014]" : "border-black"
          }`}
          placeholder="Select one"
        />
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          className="border border-black rounded-lg px-6 py-3 "
          onClick={() => setSteps((s) => s - 1)}
        >
          Back
        </button>
        <button className="border border-main  bg-main text-white rounded-lg px-6 py-3 ">
          Next
        </button>
      </div>
    </form>
  );
};

export default FormStepTwo;
