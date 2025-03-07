import { create } from 'zustand';
import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface SessionStep {
  id: number;
  // Ajoute ici les autres propriétés nécessaires pour une session_step
}

export interface RiddleStep {
  id: number;
  orderNumber: number;
}

export interface Riddle {
  id: number;
  title: string;
  description: string;
  difficulty: number;
  showDistance: boolean;
  status: 'draft' | 'active' | 'disabled';
  latitude: number;
  longitude: number;
  // Ajoute ici d'autres champs si nécessaires
  steps: RiddleStep[];
}

export interface GameSession {
  id: number;
  status: string;
  riddle: Riddle;
  sessionSteps: SessionStep[];
}

interface ActiveRiddleState {
  gameSession: GameSession | null;
  isLoading: boolean;
  error: string | null;
  fetchActiveRiddle: (userId: number) => Promise<void>;
}

// TODO : ne pas passer le user id en param, le récupérer côté back
export const useActiveRiddleStore = create<ActiveRiddleState>((set) => ({
  gameSession: null,
  isLoading: false,
  error: null,
  fetchActiveRiddle: async (userId: number) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`${API_URL}/active-riddle`, {
        params: { userId }
      });
      set({ gameSession: response.data });

    } catch (err: any) {
      console.error('Erreur lors du fetch de l’énigme active:', err);
      set({ error: 'Erreur lors du chargement de l’énigme active' });

    } finally {
      set({ isLoading: false });
    }
  },
}));