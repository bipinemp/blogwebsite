import { create } from "zustand";

interface SearchState {
  isSearch: boolean;
  setSearch: () => void;
  unsetSearch: () => void;
  searchValue: string;
  setSearchValue: (val: string) => void;
}

export const useSearchStore = create<SearchState>()((set) => ({
  searchValue: "",
  isSearch: false,
  setSearchValue: (val) => set({ searchValue: val }),
  setSearch: () => set({ isSearch: true }),
  unsetSearch: () => set({ isSearch: false }),
}));
