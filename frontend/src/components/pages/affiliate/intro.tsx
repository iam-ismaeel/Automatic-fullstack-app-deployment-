import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

const Intro = () => {
  const localActive = useLocale();

  return (
    <div className="bg-gradient-to-br from-[#ff000047] via-[#F5F5F5] to-[#FF000080]  flex lg:flex-col-reverse lg:gap-y-7 items-center justify-between pt-[150px]  md:pt-[220px] lg:pb-[70px] ">
      <div className="flex-1 pl-[130px] 2xl:pl-[70px] xl:pl-[40px] lg:pl-0">
        <div className="max-w-[617px] lg:max-w-[90vw] lg:flex lg:flex-col lg:items-center">
          <div className="flex gap-x-4 items-center lg:justify-center">
            <label className="text-small-bold">Become an</label>
            <label className="bg-[#E02014] text-[#fff] text-extra-small-bold px-[26px] py-[8px] rounded-[16px]">
              Azany Affiliate ✨
            </label>
          </div>
          <h4 className="text-h3 2xl:text-h4   !font-bold font-libre-baskerville mt-[30px] mb-[40px] lg:mb-6 2xl:max-w-[550px] xl:max-w-[400px] lg:max-w-[650px] lg:text-center">
            Start Earning as an Affiliate on Azany for{" "}
            <label className="text-primary-light">FREE!</label>
          </h4>
          <p
            className="text-[#717171] text-base-medium
           max-w-[444px] lg:max-w-[600px] lg:text-center font-public-sans"
          >
            <label className="text-[#279F51] text-base-bold">
              Yes, you too can earn passive income online
            </label>{" "}
            by simply sharing your referral link and getting clients to sign up
            on Azany using your link!{" "}
          </p>
          <div className="flex flex-col  gap-y-5  gap-x-5 mt-[82px] lg:mt-8 ">
            <div className="flex items-center gap-x-[27px]">
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-12">
                    <Image src="/img/avatar1.jpeg" alt="Avatar" fill />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <Image src="/img/avatar2.jpeg" alt="Avatar" fill />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <Image src="/img/avatar3.jpeg" alt="Avatar" fill />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <Image src="/img/avatar4.jpeg" alt="Avatar" fill />
                  </div>
                </div>
              </div>
              <p className="text-base-bold text-success">236k+ Happy Clients</p>
            </div>
            <div className="flex items-center gap-x-7 smd:gap-x-4">
              <Link
                href={`affiliate-signup`}
                className="py-[18px] px-[60px] sm:px-10 bg-[#E02014] text-base-medium text-white rounded-[20px]"
              >
                Register
              </Link>
              <Link
                href={`affiliate-login`}
                className="py-[18px] px-[60px] sm:px-10 border border-main text-base-medium text-main rounded-[20px]"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#8B0000] via-[#DE2126] to-[#fc2c2c] lg:bg-none w-[555px] xl:w-[480px] lg:w-full h-[675px] lg:h-auto rounded-tl-[100px] lg:rounded-tl-none lg:rounded-b-[100px] relative">
        <div className=" absolute -left-[35%] xl:-left-[15%] top-[50%] -translate-y-[50%] lg:relative lg:left-0  lg:top-0 lg:translate-y-0">
          <Image
            src={"/img/affiliate-intro.png"}
            width={600}
            height={603}
            alt="intro"
            className="max-w-full smd:max-w-[90vw] max-h-full object-contain 2xl:w-[500px] xl:w-[450px] 2xl:h-[500px] xl:h-[450px] lg:mx-auto"
          />
        </div>{" "}
      </div>
    </div>
  );
};

export default Intro;
