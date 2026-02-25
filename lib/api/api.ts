import axios from 'axios';
import { getAccessToken, clearTokens } from './tokenService';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Attach Token ─────────────────────────
api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ─── Handle 401 ─────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearTokens();

      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error);
  },
);
