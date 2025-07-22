"use client";
import { showinfo } from "@/utils/showPopup";
import useAuthStore from "@/zustand/authStore";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function AffiliateAuthGuard({ children }: React.PropsWithChildren) {
  const { userData, isLoggedIn } = useAuthStore();

  const router = useRouter();
  const localActive = useLocale();

  useEffect(() => {
    if (!userData?.token || !isLoggedIn) {
      showinfo("Unauthorized. Redirecting to login....");
      router.push(`/${localActive}/affiliate-login`);
    } else if (
      userData.user_type !== "seller" &&
      userData.is_affiliate_member !== true
    ) {
      showinfo("Access denied. Create an Affiliate Account. Redirecting...");
      router.push(`/${localActive}/register`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?.token, isLoggedIn]);

  return <>{children}</>;
}

export default AffiliateAuthGuard;
