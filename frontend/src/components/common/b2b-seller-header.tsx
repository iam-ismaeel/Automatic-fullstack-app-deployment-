"use client";
import { useEffect } from "react";
import Image from "next/image";
import { Products } from "@icons";
import { fetchUserLocation } from "@/lib/api";
import { useAppStore } from "@/zustand/appStore";
import { useSellerStore } from "@/zustand/sellerStore";
import SellerDrawer from "./seller-drawer";
import { useProfileQuery } from "@/api/user";
import useAuthStore from "@/zustand/authStore";

const B2BSellerHeader = () => {
  const { isSellerDrawerOpen, toggleSellerDrawer } = useSellerStore();
  const { userData, isLoggedIn, setUserData } = useAuthStore();

  const { isLoading, data } = useProfileQuery({
    enabled: isLoggedIn,
  });

  useEffect(() => {
    if (data && !isLoading) {
      setUserData({
        ...userData,
        data: data.data,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, data]);

  return (
    <SellerDrawer>
      <div className="bg-[#fff] fixed pl-[250px] md:pl-0  left-0 right-0 top-0 z-[20] flex flex-col">
        <div className="flex items-center justify-between  py-3 pl-8 pr-4 border-b border max-h-[82px]">
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
            <label className="text-[#777777]">
              Welcome {userData?.data?.first_name} 👋,
            </label>
            <h6 className="text-[0.8rem]">
              Here&apos;s what&apos;s happening in Azany today.
            </h6>
          </div>
        </div>
      </div>
    </SellerDrawer>
  );
};

export default B2BSellerHeader;
