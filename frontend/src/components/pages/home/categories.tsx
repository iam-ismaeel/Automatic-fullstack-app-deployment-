"use client";
import React from "react";
import Link from "next/link";
import { productCategories } from "@/constants/product-categories";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Prev, Next } from "@icons";

import { FeaturedCategory } from "@/interfaces/categories";
import { useGetFeaturedCategoryQuery } from "@/api/featuredCategory";

const SingleCategory = ({ id, name, image, path }: FeaturedCategory) => {
  return (
    <>
      <Link href={path} className=" ">
        <div className="flex flex-col justify-center items-center gap-y-[18px]">
          <div className="">
            <Image
              src={image}
              alt={name}
              width={66}
              height={66}
              className="size-[66px] rounded-full object-cover"
            />
          </div>
          <label className="text-center text-small-medium max-w-[155px]">
            {name}
          </label>
        </div>
      </Link>
    </>
  );
};

const Categories = () => {
  const props = {};

  const {
    data: featuredCategories,
    isLoading: isFeaturedCategoryLoading,
    isError: isFeaturedCategoryError,
    error,
  } = useGetFeaturedCategoryQuery();
  let featuredCategoryList: FeaturedCategory[] = [];
  featuredCategoryList = (featuredCategories?.data as FeaturedCategory[]) || [];
  return (
    <div className="app_container my-[60px] relative category-swiper">
      <Swiper
        slidesPerView={8}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          375: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          425: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 50,
          },

          1024: {
            slidesPerView: 6,
            spaceBetween: 40,
          },
          1440: {
            slidesPerView: 8,
            spaceBetween: 0,
          },
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Autoplay, Navigation]}
        className=" !px-8"
      >
        {featuredCategoryList.map((category: FeaturedCategory) => (
          <SwiperSlide key={category.id}>
            <SingleCategory
              id={category.id}
              image={category.image}
              name={category.name}
              path={`en/categories/${category.slug}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full cursor-pointer !w-[46px] !h-[46px]">
        <Prev className=" !w-6 !h-6" />
      </div>
      <div className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full cursor-pointer !w-[46px] !h-[46px]">
        <Next className=" !w-6 !h-6" />
      </div>
    </div>
  );
};

export default Categories;
