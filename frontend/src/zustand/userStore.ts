import { IUserData } from "@/interfaces/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUser {
    data: IUserData | null;
    token: string;
    user_id: number,
    user_type: string;
    is_logged_in: boolean;
    is_profile_fetched: boolean;
}

export interface IUserStore {
    user: IUser;
    setUser: (userData: Partial<IUser>) => void;
    resetUser: () => void;
}

const initialState: IUserStore = {
    user: {
        data: null,
        token: "",
        user_id: 0,
        user_type: "",
        is_logged_in: false,
        is_profile_fetched: false,
    },
    setUser: () => {},
    resetUser: () => {},
};

export const useUserStore = create(
  persist<IUserStore>(
    (set) => ({
      user: {
        ...initialState.user,
      },
      setUser: (userData) => {
        set((state) => ({
          user: {
            ...state.user,
            ...userData,
              is_logged_in: true
          },
        }));
      },
      resetUser: () => {
        set(() => ({
          user: {
            ...initialState.user,
          },
        }));
      },
    }),
    {
      name: "user-storage",
    }
  )
);
