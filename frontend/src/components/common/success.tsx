import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useLocale } from "next-intl";

const Success = () => {
  const localActive = useLocale();

  return (
    <div className="overflow-auto py-8 px-4 flex flex-col items-center gap-[60px]">
      <Image
        width={150}
        height={150}
        src={"/img/success-image.gif"}
        alt="success"
      />

      <div className="flex flex-col gap-10 text-center">
        <p className="text-[40px] leading-[47px] font-bold">
          Payment Successful
        </p>

        <p className="text-[#424242]">
          You will be redirected in a few seconds. If not click{" "}
          <Link href={`/${localActive}/`} className="text-[#E02014] underline">
            here
          </Link>{" "}
          to continue shopping
        </p>
      </div>
    </div>
  );
};

export default Success;
