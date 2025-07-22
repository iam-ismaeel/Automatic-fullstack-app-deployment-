"use client";
import React from "react";
import { Nexxt } from "@icons";
import { topBrandProps } from "@/interfaces/products";
// import ProductCard from "@/components/common/product-card";

import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Grid, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/grid";
import { Brands } from "@interfaces/brands";
import Image from "next/image";
import EmptyData from "@/components/common/empty-data";

const TopBrand = ({
  data,
  title,
  name,
}: {
  data: Brands[];
  title: string;
  name: string;
}) => {
  return (
    <div className="bg-white  rounded-[20px] px-[33px] pt-[33px] pb-[17px]  space-y-4 xl:col-span-4">
      <div className="flex justify-between items-center">
        <h6 className="text-extra-large-bold ">{title}</h6>
        <div className="flex items-center gap-x-2 ">
          <div
            className={`${name}_swiper-button-prev w-[30px] h-[30px] bg-primary-light rounded-full flex items-center justify-center cursor-pointer`}
          >
            <Nexxt className="rotate-180" />
          </div>
          <div
            className={`${name}_swiper-button-next w-[30px] h-[30px] bg-primary-light rounded-full flex items-center justify-center cursor-pointer`}
          >
            <Nexxt />
          </div>
        </div>
      </div>

      {data && data.length === 0 && (
        <div className="text-center">
          <EmptyData />
        </div>
      )}
      {data && data.length > 0 && (
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
              slidesPerView: 4,
              spaceBetween: 40,
            },
            640: {
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
          {data.map((item: Brands) => (
            <SwiperSlide key={item.id}>
              <div className="flex flex-col gap-2 hover:cursor-pointer">
                <div className="bg-secondary-light flex items-center justify-center w-[120px] h-[120px] shadow-md">
                  <div className="w-[80px] h-[80px]">
                    <Image
                      src={item.image ?? "/img/affiliate-intro.png"}
                      alt="You may Like"
                      width={55}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-y-2">
                  <h6 className="text-base-bold font-poppins text-black">
                    {item.name}
                  </h6>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default TopBrand;
