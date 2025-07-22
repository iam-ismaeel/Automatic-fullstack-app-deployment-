"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Back } from "@/components/svg";
import { useBannerQuery } from "@/api/user";
import Image from "next/image";
import clsx from "clsx";
import useScreenSize from "@/hooks/useScreenSize";

type BannerProps = {
  mobile: string;
  desktop: string;
};

const Banner = ({ data }: { data: string[] }) => {
  const swiperId = "banner-swiper"; // Unique ID for the swiper instance
  const { width } = useScreenSize();
  // const { data: bannerRes } = useBannerQuery();
  // const bannerData = bannerRes?.data.map((data) => {
  //   return {
  //     ...data,
  //     image: data.image.replace(/\\\//g, "/"),
  //   };
  // });

  return (
    <div className="app_container mt-6 flex items-center justify-between gap-x-3">
      <Swiper
        spaceBetween={60}
        centeredSlides
        slidesPerView={width < 756 ? 1 : 1.2}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: `.${swiperId}-next`,
          prevEl: `.${swiperId}-prev`,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className={`${swiperId} flex-1`}
      >
        <>
          {data?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative max-w-[1220px] mx-auto rounded-xl overflow-hidden">
                <Image
                  src={item}
                  alt="banner-image"
                  width={1200}
                  height={400}
                  className="w-full"
                  // quality={50}
                  priority
                />
              </div>
            </SwiperSlide>
          ))}
        </>
      </Swiper>

      {/* {width > 776 && (
        <div
          className={`${swiperId}-next w-[46px]   h-[46px] xl:w-[32px] xl:h-[32px]   bg-transparent border border-primary rounded-[100%] cursor-pointer flex items-center justify-center `}
        >
          <Back className="w-7 h-7 rotate-180" />
        </div>
      )} */}
    </div>
  );
};

export default Banner;
