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

  useLayoutEffect(() => {
    if (userData?.token) {
      if (userData?.is_affiliate_member)
        router.push(`/${localActive}/affiliate/dashboard`);
      else if (userData?.user_type === "customer")
        router.push(`/${localActive}/customer/dashboard`);
      else router.push(`/${localActive}/seller/dashboard`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-1 h-screen">
      <main className="">
        <div className="w-full flex items-center justify-between px-4 pt-4 bg-secondary">
          <Link href={"/"} title="AZANY">
            <Image
              src={"/img/logo.png"}
              alt="Azany"
              width={206}
              height={45}
              className="smd:w-[160px] smd:h-[45px] md:w-[130px] md:h-[45px] lg:w-[206px] lg:h-[45px] "
            />
          </Link>
          <LocalSwitcher />
        </div>
        <div className="h-[calc(100vh-80px)] overflow-auto py-8 flex flex-col items-center px-4">
          {children}
        </div>
      </main>
      <aside className="flex justify-center items-center p-8 rounded-2xl bg-onboard bg-repeat bg-center bg-cover md:hidden"></aside>
    </div>
  );
};

export default OnboardLayout;
