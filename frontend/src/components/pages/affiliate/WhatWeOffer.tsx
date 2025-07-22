import React from "react";
import { Right } from "@icons";
import Image from "next/image";
const offers = [
  "Affiliates can view and copy their referral code.",
  "Affiliates can track the usage of their referral code ",
  "The system tracks which vendor sign-ups are associated with each affiliate's referral code.",
  "The system tracks subscription renewals of referred vendors.",
  "The system automatically calculates the 5% commission for each successful referral and renewal.",
];
const WhatWeOffer = () => {
  return (
    <div className="px-[130px] 2xl:px-[70px] xl:px-[40px] flex lg:flex-col-reverse lg:gap-y-8 items-center justify-between py-[70px]">
      <div className="lg:flex lg:flex-col lg:justify-center lg:items-center">
        <label className="text-base-bold text-main bg-secondary border-secondary-light px-5 py-2 rounded-[20px] shadow-xl ">
          Here is what we offer!
        </label>
        <h6 className="text-h4 font-public-sans font-extrabold max-w-[524px] lg:max-w-[90vw] smd:max-w-full smd:text-[32px] lg:text-center mt-4">
          You earn a 5% Commission upon every successful referral!
        </h6>
        <ul className="list-disc my-7 pl-5 lg:pl-0 max-w-[524px] lg:max-w-[90vw] lg:flex lg:flex-col lg:justify-center lg:items-center">
          {offers.map((offer, id) => (
            <li
              key={id}
              className="text-extra-large-medium leading-9 lg:text-center smd:text-left"
            >
              {offer}
            </li>
          ))}
        </ul>

        <button className="flex items-center gap-x-2 py-[18px] pl-[40px] pr-[20px] bg-[#E02014] text-base-medium text-white rounded-[20px]">
          <label className="text-base-medium">Get Started</label>
          <Right className="w-6 h-6" />
        </button>
      </div>
      <div className="">
        <Image
          src={"/img/what-we-offer.png"}
          alt="What we offer"
          width={505}
          height={576}
        />
      </div>
    </div>
  );
};

export default WhatWeOffer;
