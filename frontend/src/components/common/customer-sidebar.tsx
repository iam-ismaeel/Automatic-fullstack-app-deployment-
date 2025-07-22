"use client";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowBack, LogOut } from "../svg";
import Link from "next/link";
import { Accordion, Avatar } from "rizzui";
import { ChevronArrowIcon } from "../svg/seller/icons";
import { useLocale } from "next-intl";
import { customerPages } from "@/constants/customer";
import { useUserStore } from "@/zustand/userStore";
import useAuthStore from "@/zustand/authStore";
import CenteredFlex from "./CenteredFlex";

const CustomerSideBar = () => {
  const pathname = usePathname();
  const localActive = useLocale();
  const router = useRouter();
  const { user, resetUser } = useUserStore();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    resetUser();
    setTimeout(() => {
      router.push(`/${localActive}/login`);
    }, 200);
  };

  return (
    <div className="sticky bg-white top-0 left-0 h-[100dvh] min-w-[270px] w-[270px] z-30 flex flex-col shadow-md md:hidden">
      <CenteredFlex className="h-[82px] px-2  border-b border-b-secondary">
        <Link href={`/${localActive}`} className="flex items-center gap-x-2">
          <Image
            src={"/img/logo.png"}
            alt="Azany"
            width={180}
            height={100}
            className="h-[40px] object-cover"
          />
        </Link>
      </CenteredFlex>

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
                          href={`/${localActive}/customer` + link.path}
                          className={`flex items-center gap-x-3 group-hover:!bg-primary group-hover:text-white py-3 pl-3 rounded-[10px] ${
                            isActive && "bg-primary text-white"
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 ${isActive && "text-white"}`}
                          />
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
                      <div className="flex w-full px-3 mb-2 cursor-pointer items-center justify-between text-[13px] opacity-60 ">
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
                        pathname === `/${localActive}/customer` + link.path;
                      const Icon = link.icon;
                      return (
                        <div key={i + "-" + link.name} className="mb-3 group">
                          <Link
                            href={`/${localActive}/customer` + link.path}
                            className={`flex items-center gap-x-3 group-hover:!bg-primary group-hover:text-white py-3 pl-3 rounded-[10px] ${
                              isActive && "bg-primary text-white"
                            }`}
                          >
                            <Icon
                              className={`w-4 h-4 ${isActive && "text-white"}`}
                            />
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
      <div className="flex items-center justify-between border-t border-t-secondary p-3">
        <div className="flex items-center gap-x-1">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <Avatar
                name={`${user?.data?.first_name} ${user?.data?.last_name}`}
                src={`${user?.data?.image!}`}
                className="text-lg text-white font-bold object-cover overflow-hidden"
                rounded="none"
                customSize={40}
              />
            </div>
          </div>
          <div className="max-w-[70%] truncate">
            <h6 className="text-small-bold truncate">
              {user?.data?.first_name} {user?.data?.last_name}
            </h6>
            <label className="text-extra-small-regular text-[#777777] truncate">
              {user?.data?.email}
            </label>
          </div>
        </div>
        <div className="cursor-pointer" onClick={handleLogout}>
          <LogOut className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default CustomerSideBar;
