import { create } from 'zustand';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from '@/lib/api/tokenService';

interface User {
  user_id: string;
  email: string;
}

interface AuthState {
  user: User | null;

  login: (user: User, access: string, refresh: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  login: (user, access, refresh) => {
    setTokens(access, refresh);
    set({ user });
  },

  logout: () => {
    clearTokens();
    set({ user: null });
  },
}));
