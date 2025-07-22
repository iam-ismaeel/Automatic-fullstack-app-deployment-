import React from "react";
import Image from "next/image";
import { bestSellingProps } from "@/interfaces/products";

const ProductSm = ({ data }: { data: bestSellingProps }) => {
  return (
    <div className="w-[153px] flex flex-col gap-2 ">
      <div className="w-full bg-secondary-light h-[142px] flex items-center justify-center ">
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

export default ProductSm;
