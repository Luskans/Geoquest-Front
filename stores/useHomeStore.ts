import { create } from 'zustand';
import axios from 'axios';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

interface HomeState {
  notificationsCount: number;
  activeRiddle: any;
  participatedCount: number;
  createdCount: number;
  lastFetched: number | null;
  isLoading: boolean;
  fetchHomeData: () => Promise<void>;
}

export const useHomeStore = create<HomeState>((set, get) => ({
  notificationsCount: 0,
  activeRiddle: null,
  participatedCount: 0,
  createdCount: 0,
  lastFetched: null,
  isLoading: false,

  fetchHomeData: async () => {
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes en millisecondes
    const now = Date.now();

    const lastFetched = get().lastFetched;
    if (lastFetched !== null && (now - lastFetched < CACHE_DURATION)) {
      return;
    }

    set({ isLoading: true });

    try {
      const response = await axios.get(apiUrl + '/home');
      const data = response.data;

      set({
        notificationsCount: data.notificationsCount,
        activeRiddle: data.activeRiddle,
        participatedCount: data.participatedCount,
        createdCount: data.createdCount,
        lastFetched: now,
      });

    } catch (error) {
      console.error('Erreur lors du fetch des données Home:', error);

    } finally {
      set({ isLoading: false });
    }
  },
}));