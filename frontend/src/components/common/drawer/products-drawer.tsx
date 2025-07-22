"use client";
import React, { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo, Close, Products } from "@icons";
import { uniqueProducts } from "@/constants/product-categories";
import NavLink from "../nav-link";
import { useAppStore } from "@/zustand/appStore";

const ProductsDrawer = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { isProductDrawerOpen, toggleProductDrawer } = useAppStore();

  const handleProductDrawerToggle = () => {
    toggleProductDrawer(!isProductDrawerOpen);
  };

  return (
    <div className="drawer drawer-end">
      <input
        id="product-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isProductDrawerOpen}
        readOnly
      />
      <div className="drawer-content  ">{children}</div>
      {/* Drawer side Left */}
      <div className="drawer-side">
        <label
          htmlFor="product-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={handleProductDrawerToggle}
        ></label>
        <ul className="menu bg-secondary text-base-content min-h-full w-80 p-4 ">
          {/* Sidebar content here */}
          <div className="flex items-center justify-between">
            <div>
              <Logo className="w-[130px]  h-[39px]" />
            </div>
            <label
              onClick={handleProductDrawerToggle}
              htmlFor="product-drawer"
              aria-label="close sidebar"
              className="border border-primary p-2 rounded-full drawer-button cursor-pointer"
            >
              <Close />
            </label>
          </div>
          <div className="my-2">
            {uniqueProducts.map((item) => {
              const isActive = pathname === item.path;

              return (
                <li key={item.id} className="my-3 group">
                  <NavLink href={item.path}>
                    <>
                      {/* <Icon
                        className={`group-hover:fill-white w-5 h-5
                      ${isActive ? "fill-white" : ""} `}
                      /> */}
                      <span className="text-base-regular">{item.name}</span>
                    </>
                  </NavLink>
                </li>
              );
            })}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default ProductsDrawer;
