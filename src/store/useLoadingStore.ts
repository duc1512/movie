import { create } from 'zustand';

interface LoadingState {
  isLoading: boolean;
  setIsLoading: (status: boolean) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false, // Mặc định là không loading
  setIsLoading: (status) => set({ isLoading: status }),
}));