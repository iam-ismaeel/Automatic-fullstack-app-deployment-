import { create } from "zustand";

type DropdownState = {
  openDropdown: string | null;
  setOpenDropdown: (id: string | null) => void;
};

export const useDropdownStore = create<DropdownState>((set) => ({
  openDropdown: null,
  setOpenDropdown: (id: string | null) => set(() => ({ openDropdown: id })),
}));
