"use client";
import { useEffect } from "react";
import Image from "next/image";
import { Products } from "@icons";
import { fetchUserLocation } from "@/lib/api";
import { useAppStore } from "@/zustand/appStore";
import { useSellerStore } from "@/zustand/sellerStore";
import { useProfileQuery } from "@/api/user";
import { useUserStore } from "@/zustand/userStore";
import CustomerDrawer from "./customer-drawer";
import { Button } from "rizzui";
import Link from "next/link";
import { useLocale } from "next-intl";

const CustomerHeader = () => {
  const { handleCurrency, handleShippingDestination } = useAppStore();
  const { isSellerDrawerOpen, toggleSellerDrawer } = useSellerStore();
  const { user, setUser } = useUserStore();
  const localActive = useLocale();

  useEffect(() => {
    (async () => {
      const data = await fetchUserLocation();
      handleCurrency(data?.currency);
      handleShippingDestination(data?.countryCode);
    })();
  }, [handleCurrency, handleShippingDestination]);

  const { isLoading, data: profile } = useProfileQuery({
    enabled: user?.is_logged_in && !user?.is_profile_fetched,
    headers: {
      Authorization: `Bearer ${user?.data?.token}`,
    },
  });

  useEffect(() => {
    if (profile && !isLoading && user && setUser) {
      setUser({
        ...user,
        data: profile.data,
        is_profile_fetched: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CustomerDrawer>
      <header className="bg-[#fff] fixed left-[270px] md:pl-0 md:left-0 right-0 top-0 z-[20] flex flex-col">
        <div className="flex items-center justify-between  py-3 pl-8 pr-4 border-b border h-[82px]">
          <div className="hidden md:flex gap-x-2 items-center ">
            <div onClick={() => toggleSellerDrawer(!isSellerDrawerOpen)}>
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
            <h6 className="text-heading-2-bold 2xl:text-heading-3-bold ">
              Welcome {user?.data?.first_name} 👋
            </h6>
          </div>

          <Button
            variant="outline"
            className="inline-flex items-center gap-2 rounded-md border border-primary-light py-1.5 text-sm/6 font-semibold text-black shadow-inner shadow-white/10"
          >
            <Link
              href={`/${localActive}`}
              className="flex items-center gap-x-2 cursor-pointer"
            >
              <span className="text-base-regular">Market Place</span>
            </Link>
          </Button>
        </div>
      </header>
    </CustomerDrawer>
  );
};

export default CustomerHeader;
