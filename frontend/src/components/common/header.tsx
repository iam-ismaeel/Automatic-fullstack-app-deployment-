"use client";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import LocalSwitcher from "./local-switcher";
import { SearchIcon, Cart, Logo } from "../svg";
import SubHeader from "./sub-header";
import DropDown from "./drop-down";
import { useLocale } from "next-intl";
import { fetchUserLocation } from "@/lib/api";
import { useAppStore } from "@/zustand/appStore";

export default function Header() {
  const t = useTranslations("Navigation");
  const localActive = useLocale();
  const { handleCurrency, handleShippingDestination } = useAppStore();

  useEffect(() => {
    const updateUserLocation = async () => {
      const locationData = await fetchUserLocation();
      handleCurrency(locationData?.currency);
      handleShippingDestination(locationData?.countryCode);
    };
    updateUserLocation();
  }, [handleCurrency, handleShippingDestination]);

  return (
    <header className="fixed top-0 left-0 right-0 z-[999] shadow-lg bg-secondary">
      <nav className="px-[51px] xl:px-7 md:px-3 flex items-center justify-between  bg-secondary w-full h-[64px] xl:gap-x-7">
        {/* <Link href="/">{t("home")}</Link> */}
        <Link href={`/${localActive}`}>
          <Logo className="w-[206px] xl:w-[150px] md:w-[130px]  h-[39px]" />
        </Link>
        <div className="w-[461px] h-[36px] border border-primary rounded-lg overflow-hidden flex items-center justify-center md:hidden">
          <input
            type="text"
            className="w-full h-[36px] px-3 border-none"
            placeholder="What can we help you find today?"
          />
          <button className=" text-black bg-primary w-[40px] h-[39px] flex items-center justify-center">
            <SearchIcon />
          </button>
        </div>
        {/* <LocalSwitcher /> */}
        <div className="flex items-center gap-x-5 text-black">
          {/* <div className="flex items-center gap-x-2">
            <User className="h-[19px] w-[18px]" />
            <p className="slg:hidden">Account</p>
          </div> */}
          <DropDown />
          <Link
            href={`/${localActive}/cart`}
            className="flex items-center gap-x-2 cursor-pointer"
          >
            <Cart className="w-8 h-8" />
            {/* <p>{t("cart")}</p> */}
            <p className="slg:hidden">Cart</p>
          </Link>
          <div className="flex items-center gap-x-1 ">
            <LocalSwitcher />
          </div>
        </div>
      </nav>
      <div className="max-w-full  h-[36px] border border-primary rounded-lg overflow-hidden md:flex items-center justify-center hidden  md:bg-secondary md:my-4 md:mx-7 ">
        <input
          type="text"
          className="w-full h-[36px] px-3 border-none"
          placeholder="What can we help you find today?"
        />
        <button className=" text-black bg-primary w-[40px] h-[39px] flex items-center justify-center">
          <SearchIcon />
        </button>
      </div>
      <SubHeader />
    </header>
  );
}
