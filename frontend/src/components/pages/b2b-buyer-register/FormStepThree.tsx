"use client";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FormContext } from "./page";
import { Input } from "rizzui";

const peopletypes = ["Just me", "2-10", "11-50", "51-100", "101-500", "501+"];

const FormStepThree = () => {
  const { setSteps, setFormData, formdata } = useContext(FormContext);
  const [people, setPeople] = useState(formdata.people);
  const handleactive = (id: string) => {
    setPeople(id);
  };
  const validationSchemaStep = Yup.object().shape({
    company: Yup.string().required("Field is required"),
    website: Yup.string().required("Field is required"),
    country: Yup.string().required("Field is required"),
  });

  // React Hook Form setup for step 2
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchemaStep),
    defaultValues: {
      company: formdata.company,
      website: formdata.website,
      country: formdata.country,
    },
  });

  const onSubmit = (data: any) => {
    console.log("Step 1 values:", data);
    setFormData((formdata) => ({ ...formdata, ...data, people }));
    setSteps((s) => s + 1);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <label className="mb-2 block" htmlFor="name">
          What is your company name?
        </label>
        <Input
          type="text"
          id="company"
          {...register("company")}
          inputClassName={`w-full rounded-[4px] border  ${
            errors.company ? "border-[#E02014]" : "border-black"
          }`}
        />
      </div>
      <div className="mb-6">
        <label className="mb-2 block" htmlFor="email">
          How many people are you working with?
        </label>
        <div className="flex flex-wrap gap-4">
          {peopletypes.map((item) => (
            <div
              key={item}
              onClick={() => handleactive(item)}
              className={`border ${
                people == item
                  ? "text-white bg-[#470505] border-[#470505]"
                  : "border-main"
              } rounded flex py-2 px-4 gap-2 items-center`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <label className="mb-2 block" htmlFor="name">
          Website link
        </label>
        <Input
          type="text"
          id="website"
          {...register("website")}
          inputClassName={`w-full rounded-[4px] border  ${
            errors.website ? "border-[#E02014]" : "border-black"
          }`}
        />
      </div>
      <div className="mb-6">
        <label className="mb-2 block" htmlFor="name">
          Country
        </label>
        <Input
          type="text"
          id="website"
          {...register("country")}
          inputClassName={`w-full rounded-[4px] border  ${
            errors.country ? "border-[#E02014]" : "border-black"
          }`}
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

export default FormStepThree;
