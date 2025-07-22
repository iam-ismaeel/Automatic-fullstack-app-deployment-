import { IUserStore, useUserStore } from "@/zustand/userStore";
import useStore from "@/zustand/useStore";
import { useProfileQuery } from "@/api/user";
import { useEffect } from "react";

function useUserSetup() {
  // do every logic to get the user info and store it here
  const userStore = useStore<IUserStore, IUserStore>(
    useUserStore,
    (state: any) => state
  );
  const user = userStore?.user;
  const setUser = userStore?.setUser;
  const { data } = useProfileQuery({
    enabled: user?.is_logged_in && !user?.is_profile_fetched,
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });
  useEffect(() => {
    if (data && user && setUser) {
      setUser({
        ...user,
        data: data.data,
        is_profile_fetched: true,
      });
    }
  }, [data, setUser, user]);
}

export default useUserSetup;
