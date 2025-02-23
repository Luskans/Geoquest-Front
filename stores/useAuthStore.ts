// import { create } from 'zustand';
// import * as SecureStore from 'expo-secure-store';

// interface AuthState {
//   user: any | null;
//   token: string | null;
//   setUser: (user: any) => void;
//   setToken: (token: string) => void;
//   logout: () => Promise<void>;
//   restoreAuth: () => Promise<void>;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   user: null,
//   token: null,

//   setUser: (user: any) => {
//     set({ user });
//     SecureStore.setItemAsync('user', JSON.stringify(user));
//   },

//   setToken: (token: string) => {
//     set({ token });
//     SecureStore.setItemAsync('token', token);
//   },

//   login: (user: any, token: string) => {
//     set({ user: user, token: token });
//     SecureStore.setItemAsync('user', JSON.stringify(user));
//     SecureStore.setItemAsync('token', token);
//   },

//   logout: async () => {
//     set({ user: null, token: null });
//     await SecureStore.deleteItemAsync('user');
//     await SecureStore.deleteItemAsync('token');
//   },

//   restoreAuth: async () => {
//     const persistedUser = await SecureStore.getItemAsync('user');
//     const persistedToken = await SecureStore.getItemAsync('token');
//     if (persistedUser && persistedToken) {
//       set({ user: JSON.parse(persistedUser), token: persistedToken });
//     }
//   }
// }));




import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

interface User {
  id: number;
  username: string;
  email: string;
  email_verified_at: string | null;
  description: string | null;
  image: string | null;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, password_confirmation: string) => Promise<void>;
  logout: () => Promise<void>;
  // checkEmailVerification: () => Promise<void>;
  setIsAuthenticated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,

  setIsAuthenticated: (value: any) => {
    set({isAuthenticated: value}),
    set({isLoading: false})
  },
  
  initialize: async () => {
    try {
      const token = await SecureStore.getItemAsync('token');

      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Récupère les informations de l'utilisateur
        const response = await axios.get(apiUrl + '/user');
        
        set({
          user: response.data,
          token,
          isAuthenticated: true,
          isLoading: false,
        });

      } else {
        set({ isLoading: false });
      }

    } catch (error) {
      await SecureStore.deleteItemAsync('token');

      set({ 
        user: null, 
        token: null, 
        isAuthenticated: false, 
        isLoading: false 
      });
    }
  },

  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(apiUrl + '/login', { email, password });
      const { user, token } = response.data;

      await SecureStore.setItemAsync('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      set({ 
        user,
        token,
        isAuthenticated: true
      });

    } catch (error) {
      throw error;
    }
  },

  register: async (username: string, email: string, password: string, password_confirmation: string) => {
    try {
      const response = await axios.post(apiUrl + '/register', {
        username,
        email,
        password,
        password_confirmation,
      });

      const { user, token } = response.data;

      await SecureStore.setItemAsync('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      set({ 
        user,
        token,
        isAuthenticated: true, 
      });

    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      // const { token } = get();

      // await axios.post(apiUrl + '/logout', {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`,
      //   }
      // });

      await axios.post(apiUrl + '/logout');

      

    } catch (error) {
      throw error;

    } finally {
      await SecureStore.deleteItemAsync('token');
      delete axios.defaults.headers.common['Authorization'];

      set({ 
        user: null,
        token: null,
        isAuthenticated: false, 
      });
    }
  },

  // checkEmailVerification: async () => {
  //   try {
  //     const response = await api.get('/user');
  //     set({ 
  //       user: response.data,
  //       isLoading: false 
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // },
}));