"use client";
import React from "react";
import { Nexxt } from "@icons";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Grid, Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/grid";
import EmptyData from "@components/common/empty-data";
import { TopSeller } from "@interfaces/seller";
import Link from "next/link";
import { useLocale } from "next-intl";

const TopSellers = ({
  data,
  title,
  name,
}: {
  data: TopSeller[];
  title: string;
  name: string;
}) => {
  const localActive = useLocale();
  return (
    <div className="bg-white  rounded-[20px] px-[33px] pt-[33px] pb-[17px]  space-y-4 xl:col-span-4 ">
      <div className="flex justify-between items-center">
        <h6 className="text-extra-large-bold ">{title}</h6>
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
          {data.map((item: TopSeller) => (
            <SwiperSlide key={item.uuid}>
              <Link
                href={`${localActive}/seller/${item.uuid}`}
                className="flex flex-col gap-2 hover:cursor-pointer"
              >
                <div className="avatar">
                  <div className="w-24 h-24 rounded-full">
                    <Image
                      src="/img/top_seller_logo.jpg"
                      width={80}
                      height={80}
                      alt="User"
                      className="object-contain max-w-full max-h-full"
                      priority
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-y-2">
                  <h6 className="text-base-bold font-poppins text-black">
                    {item.name}
                  </h6>
                  <label className="text-extra-small-medium">{item.name}</label>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default TopSellers;
