import { create } from 'zustand';

interface LoadingState {
  isLoading: boolean;
  message?: string;
  setLoading: (loading: boolean, message?: string) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  message: 'Loading...',
  setLoading: (loading, message = 'Loading...') => set({ isLoading: loading, message }),
}));
