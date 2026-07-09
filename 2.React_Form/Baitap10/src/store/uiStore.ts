import { create } from 'zustand'

interface UiState {
  selectedId: number | null
  open: (id: number) => void
  close: () => void
}

export const useUiStore = create<UiState>((set) => ({
  selectedId: null,
  open: (id) => set({ selectedId: id }),
  close: () => set({ selectedId: null }),
}))
