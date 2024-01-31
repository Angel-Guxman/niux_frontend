import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const storeOrderSearch = (set) => ({
  orderSearch: null,
  setOrderSearch: (orderSearch) => set({ orderSearch }),
});

export const useOrderSearch = create(devtools(storeOrderSearch));
