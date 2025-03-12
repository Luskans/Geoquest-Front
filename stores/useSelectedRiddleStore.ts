import { create } from 'zustand';
import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

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
  error: string | null;
  fetchRiddleData: (params: { id: string }) => Promise<void>;
}

export const useSelectedRiddleStore = create<SelectedRiddleState>((set, get) => ({
  riddle: null,
  isLoading: false,
  error: null,

  setError: (error: string | null) => set({ error }),

  fetchRiddleData: async ({ id }) => {

    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`${API_URL}/riddles/${id}`);
      const data = response.data;

      set({
        riddle: data.riddle,
      });

    } catch (error) {
      console.error('Erreur lors du fetch des données selected:', error);
      console.error('Erreur lors du fetch des données selected2:', error.message);
      console.error('Erreur lors du fetch des données selected3:', error.response.data.message);
      set({ error: 'Erreur lors du chargement de selected' });

    } finally {
      set({ isLoading: false });
    }
  },
}));