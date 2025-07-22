import Link from "next/link";
import Image from "next/image";
import LocalSwitcher from "@components/common/local-switcher";
import React from "react";

const PaymentSuccess = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-1 h-screen">
      <main className="">
        <div className="w-full flex items-center justify-between px-4 pt-4 bg-secondary">
          <Link href={"/"} title="Azany">
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
        <div className="h-[calc(100vh-80px)] overflow-auto py-8 flex flex-col items-center px-4"></div>
      </main>
      <aside className="flex justify-center items-center p-8 rounded-2xl bg-onboard bg-repeat bg-center bg-cover md:hidden"></aside>
    </div>
  );
};
