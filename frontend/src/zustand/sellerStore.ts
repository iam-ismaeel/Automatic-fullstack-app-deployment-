import { create } from "zustand";

interface ISellerStore {
  isSellerDrawerOpen: boolean;
  toggleSellerDrawer: (categoryDrawer: boolean) => void;
}

const initialState: ISellerStore = {
  isSellerDrawerOpen: false,
  toggleSellerDrawer: () => {},
};

export const useSellerStore = create<ISellerStore>((set) => ({
  ...initialState,
  toggleSellerDrawer: (isSellerDrawerOpen) => set({ isSellerDrawerOpen }),
}));
