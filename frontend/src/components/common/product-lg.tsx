import React from "react";
import Image from "next/image";
import { bestSellingProps } from "@/interfaces/products";

const ProductLg = ({ data }: { data: bestSellingProps }) => {
  return (
    <div className="w-[324px] flex flex-col gap-y-4">
      <div className="w-full bg-secondary-light h-[307px] flex items-center justify-center relative">
        {data.tag && (
          <label className="absolute bg-primary font-public-sans text-extra-small-regular text-white px-[6px] py-[2px] flex justify-center items-center rounded top-[13px] left-[11px]">
            {data.tag}
          </label>
        )}
        <Image
          src={data.image}
          alt="Product"
          width={184}
          height={170}
          className="object-contain max-w-full max-h-full"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <h6 className="text-base-medium font-poppins text-black">
          {data.name}
        </h6>
      </div>
    </div>
  );
};

export default ProductLg;
