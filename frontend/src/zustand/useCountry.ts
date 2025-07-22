import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CountryState {
  activeCountry: number;
  setActiveCountry: (country: number) => void;
}

const useCountryStore = create(
  persist<CountryState>(
    (set) => ({
      activeCountry: 231,
      setActiveCountry: (country: number) => set({ activeCountry: country }),
    }),
    {
      name: "country-storage",
    }
  )
);

export default useCountryStore;
