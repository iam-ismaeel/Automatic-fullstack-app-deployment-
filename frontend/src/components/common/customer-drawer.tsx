"use client";
import React, { ReactNode, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Logo, Close, LogOut } from "@icons";
import Link from "next/link";
import { useSellerStore } from "@/zustand/sellerStore";
import Image from "next/image";
import { Accordion } from "rizzui";
import { ChevronArrowIcon } from "../svg/seller/icons";
import { useLocale } from "next-intl";
import { useUserStore } from "@/zustand/userStore";
import { customerPages } from "@/constants/customer";
import useAuthStore from "@/zustand/authStore";

const CustomerDrawer = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { isSellerDrawerOpen, toggleSellerDrawer } = useSellerStore();
  const localActive = useLocale();
  const router = useRouter();
  const { user, resetUser } = useUserStore();
  const { logout } = useAuthStore();
  const handleLogout = () => {
    resetUser();
    logout();
    router.push(`/${localActive}/login`);
  };

  return (
    <div className="drawer">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isSellerDrawerOpen}
        readOnly
      />
      <div className="drawer-content ">{children}</div>
      <div className="drawer-side z-[999]">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={() => toggleSellerDrawer(!isSellerDrawerOpen)}
        ></label>
        <ul className="menu bg-secondary text-base-content min-h-full w-80 p-4 ">
          <div className="flex items-center justify-between">
            <div>
              <Logo className="w-[130px]  h-[39px]" />
            </div>
            <label
              onClick={() => toggleSellerDrawer(!isSellerDrawerOpen)}
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="border border-primary p-2 rounded-full drawer-button cursor-pointer"
            >
              <Close />
            </label>
          </div>
          <div className="my-2">
            <div className="flex-1 overflow-y-auto p-3">
              {customerPages.map((page, index) => {
                return (
                  <div key={index}>
                    {!page.label ? (
                      <>
                        {page.links.map((link, i) => {
                          const isActive =
                            pathname === `/${localActive}/customer` + link.path;

                          const Icon = link.icon;
                          return (
                            <div key={i} className="my-3 group">
                              <Link
                                href={`/${localActive}/customer/` + link.path}
                                onClick={() =>
                                  toggleSellerDrawer(!isSellerDrawerOpen)
                                }
                                className={`flex items-center gap-x-3 group-hover:!bg-primary group-hover:text-white py-3 pl-3 rounded-[10px] ${
                                  isActive && "bg-primary text-white"
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                                <span className="text-base-regular ">
                                  {link.name}
                                </span>
                              </Link>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <Accordion className="my-6" key={page.label}>
                        <Accordion.Header>
                          {/* @ts-ignore */}
                          {({ open }) => (
                            <div className="flex w-full px-3 pb-2 cursor-pointer items-center justify-between text-[13px] opacity-60 ">
                              {page.label}
                              <ChevronArrowIcon
                                className={`h-3 w-3 -rotate-90 transform transition-transform duration-300
                            ${open && "-rotate-90"}`}
                              />
                            </div>
                          )}
                        </Accordion.Header>
                        <Accordion.Body className="mt-2">
                          {page.links.map((link, i) => {
                            const isActive =
                              pathname ===
                              `/${localActive}/customer` + link.path;
                            const Icon = link.icon;
                            return (
                              <div
                                key={i + "-" + link.name}
                                className="mb-3 group"
                              >
                                <Link
                                  href={`/${localActive}/customer/` + link.path}
                                  onClick={() =>
                                    toggleSellerDrawer(!isSellerDrawerOpen)
                                  }
                                  className={`flex items-center gap-x-3 group-hover:!bg-primary group-hover:text-white py-3 pl-3 rounded-[10px] ${
                                    isActive && "bg-primary text-white"
                                  }`}
                                >
                                  <Icon className="w-4 h-4" />
                                  <span className="text-base-regular ">
                                    {link.name}
                                  </span>
                                </Link>
                              </div>
                            );
                          })}
                        </Accordion.Body>
                      </Accordion>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="fixed bottom-0 flex items-center justify-between border-t border-t-secondary p-3">
              <div className="flex items-center gap-x-1">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <Image
                      src="/img/avatar3.jpeg"
                      fill
                      alt="User Image"
                      className="w-auto h-full rounded-full"
                    />
                  </div>
                </div>
                <div className="max-w-[70%] truncate ">
                  <h6 className="text-small-bold">
                    {user?.data?.first_name} {user?.data?.last_name}
                  </h6>
                  <label className="text-extra-small-regular text-[#777777]">
                    {user?.data?.email}
                  </label>
                </div>
              </div>
              <div className="" onClick={handleLogout}>
                <LogOut className="w-5 h-5" />
              </div>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default CustomerDrawer;
