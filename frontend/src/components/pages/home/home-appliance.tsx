import React from "react";
import { productModel } from "@/interfaces/products";
import ProductCard from "@/components/common/product-card";
import Skeleton from "react-loading-skeleton";
import EmptyData from "@/components/common/empty-data";

const HomeAppliance = ({
  title,
  data,
  isLoading,
}: {
  title: string;
  data: productModel[];
  isLoading: boolean;
}) => {
  if (isLoading) return <Skeleton height={200} />;
  return (
    <div className=" w-full bg-home-appliance-gradient rounded-[20px] py-6 px-[33px] smd:px-[20px] flex xl:flex-col xl:justify-between items-center xl:items-stretch gap-x-16 my-7">
      <div className="max-w-[183px] xl:max-w-full  space-y-3">
        <h6 className="text-[32px] font-[600] leading-[37px] text-white xl:text-center xl:my-6">
          Home Appliances Under $30
        </h6>
        <button className="bg-white text-primary px-3 py-1 rounded xl:hidden">
          See more
        </button>
      </div>

      {data.length !== 0 ? (
        <div className="flex-1  h-full grid grid-cols-5 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  gap-y-4 gap-x-8 lg:gap-x-4">
          {data.map((item: productModel) => (
            <ProductCard key={item.id} data={item} size="xlarge" />
          ))}
        </div>
      ) : (
        <EmptyData className="xl:mx-auto text-white" />
      )}
      <button className="bg-white text-primary px-3 py-1 rounded hidden xl:block max-w-fit xl:mx-auto mt-5 mb-3">
        See more
      </button>
    </div>
  );
};

export default HomeAppliance;
