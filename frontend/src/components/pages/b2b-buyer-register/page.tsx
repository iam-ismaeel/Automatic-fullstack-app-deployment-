"use client";
import Image from "next/image";
import Link from "next/link";
import React, { createContext, useState } from "react";
import b2bbuyer from "../../../../public/img/b2bbuyer.png";
import b2bbuyer2 from "../../../../public/img/b2bbuyer2.png";
import b2bbuyer3 from "../../../../public/img/b2bbuyer3.png";
import b2bbuyer4 from "../../../../public/img/b2bbuyer4.png";
import FormStepone from "./FormStepOne";
import FormStepTwo from "./FormStepTwo";
import FormStepThree from "./FormStepThree";
import FormStepFour from "./FormStepFour";

const contents = [
  {
    heading: "Start your journey to sourcing right for your business!",
    paragraph:
      "First off, let’s get to know you. Tell us your name and business email address",
    image: b2bbuyer,
  },
  {
    heading: "What will you be doing with Azany B2B?",
    paragraph:
      "How best do you think we can serve you? Doesn’t have to be super accurate, you can choose multiple options.",
    image: b2bbuyer2,
  },
  {
    heading: "Let's confirm your company info",
    paragraph:
      "To keep our marketplace safe, we require a few extra details about your company.",
    image: b2bbuyer3,
  },
  {
    heading: "Finally, you’re ready to start sourcing on Azany B2B!",
    paragraph:
      "Way to go! Start your journey to building your business the smart way. It only gets better from here on.",
    image: b2bbuyer4,
  },
];

type formdatatype = {
  name: string;
  email: string;
  service: string;
  money: string;
  company: string;
  website: string;
  people: string;
  country: string;
  password: string;
};
type formtype = {
  setSteps: React.Dispatch<React.SetStateAction<number>>;
  setFormData: React.Dispatch<React.SetStateAction<formdatatype>>;
  formdata: formdatatype;
};
export const FormContext = createContext<formtype>({
  setSteps: () => {},
  setFormData: () => {},
  formdata: {
    name: "",
    email: "",
    service: "",
    money: "",
    people: "",
    company: "",
    website: "",
    country: "",
    password: "",
  },
});

function B2BBuyerRegister() {
  const [steps, setSteps] = useState(0);
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    money: "",
    company: "",
    people: "",
    website: "",
    country: "",
    password: "",
  });
  const classname = [
    "before:w-1/4",
    "before:w-1/2",
    "before:w-3/4",
    "before:w-full",
  ];
  return (
    <FormContext.Provider value={{ setSteps, setFormData, formdata }}>
      <div className=" bg-white min-h-screen  px-[64px] lg:px-[20px]">
        <div className="grid grid-cols-2 md:block items-center min-h-screen  gap-[80px] lg:gap-0 xl:gap-[10px] font-roboto max-w-[1312px] m-auto ">
          <div className=" px-[68px] justify-self-end py-[62px] w-full md:px-[0px]">
            <div className="text-center">
              <Link href={"/"} title="AZANY" className="inline">
                <Image
                  src={"/img/logo.png"}
                  alt="Azany"
                  className="inline-block"
                  width={165}
                  height={39}
                />
              </Link>
            </div>

            <div className=" mb-8 mt-4">
              <div
                className={`w-full h-1 bg-[#EEEEEE] steptransition ${classname[steps]} before:h-1 before:bg-black before:block `}
              ></div>
              <p className="mt-2">Step {steps + 1}/4</p>
            </div>
            <h2 className="text-[32px] font-bold leading-10 mb-2 sm:text-[24px] sm:leading-8">
              {contents[steps].heading}
            </h2>
            <p className="font-normal text-[16px] mb-8">
              {contents[steps].paragraph}
            </p>
            <Image
              src={contents[steps].image}
              alt="b2bbuyer"
              className="rounded-[4px] w-full hidden mb-6 md:block"
            />

            {steps == 0 ? (
              <FormStepone />
            ) : steps == 1 ? (
              <FormStepTwo />
            ) : steps == 2 ? (
              <FormStepThree />
            ) : (
              <FormStepFour />
            )}
          </div>
          <div className="md:hidden w-full">
            <Image
              src={contents[steps].image}
              alt="b2bbuyer"
              className="rounded-[4px] w-full"
            />
          </div>
        </div>
      </div>
    </FormContext.Provider>
  );
}

export default B2BBuyerRegister;
