import { create } from 'zustand';
import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface Ranking {
  name: string;
  image: string;
  score: number;
}

interface UserRank {
  score: number;
  rank: number;
}

interface LeaderboardState {
  ranking: {
    week: Ranking[];
    month: Ranking[];
    all: Ranking[];
  }
  userRank: {
    week: UserRank | null;
    month: UserRank | null;
    all: UserRank | null;
  }
  offset : number;
  isLoading: boolean;
  error: string | null;
  fetchLeaderboardData: (params: { limit?: number; offset?: number; }) => Promise<void>;
  resetLeaderboardData: () => void;

}

export const useLeaderboardStore = create<LeaderboardState>((set, get) => ({
  ranking: { week: [], month: [], all: [] },
  userRank: { week: null, month: null, all: null },
  offset: 0,
  isLoading: false,
  error: null,

  fetchLeaderboardData: async ({ limit = 20, offset = 0 }) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(API_URL + '/leaderboard', {
        params: { limit, offset }
      });
      const data = response.data;

      set((state) => ({
        ranking: {
          week: [...state.ranking.week, ...data.ranking.week],
          month: [...state.ranking.month, ...data.ranking.month],
          all: [...state.ranking.all, ...data.ranking.all]
        },
        userRank: data.userRank,
        offset: offset + limit
      }));

    } catch (error) {
      console.error('Erreur lors du fetch des données Leaderboard:', error);
      console.error('Erreur lors du fetch des données Leaderboard2:', error.message);
      console.error('Erreur lors du fetch des données Leaderboard3:', error.response.data.message);
      set({ error: 'Erreur lors du chargement de home' });

    } finally {
      set({ isLoading: false });
    }
  },

  resetLeaderboardData: () => {
    set({
      ranking: { week: [], month: [], all: [] },
      offset: 0,
    });
  },
}));