import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'

export function makeStore() {
  return configureStore({
    reducer: {
      counter: counterReducer,
    },
  })
}

export const store = makeStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
