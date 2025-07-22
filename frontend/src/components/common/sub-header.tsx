"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Location, Menu } from "@icons";
import { Logo, Close, Products } from "@icons";
import { smProductCategories } from "@/constants/product-categories";
import NavLink from "./nav-link";
import { usePathname } from "next/navigation";
import MainDrawer from "./drawer/main-drawer";
import { useAppStore } from "@/zustand/appStore";
import { useLocale } from "next-intl";
import useAuthStore from "@/zustand/authStore";
import { useUserStore } from "@/zustand/userStore";

const SubHeader = () => {
  const pathname = usePathname();
  const {
    isCategoryDrawerOpen,
    toggleCategoryDrawer,
    isProductDrawerOpen,
    toggleProductDrawer,
  } = useAppStore();
  const localActive = useLocale();
  const { resetUser } = useUserStore();
  const { logout } = useAuthStore();

  const data = [
    {
      label: "AzanyPay",
      link: "https://www.azanypay.com/",
    },
    {
      label: "Reward ",
      link: `/${localActive}/reward`,
    },
    // {
    //   label: "Multi-Currency",
    //   link: "#Multi-Currency",
    // },
    {
      label: "Become an Affiliate",
      link: `/${localActive}/affiliate`,
    },
    // {
    //   label: "Agri-Ecom",
    //   link: "#Agri-Ecom",
    // },
    // {
    //   label: "Help",
    //   link: "#Help",
    // },
  ];

  return (
    <MainDrawer>
      <div className="app_container w-full flex flex-nowrap items-center justify-between gap-x-10 py-4 font-public-sans bg-primary   xl:overflow-x-scroll sub-header_scrollbar ">
        <label
          className="drawer-button flex items-center gap-x-2 text-white cursor-pointer"
          htmlFor="my-drawer"
          onClick={() => toggleCategoryDrawer(!isCategoryDrawerOpen)}
        >
          <Menu className="w-6 h-5" />
          <span className="whitespace-nowrap">All Categories</span>
        </label>
        <div className="flex items-center gap-x-7 md:gap-x-4 flex-nowrap ">
          {data.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="text-base-medium md:text-small-medium text-white  whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-x-[22px]">
          <div className="space-x-1">
            <span className="bg-primary-light text-white p-2 rounded-lg text-base-medium ">
              Sell
            </span>
            <Link
              href={`/${localActive}/seller`}
              className="text-base-medium  text-white whitespace-nowrap"
              onClick={() => {
                resetUser();
                logout();
              }}
            >
              Become a Seller
            </Link>
          </div>
          {/* <div className="border-l-2 border-l-grey flex items-center gap-x-2 pl-10">
            <Location className="w-5 h-5" />
            <span className="text-base-medium text-secondary whitespace-nowrap">
              Eti-Osa
            </span>
          </div> */}
        </div>
        {/* <label
          className="hidden drawer-button md:flex items-center gap-x-2 text-white cursor-pointer"
          onClick={() => toggleProductDrawer(!isProductDrawerOpen)}
        >
          Products
          <Products className="w-6 h-5" />
        </label> */}
      </div>
    </MainDrawer>
  );
};

export default SubHeader;
