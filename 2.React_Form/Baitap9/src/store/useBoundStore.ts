import { create } from 'zustand'
import { createAuthSlice, type AuthSlice } from './authSlice'
import { createUiSlice, type UiSlice } from './uiSlice'

export type BoundState = AuthSlice & UiSlice

export const useBoundStore = create<BoundState>()((...a) => ({
  ...createAuthSlice(...a),
  ...createUiSlice(...a),
}))
