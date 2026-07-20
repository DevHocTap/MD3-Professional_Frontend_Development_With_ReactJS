import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from './weatherSlice'

export function makeStore() {
  return configureStore({
    reducer: {
      weather: weatherReducer,
    },
  })
}

export const store = makeStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
