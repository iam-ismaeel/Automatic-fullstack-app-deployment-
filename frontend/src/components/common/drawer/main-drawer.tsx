"use client";
import React, { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo, Close, Products } from "@icons";
import { smProductCategories } from "@/constants/product-categories";
import NavLink from "../nav-link";
import { useAppStore } from "@/zustand/appStore";
import ProductsDrawer from "./products-drawer";
import { useGetAllCategoriesQuery } from "@/api/FetchCategories";
import { Category } from "@interfaces/categories";
import Image from "next/image";
import { useLocale } from "next-intl";

const MainDrawer = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const localActive = useLocale();

  const { isCategoryDrawerOpen, toggleCategoryDrawer } = useAppStore();
  const {
    data: catObject,
    isLoading: isCatLoading,
    isError: isCatError,
  } = useGetAllCategoriesQuery();
  let categoryList: Category[] = [];
  categoryList = (catObject?.data as Category[]) || [];

  return (
    <div className="drawer">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isCategoryDrawerOpen}
        readOnly
      />
      <div className="drawer-content ">
        <ProductsDrawer>{children}</ProductsDrawer>
      </div>
      {/* Drawer side Left */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={() => toggleCategoryDrawer(!isCategoryDrawerOpen)}
        ></label>
        <ul className="menu bg-secondary text-base-content min-h-full w-80 p-4 ">
          {/* Sidebar content here */}
          <div className="flex items-center justify-between">
            <div>
              <Logo className="w-[130px]  h-[39px]" />
            </div>
            <label
              onClick={() => toggleCategoryDrawer(!isCategoryDrawerOpen)}
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="border border-primary p-2 rounded-full drawer-button cursor-pointer"
            >
              <Close />
            </label>
          </div>
          <div className="my-2">
            {categoryList.map((item) => {
              const isActive = pathname === item.slug;
              const Icon = item.image;
              return (
                <li key={item.id} className="my-3 group">
                  <NavLink
                    href={`/${localActive}/categories/${item.slug}`}
                    handleClick={() =>
                      toggleCategoryDrawer(!isCategoryDrawerOpen)
                    }
                  >
                    <>
                      <div className="">
                        <Image
                          src={Icon}
                          alt={item.name}
                          width={30}
                          height={30}
                          className="size-[30px] rounded-full object-cover"
                        />
                      </div>
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

export default MainDrawer;
