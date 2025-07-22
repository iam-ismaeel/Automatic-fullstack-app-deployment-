import React from "react";
import { SMS, UserPlus, Mark } from "@icons";

const data = [
  {
    title: "Send Invitation",
    description:
      "Send your referral link to friends and tell them how useful Azany is!",
    icon: <SMS className="w-10 h-10" />,
  },
  {
    title: "Registration",
    description:
      "Let your friends register to our services using your personal referral code!",
    icon: <UserPlus className="w-10 h-10" />,
  },
  {
    title: "Earn Your Commission",
    description:
      "Work as an Azany affiliate and earn a 5% commission on every successful referral.",
    icon: <Mark className="w-10 h-10" />,
  },
];

const StepByStep = () => {
  return (
    <div className="bg-gradient-to-r from-[#e89a9a50] via-[#F5F5F5] to-[#f17e7e56] py-[70px] px-[90px] xl:px-[40px]">
      <div className="flex flex-col items-center gap-y-7">
        <label className="text-base-bold text-main bg-secondary border-secondary-light px-5 py-2 rounded-[20px] shadow-md">
          Step By Step
        </label>
        <h6 className="text-h4 smd:text-[32px] text-center font-public-sans font-extrabold">
          How It Works in a Nutshell
        </h6>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-2 smd:grid-cols-1 md:gap-y-7 mt-10">
        {data.map((step, i) => {
          const Icon = step.icon;
          return (
            <div
              className="flex flex-col items-center justify-start max-w-[278px] mx-auto "
              key={i}
            >
              <div className="p-8 bg-[#fff] rounded-full shadow-md mb-4">
                {Icon}
              </div>
              <h6 className="text-extra-large-bold mb-[10px]">{step.title}</h6>
              <p className="text-center text-base-regular leading-6">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepByStep;
