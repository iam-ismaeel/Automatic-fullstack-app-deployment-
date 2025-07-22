import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useLocale } from "next-intl";

const Processing = () => {
  const localActive = useLocale();
  return (
    <div className="overflow-auto py-4 px-1 flex flex-col items-center justify-between gap-[100px]">
      <Image
        width={150}
        height={150}
        src={"/img/azany-custom-spinner.gif"}
        alt="processing"
      />

      <div className="flex flex-col gap-7 text-center">
        <p className="text-[40px] leading-[47px] font-bold">
          {"Processing Payment"}
        </p>

        <p className="text-[#424242]">Do not refresh your browser</p>
      </div>
    </div>
  );
};

export default Processing;
