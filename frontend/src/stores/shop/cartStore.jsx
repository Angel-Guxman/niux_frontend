import { create } from 'zustand';
import { productService } from '../../services/productService';

const storeCart = (set) => ({
  cart: [],
  setCart: async () => {
    try {
      const response = await productService.getCartUser();
      set({ cart: response });
    } catch (error) {
      throw error;
    }
  },
  reloadCart: async () => {
    try {
      const response = await productService.getCartUser();
      set({ cart: response });
    } catch (error) {
      throw error;
    }
  },
});

export const useCartStore = create(storeCart);

(async () => {
  try {
    await useCartStore.getState().setCart();
  } catch (error) {
    console.error('Error al inicializar la aplicación:', error);
  }
})();
