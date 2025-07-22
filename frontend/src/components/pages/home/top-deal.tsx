"use client";
import React from "react";
import { Nexxt } from "@icons";
import { bestSellingProps, productModel } from "@/interfaces/products";
import ProductCard from "@/components/common/product-card";

import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Skeleton from "react-loading-skeleton";
import EmptyData from "@/components/common/empty-data";

const TopDeal = ({
  data,
  title,
  name,
  isLoading,
}: {
  data: productModel[];
  title: string;
  name: string;
  isLoading: boolean;
}) => {
  return (
    <div className=" bg-white  rounded-[20px] px-[33px] pt-[33px] pb-[17px]  2xl:col-span-2 md:col-span-4 ">
      <div className="flex justify-between items-center">
        <h6 className="text-extra-large-medium font-[600]">{title}</h6>
        <div className="flex items-center gap-x-2 ">
          <div
            className={`${name}_swiper-button-prev w-[30px] h-[30px] bg-[#DB4444] rounded-full flex items-center justify-center cursor-pointer`}
          >
            <Nexxt className="rotate-180" />
          </div>
          <div
            className={`${name}_swiper-button-next w-[30px] h-[30px] bg-[#DB4444] rounded-full flex items-center justify-center cursor-pointer`}
          >
            <Nexxt />
          </div>
        </div>
      </div>
      <Swiper
        slidesPerView={1}
        navigation={{
          nextEl: `.${name}_swiper-button-next`,
          prevEl: `.${name}_swiper-button-prev`,
        }}
        modules={[Navigation]}
        className="mySwiper my-[15%] mx-auto"
      >
        {isLoading ? (
          <div className="flex gap-2">
            <Skeleton height={230} width={250} />
            <Skeleton height={230} width={300} />
          </div>
        ) : (data && data.length) === 0 ? (
          <div className="text-center">
            <EmptyData />
          </div>
        ) : (
          data.map((item: productModel) => (
            <SwiperSlide key={item.id}>
              <ProductCard data={item} size="large" />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default TopDeal;
