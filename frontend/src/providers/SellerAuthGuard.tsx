"use client";
import { showinfo } from "@/utils/showPopup";
import useAuthStore from "@/zustand/authStore";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

function SellerAuthGuard({ children }: React.PropsWithChildren) {
  const { userData, isLoggedIn } = useAuthStore();

  const router = useRouter();
  const localActive = useLocale();

  useEffect(() => {
    if (!userData?.token || !isLoggedIn) {
      showinfo("Unauthorized. Redirecting to login....");
      router.push(`/${localActive}/seller-login`);
    } else if (userData.user_type !== "seller") {
      showinfo("Access denied. Login with a Seller Account. Redirecting...");
      router.push(`/${localActive}/seller-signup`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?.token, isLoggedIn]);

  return <>{children}</>;
}

export default SellerAuthGuard;
