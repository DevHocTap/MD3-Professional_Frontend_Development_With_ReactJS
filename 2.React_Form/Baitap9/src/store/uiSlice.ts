import type { StateCreator } from 'zustand'
import type { BoundState } from './useBoundStore'

export interface UiSlice {
  toast: string | null
  showToast: (message: string) => void
  clearToast: () => void
}

export const createUiSlice: StateCreator<BoundState, [], [], UiSlice> = (
  set,
) => ({
  toast: null,
  showToast: (message) => set({ toast: message }),
  clearToast: () => set({ toast: null }),
})
