import { create } from "zustand";

interface IAffStore {
  isAffiliateDrawerOpen: boolean;
  toggleAffiliateDrawer: (categoryDrawer: boolean) => void;
}

const initialState: IAffStore = {
  isAffiliateDrawerOpen: false,
  toggleAffiliateDrawer: () => {},
};

export const useAffStore = create<IAffStore>((set) => ({
  ...initialState,
    toggleAffiliateDrawer: (isAffiliateDrawerOpen) => set({ isAffiliateDrawerOpen }),
}))