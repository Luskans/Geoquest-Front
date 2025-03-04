import { create } from 'zustand';
import axios from 'axios';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

interface Ranking {
  username: string;
  image: string;
  score: number;
}

interface UserRank {
  score: number;
  rank: number;
}

// interface PlayerRank {
//   username: string;
//   image: string;
//   score: number;
//   rank: number;
// }

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
  lastFetched: { [key: string]: number };
  isLoading: boolean;
  fetchLeaderboardData: (params: { period: 'week' | 'month' | 'all'; limit?: number; offset?: number; }) => Promise<void>;
}

export const useLeaderboardStore = create<LeaderboardState>((set, get) => ({
  ranking: { week: [], month: [], all: [] },
  userRank: { week: null, month: null, all: null },
  lastFetched: {},
  isLoading: false,

  fetchLeaderboardData: async ({ period, limit, offset = 0 }) => {
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes en millisecondes
    const now = Date.now();

    const lastFetched = get().lastFetched[period];
    if (lastFetched !== null && (now - lastFetched < CACHE_DURATION)) {
      return;
    }

    set({ isLoading: true });

    try {
      const response = await axios.get(apiUrl + '/leaderboard', {
        params: { period, limit, offset }
      });
      const data = response.data;

      set((state) => ({
        ranking: { ...state.ranking, [period]: data.ranking },
        userRank: { ...state.userRank, [period]: data.userRank },
        lastFetched: { ...state.lastFetched, [period]: now },
      }));

    } catch (error) {
      console.error('Erreur lors du fetch des données du classement:', error);

    } finally {
      set({ isLoading: false });
    }
  },
}));