import React from "react";

const Stepper = ({
  steps,
  currentStep,
}: {
  steps: string[];
  currentStep: number;
}) => {
  return (
    <div
      className={`justify-center  mx-auto w-fit grid grid-cols-${steps.length}  items-start gap-x-4 steps overflow-visible relative`}
    >
      {steps.map((step, i) => (
        <div
          className="flex-col mb-0 flex justify-center items-center gap-4 relative"
          key={i}
        >
          {i !== 0 && (
            <div className="absolute top-2 -left-1/2 translate-x-1 rounded-full w-1/2 h-[3px] bg-[#E02014]"></div>
          )}
          <div
            className={`font-public-sans text-white font-semibold rounded-full min-w-[20px] size-[20px]  flex justify-center items-center relative z-10
                ${
                  i + 1 < currentStep && i + 1 !== currentStep && "bg-[#E02014]"
                }
                ${
                  i + 1 !== currentStep && i + 1 > currentStep && "bg-[#BDBDBD]"
                }
                ${i + 1 === currentStep && "bg-transparent border border-black"}
                `}
          >
            {i + 1 < currentStep && i + 1 !== currentStep && (
              <span>
                <svg
                  width="12"
                  height="10"
                  viewBox="0 0 8 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.77733 4.79298L1.13083 3.14648L0.423828 3.85348L2.77733 6.20698L7.63083 1.35348L6.92383 0.646484L2.77733 4.79298Z"
                    fill="white"
                  />
                </svg>
              </span>
            )}
            {i + 1 === currentStep && (
              <span className="bg-[#E02014] size-[12px] rounded-full"></span>
            )}
          </div>

          <p className="text-[#061C3D] text-center mb-2 text-[13px] md:text-[9px] font-medium">
            {step}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
