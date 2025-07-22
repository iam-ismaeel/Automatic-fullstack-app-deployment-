"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Logo, Close, LogOut } from "@icons";
import Link from "next/link";
import { sellerPages } from "@/constants/seller";
import { useSellerStore } from "@/zustand/sellerStore";
import Image from "next/image";
import { Accordion, Avatar, Button } from "rizzui";
import { ChevronArrowIcon } from "../svg/seller/icons";
import { useLocale } from "next-intl";
import useAuthStore from "@/zustand/authStore";
import { showinfo } from "@/utils/showPopup";

const SellerDrawer = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isSellerDrawerOpen, toggleSellerDrawer } = useSellerStore();
  const localActive = useLocale();
  const { userData, logout } = useAuthStore();
  const router = useRouter();

  // Get the current status from URL
  const currentStatus = searchParams.get("status");

  // Helper function to check if a path is active
  const isLinkActive = (path: string) => {
    if (!path.includes("?")) {
      if (path === "/orders") {
        return pathname === `/${localActive}/seller${path}` && !currentStatus;
      }
      return pathname === `/${localActive}/seller${path}`;
    }

    const [basePath, queryString] = path.split("?");
    const isBasePathMatch = pathname === `/${localActive}/seller${basePath}`;
    if (!isBasePathMatch) return false;

    const statusMatch = queryString.match(/status=([^&]*)/);
    const linkStatus = statusMatch ? statusMatch[1] : null;
    return linkStatus === currentStatus;
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
      <div className="drawer-content">{children}</div>
      <div className="drawer-side z-[999]">
        <label
          htmlFor="my-drawer"
          className="drawer-overlay"
          onClick={() => toggleSellerDrawer(!isSellerDrawerOpen)}
        ></label>
        <div className="bg-white shadow-md min-h-full w-80 flex flex-col">
          <div className="py-3 px-4 flex items-center justify-between border-b border-secondary">
            <Logo className="w-[130px] h-[39px]" />
            <button
              onClick={() => toggleSellerDrawer(!isSellerDrawerOpen)}
              className="border border-primary p-2 rounded-full"
            >
              <Close />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {sellerPages.map((page, index) => (
              <div key={index}>
                {!page.label ? (
                  page.links.map((link, i) => {
                    const isActive = isLinkActive(link.path);
                    const Icon = link.icon;
                    return (
                      <div key={i} className="group my-2">
                        <Link
                          href={`/${localActive}/seller${link.path}`}
                          onClick={() =>
                            toggleSellerDrawer(!isSellerDrawerOpen)
                          }
                          className={`flex items-center gap-x-3 py-3 pl-3 rounded-[10px] transition duration-200 group-hover:bg-primary group-hover:text-white ${
                            isActive ? "bg-primary text-white" : ""
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-base-regular">{link.name}</span>
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <Accordion
                    className="my-3"
                    key={page.label}
                    defaultOpen={page.label === "ACCOUNTS"}
                  >
                    <Accordion.Header>
                      {({ open }) => (
                        <div className="flex w-full cursor-pointer items-center justify-between text-[13px] opacity-60 py-2">
                          {page.label}
                          <ChevronArrowIcon
                            className={`h-3 w-3 transition-transform duration-300 ${
                              open ? "rotate-0" : "-rotate-90"
                            }`}
                          />
                        </div>
                      )}
                    </Accordion.Header>
                    <Accordion.Body className="mt-2">
                      {page.links.map((link, i) => {
                        const isActive = isLinkActive(link.path);
                        const Icon = link.icon;
                        return (
                          <div key={i + "-" + link.name} className="mb-2 group">
                            <Link
                              href={`/${localActive}/seller${link.path}`}
                              onClick={() =>
                                toggleSellerDrawer(!isSellerDrawerOpen)
                              }
                              className={`flex items-center gap-x-3 py-3 pl-3 rounded-[10px] transition duration-200 group-hover:bg-primary group-hover:text-white ${
                                isActive ? "bg-primary text-white" : ""
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                              <span className="text-base-regular">
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
            ))}
          </div>

          <div className="border-t border-secondary p-3 flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <div className="w-10 h-10 rounded-full border">
                <Avatar
                  name={`${userData?.data?.first_name} ${userData?.data?.last_name}`}
                  src={userData?.data?.image!}
                  className="text-lg text-white font-bold object-cover"
                  customSize={40}
                />
              </div>
              <div className="max-w-[70%] truncate">
                <h6 className="text-small-bold truncate">
                  {userData?.data?.first_name} {userData?.data?.last_name}
                </h6>
                <label className="text-extra-small-regular text-[#777777] truncate">
                  {userData?.data?.email}
                </label>
              </div>
            </div>
            <Button
              onClick={() => {
                logout();
                showinfo("Logging out. redirecting to login...");
                toggleSellerDrawer(!isSellerDrawerOpen);
                setTimeout(() => {
                  router.push(`/${localActive}/seller-login`);
                }, 1000);
              }}
              variant="flat"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDrawer;
