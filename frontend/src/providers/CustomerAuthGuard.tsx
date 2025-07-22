"use client";
import { useUserStore } from "@/zustand/userStore";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import useAuthStore from "@/zustand/authStore";
import { showinfo } from "@/utils/showPopup";

function CustomerAuthGuard({ children }: React.PropsWithChildren) {
  const { user } = useUserStore();
  const { userData, isLoggedIn } = useAuthStore();
  const router = useRouter();
  const localActive = useLocale();

  useEffect(() => {
    if (!userData?.token || !isLoggedIn) {
      showinfo("Unauthorized. Redirecting to login....");
      router.push(`/${localActive}/login`);
    } else if (userData.user_type !== "customer") {
      showinfo("Access denied. Login with a Customer Account. Redirecting...");
      router.push(`/${localActive}/register`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?.token, isLoggedIn]);

  return <>{children}</>;
}

export default CustomerAuthGuard;
