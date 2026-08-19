import { create } from "zustand";

interface UIState {
  resultOpen: boolean;
  toggleResult: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  resultOpen: true,
  toggleResult: () => set((state) => ({ resultOpen: !state.resultOpen })),
}));
