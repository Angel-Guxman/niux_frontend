import { create } from 'zustand';

const storeSearch = (set) => ({
  search: null,
  setSearch: (search) => set({ search }),
});

export const useSearchStore = create(storeSearch);
