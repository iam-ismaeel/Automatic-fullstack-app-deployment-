import { LoginVerifyData } from "@/interfaces/seller";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  userData: LoginVerifyData;
  isLoggedIn: boolean;
  login: (userData: LoginVerifyData) => void;
  logout: () => void;
  setUserData: (userData: Partial<LoginVerifyData>) => void;
}

const initialState = {
  user_id: "",
  has_signed_up: false,
  expires_at: null,
  is_affiliate_member: false,
  token: "",
  user_type: "",
  data: null,
};
const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      userData: { ...initialState },
      isLoggedIn: false,
      login: (userData: LoginVerifyData) => set({ userData, isLoggedIn: true }),
      logout: () => set({ userData: { ...initialState }, isLoggedIn: false }),
      setUserData: (userData: Partial<LoginVerifyData>) => {
        set((state) => ({
          userData: {
            ...state.userData,
            ...userData,
          },
        }));
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
