"use client";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut } from "../svg";
import Link from "next/link";
import { Accordion, Button, cn } from "rizzui";
import { ChevronArrowIcon } from "../svg/seller/icons";
import { useLocale } from "next-intl";
import useAuthStore from "@/zustand/authStore";
import { toast } from "sonner";
import { b2bSellerPages } from "@/constants/b2bseller";
import CenteredFlex from "./CenteredFlex";

const B2bSellerSideBar = () => {
  const pathname = usePathname();
  const localActive = useLocale();
  const { userData, logout } = useAuthStore();
  const router = useRouter();

  const linkClassNames = (isActive: boolean) =>
    `flex text-[0.75rem] text-[13px] items-center gap-x-3 hover:!bg-guyana hover:text-white py-2.5 pl-3 rounded-[10px] ${
      isActive && "bg-main-light text-guyana font-semibold"
    }`;
  return (
    <div className="sticky top-0 z-30 h-[100dvh] w-[250px] min-w-[250px] bg-[#fff] flex flex-col shadow-md md:hidden">
      <div className="py-3 px-2">
        <Link href={`/`} className="flex items-center gap-x-2">
          <Image
            src={"/img/logo.png"}
            alt="Azany"
            width={180}
            height={40}
            className="h-[40x]"
          />
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        {b2bSellerPages.map((page, index) => {
          return (
            <div key={index} className="my-3">
              <>
                <p className="flex w-full  items-center justify-between text-[11px] mb-2 opacity-60 ">
                  {page.label}
                </p>
                {page.links.map((link, i) => {
                  const isActive =
                    pathname === `/${localActive}/b2b-seller` + link.path;

                  const Icon = link.icon;
                  return (
                    <div key={i} className=" group">
                      <Link
                        href={`/${localActive}/b2b-seller` + link.path}
                        className={linkClassNames(isActive)}
                      >
                        {Icon ? (
                          <Icon className="w-4 h-4" />
                        ) : (
                          <div className="w-4 h-4" />
                        )}
                        <span>{link.name}</span>
                      </Link>
                    </div>
                  );
                })}
              </>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default B2bSellerSideBar;
