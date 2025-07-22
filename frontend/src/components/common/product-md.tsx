import React from "react";
import Image from "next/image";
import { bestSellingProps } from "@/interfaces/products";

const ProductMd = ({ data }: { data: bestSellingProps }) => {
  return (
    <div className="w-[184px] flex flex-col gap-y-4">
      <div className="w-full bg-secondary-light h-[170px] flex items-center justify-center relative">
        {data.tag && (
          <label className="absolute bg-primary font-public-sans text-extra-small-regular text-white w-[37px] h-[17px] flex justify-center items-center rounded top-[13px] left-[11px]">
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
        <p className="flex items-center gap-x-3 text-small-medium">
          <span className="text-primary">{`$${
            data.discounted ? data.discounted : data.price
          }`}</span>
          {data.discounted && (
            <span className="text-black opacity-50 line-through">{`$${data.price}`}</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ProductMd;
