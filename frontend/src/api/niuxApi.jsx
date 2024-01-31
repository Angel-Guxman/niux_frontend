import axios from 'axios';
import { useAuthStore } from '../stores/Auth/authStore';

const niuxApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

niuxApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export { niuxApi };
