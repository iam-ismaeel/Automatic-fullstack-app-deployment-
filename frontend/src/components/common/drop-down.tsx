"use client";
import { Dropdown, Button, cn, ActionIcon } from "rizzui";
import {
  User,
  SignIn,
  SignUp,
  WishList,
  Packages,
  TrackOrders,
  Dashboard,
} from "@icons";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useUserStore } from "@/zustand/userStore";
import useAuthStore from "@/zustand/authStore";
import { useEffect } from "react";
import { showinfo } from "@/utils/showPopup";

export default function DropDown() {
  const localActive = useLocale();
  const { user, resetUser } = useUserStore();
  const { userData, logout } = useAuthStore();

  useEffect(() => {
    if (userData?.data === null || !user.is_logged_in) {
      // resetUser();
    }
  }, [userData?.data, user.is_logged_in]);

  return (
    <Dropdown placement="bottom-end">
      <Dropdown.Trigger className="inline-flex items-center gap-2 rounded-md border border-primary-light px-4 py-2 text-sm/6 font-semibold text-black shadow-inner shadow-white/10">
        <User className="h-[19px] w-[18px]" />
        <span className="slg:hidden truncate max-w-[60px]">
          {user?.data?.first_name && user.is_logged_in
            ? user?.data?.first_name
            : "Account"}
        </span>
      </Dropdown.Trigger>
      <Dropdown.Menu className="divide-y bg-white">
        <Dropdown.Item className="text-base-bold px-2 py-1.5">
          Welcome 🎉
        </Dropdown.Item>
        {userData?.data === null || !user.is_logged_in ? (
          <>
            <Dropdown.Item>
              <Link
                href={`/${localActive}/login`}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5  data-[focus]:bg-white/10 cursor-pointer"
              >
                <SignIn className="w-6 h-6" />
                <span className="text-small-medium">Sign In</span>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link
                href={`/${localActive}/register`}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5  data-[focus]:bg-white/10"
              >
                <SignUp className="w-6 h-6" />
                <span className="text-small-medium">Create an Account</span>
              </Link>
            </Dropdown.Item>
          </>
        ) : (
          <>
            <Dropdown.Item>
              <Link
                href={`/${localActive}/customer/dashboard`}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5  data-[focus]:bg-white/10 cursor-pointer"
              >
                <Dashboard className="w-6 h-6" />
                <span className="text-small-medium">Dashboard</span>
              </Link>
            </Dropdown.Item>
          </>
        )}
        <Dropdown.Item>
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5  data-[focus]:bg-white/10">
            <Packages className="w-6 h-6" />
            <span className="text-small-medium">Your Orders</span>
          </button>
        </Dropdown.Item>
        <Dropdown.Item>
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5  data-[focus]:bg-white/10">
            <TrackOrders className="w-6 h-6" />
            <span className="text-small-medium">Track Orders</span>
          </button>
        </Dropdown.Item>
        <Dropdown.Item>
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5  data-[focus]:bg-white/10">
            <WishList className="w-6 h-6" />
            <span className="text-small-medium">Your Wishlist</span>
          </button>
        </Dropdown.Item>
        {user.is_logged_in && (
          <Dropdown.Item>
            <button
              className="group flex w-full items-center gap-2 rounded-lg py-1.5  data-[focus]:bg-white/10"
              onClick={() => {
                resetUser();
                logout();
                showinfo("Logout successful");
              }}
            >
              <WishList className="w-6 h-6" />
              <span className="text-small-medium">Logout</span>
            </button>
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
