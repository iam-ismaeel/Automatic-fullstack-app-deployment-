import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

const Intro = () => {
  const localActive = useLocale();

  return (
      <div className="bg-[#F8F8F8] md:pt-[220px] pt-40">
        <section className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 slg:grid-cols-1 gap-6 items-center px-8 sm:px-4">
            <div className="flex flex-col gap-4 md:pb-16 py-8 text-center lg:text-left">
              <p className="font-libre-baskerville font-bold text-[40px] lg:text-[60px] xl:text-[80px] text-[#252525]">
                You deserve every reward!
              </p>
              <p className="text-[#52525B] text-[16px] lg:text-[18px] font-public-sans font-medium">
                Make purchases and earn massive points every step of the way. You
                deserve every reward for trusting Azany
              </p>
              <div className="relative w-fit flex justify-center lg:justify-start">
                <Link
                    href={`register`}
                    className="py-3 px-6 lg:py-[18px] lg:px-[20px] sm:px-10 bg-[#E02014] font-bold text-base-medium text-white rounded-[10px]"
                >
                  Start Earning Rewards
                </Link>
              </div>
              <div className="flex justify-center lg:justify-start space-x-8 items-center mt-8 pt-12">
                <div>
                  <p className="text-4xl font-bold">2943</p>
                  <p>Users Rewarded</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">$1M+</p>
                  <p>Given in Points</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image
                  src={"/img/reward-intro.png"}
                  width={900}
                  height={903}
                  alt="intro"
                  className="md:max-w-full lg:max-w-[500px]"
              />
            </div>
          </div>
        </section>
      </div>
  );
};

export default Intro;
