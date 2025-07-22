"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import StarRating from "@/components/common/star-rating";

const data = [
  {
    img: "/img/affiliate1.png",
    rating: 5,
    word: "Being an affiliate with Azany has transformed my earnings. The generous commissions and supportive team have helped me create a steady income, promoting products I trust.",
    name: "John D.",
    desc: "Affiliate Partner for 2 Years",
  },
  {
    img: "/img/affiliate2.png",
    rating: 4,
    word: "I've tried many affiliate programs, but Azany's stands out for its ease and profitability. The user-friendly dashboard and excellent marketing materials make it a pleasure to work with a company that values its affiliates.",
    name: "Mike T",
    desc: "Top Referrer",
  },
  {
    img: "/img/affiliate4.png",
    rating: 5,
    word: "Joining the affiliate program at Azany was one of my best decisions this year. The smooth onboarding process and quick earnings within the first month have been exciting, turning my efforts into real income.",
    name: "Sarah M.",
    desc: "New Affiliate Partner",
  },
  {
    img: "/img/affiliate5.png",
    rating: 5,
    word: " As a content creator, I value the diverse products, excellent tracking tools, and timely payouts that make this affiliate program exceptional.",
    name: "David L.",
    desc: "Long-Term Affiliate",
  },
];
const Feedback = () => {
  return (
    <div className="bg-white py-[70px] px-[130px] 2xl:px-[70px] xl:px-[40px] lg:px-0 flex flex-col items-center justify-center gap-y-[56px]">
      <div className="flex flex-col items-center gap-y-5">
        <label className="text-base-bold text-main bg-secondary border-secondary-light px-5 py-2 rounded-[20px] shadow-md">
          Affiliate Feedbacks
        </label>
        <h6 className="text-h4 font-public-sans font-extrabold smd:text-[32px]">
          What Our Affiliates Say
        </h6>
      </div>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="w-full  max-w-[1169px] affiliate-swipe"
      >
        {data.map((item, index) => (
          <SwiperSlide className=" " key={index}>
            <div className="flex slg:flex-col items-center justify-between w-full">
              <div className="bg-affiliate-feedback bg-contain bg-center bg-no-repeat w-[488px] smd:w-[400px] h-[582px] relative">
                <Image
                  src={item.img}
                  alt="Affiliate"
                  width={324}
                  height={440}
                  className="absolute top-[48%] -translate-y-[50%] left-[50%] -translate-x-[50%] smd:h-[400px] smd:w-[300px]"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center max-w-[506px] mr-[35px] smd:pl-9">
                <StarRating rating={item.rating} size="rating-md" />
                <p className="my-6 font-medium text-[18px] leading-[28px]">
                  {item.word}
                </p>
                <div>
                  <h6 className="text-extra-large-bold">{item.name}</h6>
                  <label className="text-[#717171] text-base-medium">
                    {item.desc}
                  </label>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Feedback;
