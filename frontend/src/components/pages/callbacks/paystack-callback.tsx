"use client";
import React, { useEffect } from "react";
import Success from "@components/common/success";
import Failure from "@components/common/failure";
import { useRouter, useSearchParams } from "next/navigation";
import { usePaystackVerifyClientQuery } from "@/api/client/payment";
import useStore from "@/zustand/useStore";
import { IUserStore, useUserStore } from "@/zustand/userStore";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import Processing from "@components/common/processing";

function PaystackCallback() {
  const searchParams = useSearchParams();
  const localActive = useLocale();

  const userStore = useStore<IUserStore, IUserStore>(
    useUserStore,
    (state: any) => state
  );
  const userId = userStore?.user?.user_id;

  const txRef = searchParams.get("trxref");
  const reference = searchParams.get("reference");

  const { data: verifyData, isLoading: isVerifying } =
    usePaystackVerifyClientQuery(userId!, txRef || reference!);

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

        {isVerifying ? (
          <Processing />
        ) : verifyData?.data.value.status === "success" ? (
          <Success />
        ) : (
          <Failure />
        )}
      </div>
    </main>
  );
}

export default PaystackCallback;
