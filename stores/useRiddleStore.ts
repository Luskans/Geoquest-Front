import { create } from 'zustand';
import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface RiddleList {
  id: number;
  title: string;
  is_private: boolean;
  difficulty: number;
  latitude: string;
  longitude: string;
  rating: number;
  stepCount: number;
}

export interface RiddleDetail {
  id: number;
  title: string;
  description: string;
  is_private: boolean;
  password: string | null;
  status: 'active' | 'draft' | 'disabled';
  created_at: string;
  updated_at: string;
  difficulty: number;
  latitude: string;
  longitude: string;
}

export interface DraftCreate {
  title: string;
  description: string;
  is_private: boolean;
  password: string | null;
  difficulty: number;
  latitude: string;
  longitude: string;
}

export interface RiddleState {
  riddleList: {
    riddles: RiddleList[] | null;
    offset: number;
    isLoading: boolean;
    error: string | null;
  }
  riddleDetail: {
    riddle: RiddleDetail | null;
    isLoading: boolean;
    error: string | null;
  }
  createdList: {
    riddles: RiddleList[] | null;
    offset: number;
    isLoading: boolean;
    error: string | null;
  }
  draftCreate: DraftCreate | null;
  fetchRiddleList: (params?: { limit?: number; offset?: number; }) => Promise<void>;
  fetchRiddleDetail: (id: string) => Promise<void>;
  fetchCreatedList: (params?: { limit?: number; offset?: number }) => Promise<void>;
  createRiddle: (data: DraftCreate) => Promise<void>;
  updateRiddle: (id: string, data: Partial<DraftCreate>) => Promise<void>;
  deleteRiddle: (id: string) => Promise<void>;
}

export const useRiddleStore = create<RiddleState>((set, get) => ({
  riddleList: {
    riddles: [],
    offset: 0,
    isLoading: false,
    error: null,
  },
  riddleDetail: {
    riddle: null,
    isLoading: false,
    error: null,
  },
  createdList: {
    riddles: [],
    offset: 0,
    isLoading: false,
    error: null,
  },
  draftCreate: null,

  fetchRiddleList: async ({ limit = 20, offset = 0 } = {}) => {
    set((state) => ({
      riddleList: { ...state.riddleList, isLoading: true, error: null },
    }));

    try {
      const response = await axios.get(`${API_URL}/riddles`, {
        params: { limit, offset }
      });
      const data = response.data;

      set((state) => ({
        riddleList: {
          ...state.riddleList,
          riddles: [...state.riddleList.riddles, ...data.riddles],
          offset: state.riddleList.offset + data.riddles.length,
        },
      }));

    } catch (error: any) {
      console.error('Erreur lors du fetch de la liste des énigmes:', error);
      set((state) => ({
        riddleList: {
          ...state.riddleList,
          error: error.response?.data?.message || 'Erreur lors du chargement de la liste des énigmes',
        },
      }));

    } finally {
      set((state) => ({
        riddleList: { ...state.riddleList, isLoading: false },
      }));
    }
  },

  fetchRiddleDetail: async (id: string) => {
    set((state) => ({
      riddleDetail: { ...state.riddleDetail, isLoading: true, error: null },
    }));

    try {
      const response = await axios.get(`${API_URL}/riddles/${id}`);
      const data = response.data;
      // Si l'API renvoie directement l'objet riddle ou s'il est encapsulé dans data.riddle
      set((state) => ({
        riddleDetail: {
          ...state.riddleDetail,
          riddle: data.riddle || data,
        },
      }));

    } catch (error: any) {
      console.error('Erreur lors du fetch du détail de l\'énigme:', error);
      set((state) => ({
        riddleDetail: {
          ...state.riddleDetail,
          error: error.response?.data?.message || 'Erreur lors du chargement du détail de l\'énigme',
        },
      }));

    } finally {
      set((state) => ({
        riddleDetail: { ...state.riddleDetail, isLoading: false },
      }));
    }
  },

  fetchCreatedList: async ({ limit = 20, offset = 0 } = {}) => {
    set((state) => ({
      createdList: { ...state.createdList, isLoading: true, error: null },
    }));

    try {
      const response = await axios.get(`${API_URL}/riddles/created/list`, {
        params: { limit, offset },
      });
      const data = response.data;
      set((state) => ({
        createdList: {
          ...state.createdList,
          riddles: [...state.createdList.riddles, ...data.riddles],
          offset: state.createdList.offset + data.riddles.length,
        },
      }));

    } catch (error: any) {
      console.error('Erreur lors du fetch des énigmes créées:', error);
      set((state) => ({
        createdList: {
          ...state.createdList,
          error: error.response?.data?.message || 'Erreur lors du chargement des énigmes créées',
        },
      }));

    } finally {
      set((state) => ({
        createdList: { ...state.createdList, isLoading: false },
      }));
    }
  },


  createRiddle: async (data: DraftCreate) => {
    try {
      const response = await axios.post(`${API_URL}/riddles`, data);
      set((state) => ({
        createdList: {
          ...state.createdList,
          riddles: [response.data, ...state.createdList.riddles],
        },
      }));

    } catch (error: any) {
      console.error('Erreur lors de la création de l\'énigme:', error);
    }
  },

  updateRiddle: async (id: string, data: Partial<DraftCreate>) => {
    try {
      const response = await axios.put(`${API_URL}/riddles/${id}`, data);
      set((state) => ({
        createdList: {
          ...state.createdList,
          riddles: state.createdList.riddles!.map(riddle =>
            riddle.id.toString() === id ? response.data : riddle
          ),
        },
        riddleDetail: state.riddleDetail.riddle && state.riddleDetail.riddle.id.toString() === id ? {
          ...state.riddleDetail,
          riddle: response.data,
        } : state.riddleDetail,
      }));

    } catch (error: any) {
      console.error('Erreur lors de la mise à jour de l\'énigme:', error);
    }
  },

  deleteRiddle: async (id: string) => {
    try {
      await axios.delete(`${API_URL}/riddles/${id}`);
      set((state) => ({
        createdList: {
          ...state.createdList,
          riddles: state.createdList.riddles!.filter(riddle => riddle.id.toString() !== id),
        },
      }));

    } catch (error: any) {
      console.error('Erreur lors de la suppression de l\'énigme:', error);
    }
  },
  
}));