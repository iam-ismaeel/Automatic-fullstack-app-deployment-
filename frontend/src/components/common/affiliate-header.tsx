"use client";
import { useEffect } from "react";
import Image from "next/image";
import LocalSwitcher from "@/components/common/local-switcher";
import { Products } from "@icons";
import AffiliateDrawer from "./affiliate-drawer";
import { useAffStore } from "@/zustand/affiliateStore";
import { fetchUserLocation } from "@/lib/api";
import { useAppStore } from "@/zustand/appStore";
import { useProfileQuery } from "@/api/user";

const AffiliateHeader = () => {
  const { handleCurrency, handleShippingDestination } = useAppStore();

  const { isAffiliateDrawerOpen, toggleAffiliateDrawer } = useAffStore();
  const { data, isFetching: isFetchingUser } = useProfileQuery();
  const profileDetail = data?.data;

  useEffect(() => {
    (async () => {
      const data = await fetchUserLocation();
      handleCurrency(data?.currency);
      handleShippingDestination(data?.countryCode);
    })();
  }, [handleCurrency, handleShippingDestination]);

  return (
    <AffiliateDrawer>
      <div className="bg-[#fff] fixed left-[270px] md:left-0 right-0 top-0 z-[999] flex flex-col">
        <div className="flex items-center justify-between  py-3 px-8 border-b border max-h-[82px]">
          <div className="hidden md:flex gap-x-2 items-center ">
            <div onClick={() => toggleAffiliateDrawer(!isAffiliateDrawerOpen)}>
              <Products className="w-6 h-5" />
            </div>

            <Image
              src={"/img/logo.png"}
              alt="Azany"
              width={150}
              height={40}
              className="h-[40x]"
            />
          </div>
          <div className="md:hidden">
            <label className="text-[#777777]">
              Welcome {profileDetail?.first_name} 👋,
            </label>
            <h6 className="text-heading-2-bold 2xl:text-heading-3-bold ">
              Affiliate Dashboard
            </h6>
          </div>
          <LocalSwitcher />
        </div>
      </div>
    </AffiliateDrawer>
  );
};

export default AffiliateHeader;
