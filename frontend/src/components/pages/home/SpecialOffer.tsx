import React from "react";
import { Nexxt } from "@icons";
import {bestSellingProps, productModel} from "@/interfaces/products";
import ProductCard from "@/components/common/product-card";

const SpecialOffer = ({
  data,
  title,
}: {
  data: productModel[];
  title: string;
}) => {
  return (
    <div className="bg-white  rounded-[20px] px-[33px] pt-[33px] pb-[17px] flex flex-col max-w-[392px] ">
      <div className="flex justify-between items-center">
        <h6 className="text-extra-large-medium font-[600]">{title}</h6>
        <div className="flex items-center gap-x-2 ">
          <div className="w-[30px] h-[30px] bg-primary-light rounded-full flex items-center justify-center">
            <Nexxt className="rotate-180" />
          </div>
          <div className="w-[30px] h-[30px] bg-primary-light rounded-full flex items-center justify-center">
            <Nexxt />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 pt-5  flex-1 items-center">
        {data.map((item: productModel) => (
          <ProductCard data={item} key={item.id} size="large" />
        ))}
      </div>
    </div>
  );
};

export default SpecialOffer;
