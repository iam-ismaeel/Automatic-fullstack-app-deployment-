"use client";
import React from "react";
import Success from "@components/common/success";
import Failure from "@components/common/failure";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";

function AuthorizeCallback() {
  const localActive = useLocale();

  return (
    <main className="h-screen flex flex-col items-center justify-center gap-20 bg-white">
      <div className="max-w-[390px] max-h-[620px] w-full h-full flex flex-col items-center justify-between">
        <Link href={`/${localActive}`} title="AZANY">
          <Image
            src={"/img/logo.png"}
            alt="Azany"
            width={206}
            height={45}
            className="smd:w-[160px] smd:h-[45px] md:w-[130px] md:h-[45px] lg:w-[206px] lg:h-[45px] "
          />
        </Link>

        <Success />

        {/* <Failure /> */}
      </div>
    </main>
  );
}

export default AuthorizeCallback;
