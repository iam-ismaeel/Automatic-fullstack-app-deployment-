"use client";
import React from "react";
import { Nexxt } from "@icons";
import { bestSellingProps, productInterface } from "@/interfaces/products";

import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Grid, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/grid";
import ProductCard2 from "@components/common/product-card2";
import EmptyData from "./empty-data";
import Skeleton from "react-loading-skeleton";

const ProductCardFour = ({
  data,
  title,
  name,
  classNames,
  isLoading,
}: {
  data: productInterface[];
  title: string;
  name: string;
  classNames?: string;
  isLoading: boolean;
}) => {
  return (
    <div
      className={`bg-white   rounded-[20px] px-[33px] pt-[33px] pb-[17px] space-y-4 ${classNames} xl:col-span-2 md:col-span-4`}
    >
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
        grid={{
          rows: 2,
          fill: "row",
        }}
        navigation={{
          nextEl: `.${name}_swiper-button-next`,
          prevEl: `.${name}_swiper-button-prev`,
        }}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          500: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          320: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
        }}
        modules={[Grid, Pagination, Navigation]}
        spaceBetween={30}
        className="mySwiper"
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
          data.map((item: productInterface) => (
            <SwiperSlide key={item.id}>
              <ProductCard2 data={item} key={item.id} size="small" />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default ProductCardFour;
