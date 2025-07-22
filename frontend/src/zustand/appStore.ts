import { create } from "zustand";

interface IAppStore {
  isCategoryDrawerOpen: boolean;
  toggleCategoryDrawer: (categoryDrawer: boolean) => void;
  isProductDrawerOpen: boolean;
  toggleProductDrawer: (productDrawer: boolean) => void;
  loadingSpinner: boolean;
  toggleLoadingSpinner: (loadingSpinner: boolean) => void;
  shippingDestination: string;
  handleShippingDestination: (shippingDestination: string) => void;
  language: string;
  handleLanguage: (language: string) => void;
  currency: string;
  handleCurrency: (currency: string) => void;
}

const initialState: IAppStore = {
  isCategoryDrawerOpen: false,
  isProductDrawerOpen: false,
  loadingSpinner: false,
  shippingDestination: "",
  language: "",
  currency: "",
  handleShippingDestination: () => {},
  toggleCategoryDrawer: () => {},
  toggleProductDrawer: () => {},
  toggleLoadingSpinner: () => {},
  handleLanguage: () => {},
  handleCurrency: () => {},
};

export const useAppStore = create<IAppStore>((set) => ({
  ...initialState,
  toggleCategoryDrawer: (isCategoryDrawerOpen) => set({ isCategoryDrawerOpen }),
  toggleProductDrawer: (isProductDrawerOpen) => set({ isProductDrawerOpen }),
  toggleLoadingSpinner: (loadingSpinner) => set({ loadingSpinner }),
  handleShippingDestination: (shippingDestination) =>
    set({ shippingDestination }),
  handleLanguage: (language) => set({ language }),
  handleCurrency: (currency) => set({ currency }),
}));
