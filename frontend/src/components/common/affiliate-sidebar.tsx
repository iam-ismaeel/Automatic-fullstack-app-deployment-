"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut } from "../svg";
import { affiliatePages } from "@/constants/affiliate";
import Link from "next/link";
import { useLocale } from "next-intl";
import useAuthStore from "@/zustand/authStore";
import { useProfileQuery } from "@/api/user";
import { Avatar, Button } from "rizzui";
import { showinfo } from "@/utils/showPopup";

const AffiliateSideBar = () => {
  const pathname = usePathname();
  const localActive = useLocale();
  const { logout } = useAuthStore();
  const { data } = useProfileQuery();
  const profileDetail = data?.data;
  const router = useRouter();

  return (
    <div className="sticky top-0 left-0 z-30 h-[100vh] w-[270px] min-w-[270px] bg-[#fff] flex flex-col shadow-md md:hidden">
      <div className="py-3 px-2 bg-white border-b border-b-secondary">
        <Image
          src={"/img/logo.png"}
          alt="Azany"
          width={180}
          height={40}
          className="h-[40x]"
        />
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        {affiliatePages.map((page, index) => {
          const isActive = pathname === `/${localActive}/affiliate${page.path}`;
          const Icon = page.icon;
          return (
            <div key={index} className="my-3 group">
              <Link
                href={`/${localActive}/affiliate${page.path}`}
                className={`flex items-center gap-x-3 group-hover:!bg-primary group-hover:text-white py-3 pl-3 rounded-[10px] ${
                  isActive && "bg-primary text-white"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-base-regular ">{page.name}</span>
              </Link>
            </div>
          );
        })}

        <div className=""></div>
      </div>

      <div className="flex items-center justify-between border-t border-t-secondary p-3">
        <div className="flex items-center gap-x-1">
          <div className="avatar">
            <div className="w-10 rounded-full border">
              <Avatar
                name={`${profileDetail?.first_name} ${profileDetail?.last_name}`}
                src={`${profileDetail?.image!}`}
                className="text-lg text-white font-bold object-cover overflow-hidden"
                rounded="none"
                customSize={40}
              />
            </div>
          </div>
          <div className="max-w-[70%] truncate ">
            <h6 className="text-small-bold">
              {profileDetail?.first_name} {profileDetail?.last_name}
            </h6>
            <label className="text-extra-small-regular text-[#777777]">
              {profileDetail?.email}
            </label>
          </div>
        </div>
        <div className="">
          <Button
            onClick={() => {
              logout();
              showinfo("Logging out. redirecting to login...");
              setTimeout(() => {
                router.push(`/${localActive}/affiliate-login`);
              }, 1000);
            }}
            variant="flat"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AffiliateSideBar;
