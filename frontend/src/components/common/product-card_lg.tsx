"use client";
import React from "react";
import ProductCard from "./product-card";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Prev, Next } from "@icons";

import { productModel } from "@/interfaces/products";

import useScreenSize from "@/hooks/useScreenSize";
import EmptyData from "@components/common/empty-data";
import Skeleton from "react-loading-skeleton";

const ProductCardLg = ({
  title,
  data,
  name,
  isLoading,
}: {
  title: string;
  data: productModel[];
  name: string;
  isLoading: boolean;
}) => {
  const screenSize = useScreenSize();

  return (
    <div className="bg-white w-full  rounded-[20px] pb-10 pt-8 px-7 relative">
      <div className="flex justify-between items-center mb-[52px]">
        <h6 className="text-extra-large-bold font-[600] font-public-sans">
          {title}
        </h6>
        <div
          className={`${name}_swiper-button-prev absolute top-[30px] right-[82px]  bg-secondary rounded-full !cursor-pointer !w-[46px] !h-[46px] p-2 flex items-center justify-center`}
        >
          <Prev className=" !w-6 !h-6" />
        </div>
        <div
          className={`${name}_swiper-button-next absolute top-[30px] right-7 bg-secondary rounded-full cursor-pointer !w-[46px] !h-[46px] p-2 flex items-center justify-center`}
        >
          <Next className=" !w-6 !h-6" />
        </div>
      </div>

      <Swiper
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          643: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          900: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
          1440: {
            slidesPerView: 6,
            spaceBetween: 40,
          },
          1535: {
            slidesPerView: 7,
            spaceBetween: 40,
          },
        }}
        navigation={{
          nextEl: `.${name}_swiper-button-next`,
          prevEl: `.${name}_swiper-button-prev`,
        }}
        modules={[Navigation]}
        spaceBetween={50}
      >
        {isLoading ? (
          <div className="flex gap-2">
            <Skeleton height={230} width={250} />
            <Skeleton height={230} width={300} />
            <Skeleton height={230} width={300} />
          </div>
        ) : data && data.length === 0 ? (
          <div className="text-center">
            <EmptyData />
          </div>
        ) : (
          data.map((item: productModel) => (
            <SwiperSlide key={item.id}>
              <ProductCard
                data={item}
                size={screenSize.width >= 475 ? "medium" : "small"}
              />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default ProductCardLg;
