"use client";
import React, { useLayoutEffect } from "react";
import Link from "next/link";

import Image from "next/image";
import LocalSwitcher from "@/components/common/local-switcher";
import useAuthStore from "@/zustand/authStore";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const OnboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { userData } = useAuthStore();
  const router = useRouter();
  const localActive = useLocale();

  return (
    // <div className="grid grid-cols-2 md:grid-cols-1 h-screen">
    <div className="bg-cover bg-center bg-[url('/img/b2b-overlay.png')] h-[190vh] flex items-center justify-center">
      {/*<div className="bg-cover bg-center bg-gray-900 h-[180vh] flex items-center justify-center">*/}

      <main className="w-[50%] md:w-[90%] sm:w-[95%] bg-secondary h-[80%] rounded-xl">
        <div className="w-full flex flex-col items-center justify-center mt-[20px] px-4 pt-5 ">
          <Link href={"/"} title="Azany">
            <Image
              src={"/img/logo.png"}
              alt="Azany"
              width={306}
              height={65}
              className="smd:w-[160px] smd:h-[45px] md:w-[130px] md:h-[45px] lg:w-[206px] lg:h-[45px] "
            />
          </Link>
          <h5 className="text-xl font-medium text-[#000000]">
            B2B Seller Registration
          </h5>
        </div>
        <div className="h-[calc(150vh-80px)] overflow-auto py-8 px-14 flex flex-col ">
          {children}
        </div>
      </main>

      {/*</div>*/}
    </div>
    // </div>
  );
};

export default OnboardLayout;
