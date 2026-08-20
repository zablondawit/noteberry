import type { Layout } from "react-resizable-panels";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UIState {
  resultOpen: boolean;
  toggleResult: () => void;

  editorLayout?: Layout;
  setEditorLayout: (layout: Layout) => void;
}

export const useUIStore = create(
  persist<UIState>(
    (set) => ({
      resultOpen: true,
      toggleResult: () => set((state) => ({ resultOpen: !state.resultOpen })),
      setEditorLayout: (layout) => set({ editorLayout: layout }),
    }),
    {
      name: "ui-state-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
