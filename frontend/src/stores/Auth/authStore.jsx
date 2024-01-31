import { AuthService } from '../../services/authService';
import { devtools, persist } from 'zustand/middleware';
import { create } from 'zustand';

export const storeApi = (set) => ({
  status: 'pending',
  token: undefined,
  user: undefined,
  login: async (email, password) => {
    try {
      const { token, ...user } = await AuthService.login(email, password);
      set({ status: 'authorized', token, user });
    } catch (error) {
      set({ status: 'unauthorized', token: undefined, user: undefined });
      throw error;
    }
  },

  register: async (email, fullName, password) => {
    try {
      const { token, ...user } = await AuthService.register(email, fullName, password);
      set({ status: 'authorized', token, user });
    } catch (error) {
      set({ status: 'unauthorized', token: undefined, user: undefined });
      throw error;
    }
  },

  socialLogin: async (email, socialId, source) => {
    try {
      const { token, ...user } = await AuthService.socialLogin(email, socialId, source);
      set({ status: 'authorized', token, user });
    } catch (error) {
      set({ status: 'unauthorized', token: undefined, user: undefined });
      throw error;
    }
  },

  socialRegister: async (email, fullName, socialId, source, picture) => {
    try {
      const { token, ...user } = await AuthService.socialRegister(email, fullName, socialId, source, picture);
      set({ status: 'authorized', token, user });
    } catch (error) {
      set({ status: 'unauthorized', token: undefined, user: undefined });
      throw error;
    }
  },

  logout: () => {
    set({ status: 'unauthorized', token: undefined, user: undefined });
  },

  checkAuthStatus: async () => {
    try {
      const { token, ...user } = await AuthService.checkStatus();
      set({ status: 'authorized', token, user });
    } catch (error) {
      set({ status: 'unauthorized', token: undefined, user: undefined });
      throw 'Unauthorized';
    }
  },
});

export const useAuthStore = create()(persist(devtools(storeApi), { name: 'auth-storage' }));
