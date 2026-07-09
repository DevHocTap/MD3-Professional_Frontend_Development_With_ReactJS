import { create } from 'zustand'

export type OrderStatus = 'All' | 'Pending' | 'Shipped' | 'Delivered'

interface FilterState {
  status: OrderStatus
  searchInput: string
  search: string
  setStatus: (status: OrderStatus) => void
  setSearch: (raw: string) => void
}

export const useFilterStore = create<FilterState>((set) => ({
  status: 'All',
  searchInput: '',
  search: '',
  setStatus: (status) => set({ status }),
  setSearch: (raw) => set({ searchInput: raw, search: raw.trim() }),
}))
