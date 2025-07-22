"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ArrowBack, LogOut } from "../svg";
import Link from "next/link";
import { sellerPages } from "@/constants/seller";
import { Accordion, Avatar, Button } from "rizzui";
import { ChevronArrowIcon } from "../svg/seller/icons";
import { useLocale } from "next-intl";
import useAuthStore from "@/zustand/authStore";
import { showinfo } from "@/utils/showPopup";

const SellerSideBar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const localActive = useLocale();
  const { userData, logout } = useAuthStore();
  const router = useRouter();

  // Get the current status from URL
  const currentStatus = searchParams.get("status");

  // Helper function to check if a path is active
  const isLinkActive = (path: string) => {
    // For regular paths without query params (like /dashboard)
    if (!path.includes("?")) {
      // Special case for "All Orders" - it should only be active when there's no status parameter
      if (path === "/orders") {
        return pathname === `/${localActive}/seller${path}` && !currentStatus;
      }
      return pathname === `/${localActive}/seller${path}`;
    }

    // For paths with query params (like /orders?status=pending)
    const [basePath, queryString] = path.split("?");
    const isBasePathMatch = pathname === `/${localActive}/seller${basePath}`;

    if (!isBasePathMatch) return false;

    // Extract status from query string
    const statusMatch = queryString.match(/status=([^&]*)/);
    const linkStatus = statusMatch ? statusMatch[1] : null;

    // Compare with current status from URL
    return linkStatus === currentStatus;
  };

  return (
    <div className="sticky z-30 top-0 left-0 h-[100dvh] min-w-[250px] w-[250px] bg-[#fff] flex flex-col shadow-md md:hidden">
      <div className="py-3 px-2 bg-white border-b border-b-secondary">
        <Link
          href={`/${localActive}/seller`}
          className="flex items-center gap-x-2"
        >
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
        {sellerPages.map((page, index) => {
          return (
            <div key={index}>
              {!page.label ? (
                <>
                  {page.links.map((link, i) => {
                    // Use the new helper function
                    const isActive = isLinkActive(link.path);
                    const Icon = link.icon;
                    return (
                      <div key={i} className="group">
                        <Link
                          href={`/${localActive}/seller` + link.path}
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
                <Accordion
                  className="my-3"
                  key={page.label}
                  defaultOpen={page.label === "ACCOUNTS"} // Open "ACCOUNTS" by default
                >
                  <Accordion.Header>
                    {/* @ts-ignore */}
                    {({ open }) => (
                      <div className="flex w-full cursor-pointer items-center justify-between text-[13px] opacity-60 py-2">
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
                      // Use the new helper function here too
                      const isActive = isLinkActive(link.path);
                      const Icon = link.icon;
                      return (
                        <div key={i + "-" + link.name} className="mb-3 group">
                          <Link
                            href={`/${localActive}/seller` + link.path}
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

      <div className="flex items-center justify-between border-t border-t-secondary p-3">
        <div className="flex items-center gap-x-1">
          <div className="avatar">
            <div className="w-10 rounded-full border">
              <Avatar
                name={`${userData?.data?.first_name} ${userData?.data?.last_name}`}
                src={`${userData?.data?.image!}`}
                className="text-lg text-white font-bold object-cover overflow-hidden"
                rounded="none"
                customSize={40}
              />
            </div>
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
        <div className="">
          <Button
            onClick={() => {
              logout();
              showinfo("Logging out. redirecting to login...");
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
  );
};

export default SellerSideBar;
