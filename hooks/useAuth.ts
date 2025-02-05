import { create } from 'zustand';

interface User {
  id: number;
  email: string;
  username: string;
  email_verified_at: string | null;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (data: { email: string; password: string; username: string }) => Promise<void>;
  logout: () => Promise<void>;
  checkEmailVerification: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  
  login: async (credentials) => {
    try {
      const response = await api.post('/login', credentials);
      set({ 
        isAuthenticated: true, 
        user: response.data.user,
        isLoading: false 
      });
    } catch (error) {
      throw error;
    }
  },

  register: async (data) => {
    try {
      const response = await api.post('/register', data);
      set({ 
        isAuthenticated: true, 
        user: response.data.user,
        isLoading: false 
      });
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post('/logout');
      set({ 
        isAuthenticated: false, 
        user: null,
        isLoading: false 
      });
    } catch (error) {
      throw error;
    }
  },

  checkEmailVerification: async () => {
    try {
      const response = await api.get('/user');
      set({ 
        user: response.data,
        isLoading: false 
      });
    } catch (error) {
      throw error;
    }
  },
}));