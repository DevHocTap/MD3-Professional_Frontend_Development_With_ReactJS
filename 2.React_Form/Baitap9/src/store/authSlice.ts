import type { StateCreator } from 'zustand'
import type { BoundState } from './useBoundStore'

export interface AuthSlice {
  token: string | null
  login: (token: string) => void
  logout: () => void
}

export const createAuthSlice: StateCreator<BoundState, [], [], AuthSlice> = (
  set,
) => ({
  token: null,
  login: (token) => set({ token }),
  logout: () => set({ token: null }),
})
