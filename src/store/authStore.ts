import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    // Simulate API call
    if (email === 'demo@example.com' && password === 'demo123') {
      set({
        user: {
          id: '1',
          email,
          name: 'Demo User',
        },
        isAuthenticated: true,
      });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));