import { create } from 'zustand';
import axios from 'axios';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export interface Riddle {
  id: number;
  title: string;
  description: string;
  // Ajoutez ici d'autres propriétés pertinentes
}

interface ParticipatedRiddlesState {
  riddles: Riddle[];
  lastFetched: number | null;
  isLoading: boolean;
  fetchRiddles: () => Promise<void>;
}

export const useParticipatedRiddlesStore = create<ParticipatedRiddlesState>((set, get) => ({
  riddles: [],
  lastFetched: null,
  isLoading: false,
  fetchRiddles: async () => {
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes en millisecondes
    const now = Date.now();

    const lastFetched = get().lastFetched;
    if (lastFetched !== null && (now - lastFetched < CACHE_DURATION)) {
      return;
    }

    set({ isLoading: true });

    try {
      const response = await axios.get(apiUrl + '/riddles/created');
      set({
        riddles: response.data,
        lastFetched: now,
      });
    } catch (error) {
      console.error('Erreur during fetching participated riddles:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));