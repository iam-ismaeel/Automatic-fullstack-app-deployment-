import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { useLocale } from "next-intl";
import { Button } from "rizzui";
import { XCircle } from "@icons";

const Failure = ({
  message,
  description,
  className,
}: {
  message?: string;
  description?: string;
  className?: string;
}) => {
  const localActive = useLocale();
  return (
    //     <div
    //         className={clsx(
    //         "flex mt-12 items-center justify-center flex-col gap-2",
    //         className
    // )}
    //     >
    // <Image
    //     width={200}
    // height={300}
    // // className="w-full"
    // src={"/inability.png"}
    // alt="empty-data-icon"
    // />
    //
    // <p className="text-center font-medium text-[19px]">
    //     {message ?? "Order pending payment confirmation!"}
    // </p>
    // <p className="text-center text-[13px] mt-2">{description}</p>
    //     </div>

    <div className="overflow-auto py-8 px-4 flex flex-col items-center justify-between gap-14">
      <div className="flex items-center justify-center mb-10">
        <XCircle className="size-[100px] stroke-[#E02014]" />
      </div>

      <div className="flex flex-col gap-10 text-center">
        <p className="text-[40px] leading-[47px] font-bold">
          {"Payment Failed"}
        </p>

        <div className="flex justify-center gap-3">
          <Link href={`/${localActive}/cart`} className="w-full">
            <Button
              type="button"
              className="w-full bg-transparent text-[#E02014] border border-[#E02014] dark:hover:bg-[#f6f6f6] h-11 rounded-lg px-4 font-bold font-open-sans"
            >
              Back to cart
            </Button>
          </Link>
          <Link href={`/${localActive}/checkout`} className="w-full">
            <Button
              type="button"
              className="w-full bg-[#E02014] text-white h-11 rounded-lg px-4 font-bold font-open-sans"
            >
              Retry Payment
            </Button>
          </Link>
        </div>

        <p className=" text-[#787E88] leading-[22px]">
          Will you like to{" "}
          <Link
            href={`/${localActive}/`}
            className="text-sm text-[#E02014] underline font-bold"
          >
            try a different payment method?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Failure;
