"use client";
import React, { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo, Close } from "@icons";
import Link from "next/link";
import { affiliatePages } from "@/constants/affiliate";
import { useAffStore } from "@/zustand/affiliateStore";
import { useLocale } from "next-intl";

const AffiliateDrawer = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { isAffiliateDrawerOpen, toggleAffiliateDrawer } = useAffStore();

  const localActive = useLocale();

  return (
    <div className="drawer">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isAffiliateDrawerOpen}
        readOnly
      />
      <div className="drawer-content ">{children}</div>
      <div className="drawer-side z-[999]">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={() => toggleAffiliateDrawer(!isAffiliateDrawerOpen)}
        ></label>
        <ul className="menu bg-secondary text-base-content min-h-full w-80 p-4 ">
          <div className="flex items-center justify-between">
            <div>
              <Logo className="w-[130px]  h-[39px]" />
            </div>
            <label
              onClick={() => toggleAffiliateDrawer(!isAffiliateDrawerOpen)}
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="border border-primary p-2 rounded-full drawer-button cursor-pointer"
            >
              <Close />
            </label>
          </div>
          <div className="my-2">
            {affiliatePages.map((page, index) => {
              const isActive = pathname.includes(page.path);
              const Icon = page.icon;
              return (
                <div key={index} className="my-3 group">
                  <Link
                    href={`/${localActive}/affiliate${page.path}`}
                    onClick={() =>
                      toggleAffiliateDrawer(!isAffiliateDrawerOpen)
                    }
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
          </div>
        </ul>
      </div>
    </div>
  );
};

export default AffiliateDrawer;
