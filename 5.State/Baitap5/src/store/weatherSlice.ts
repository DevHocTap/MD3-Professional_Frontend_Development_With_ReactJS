import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface WeatherState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  description: string
}

const initialState: WeatherState = {
  status: 'idle',
  description: '',
}

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async () => {
  const res = await fetch('https://api.example.com/weather/hanoi')
  const data = await res.json()
  return data.description as string
})

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.description = action.payload
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export default weatherSlice.reducer
