import { create } from 'zustand';
import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const CACHE_DURATION = Number(process.env.EXPO_PUBLIC_CACHE_DURATION);

interface Riddle {
  id: number;
  title: string;
  is_private: boolean;
  status: 'active' | 'draft' | 'disabled';
  created_at: string;
}

interface SelectedRiddleState {
  riddle: Riddle | null;
  isLoading: boolean;
  lastFetched: number | null;
  error: string | null;
  fetchRiddleData: (params: { id: string }) => Promise<void>;
}

export const useSelectedRiddleStore = create<SelectedRiddleState>((set, get) => ({
  riddle: null,
  isLoading: false,
  lastFetched: null,
  error: null,

  setError: (error: string | null) => set({ error }),

  fetchRiddleData: async (id) => {
    const now = Date.now();
    const lastFetched = get().lastFetched;
    if (lastFetched !== null && (now - lastFetched < CACHE_DURATION)) {
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`${API_URL}/riddles/created/list`, {
        params: { id }
      });
      const data = response.data;

      set({
        riddle: data.riddle,
        lastFetched: now,
      });

    } catch (error) {
      console.error('Erreur lors du fetch des données created:', error);
      console.error('Erreur lors du fetch des données created2:', error.message);
      console.error('Erreur lors du fetch des données created3:', error.response.data.message);
      set({ error: 'Erreur lors du chargement de created' });

    } finally {
      set({ isLoading: false });
    }
  },
}));