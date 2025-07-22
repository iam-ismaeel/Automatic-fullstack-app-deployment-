"use client";
import useStore from "@/zustand/useStore";
import { IUserStore, useUserStore } from "@/zustand/userStore";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function ProtectedProvider({ children }: React.PropsWithChildren) {
  const userStore = useStore<IUserStore, IUserStore>(
    useUserStore,
    (state: any) => state
  );

  const user = userStore?.user;

  const router = useRouter();
  const localActive = useLocale();

  useEffect(() => {
    if (!user) {
      return;
    }
    if (!user.is_logged_in) {
      router.push(`/${localActive}/login`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!userStore) {
    return null;
  }

  return <>{children}</>;
}

export default ProtectedProvider;
