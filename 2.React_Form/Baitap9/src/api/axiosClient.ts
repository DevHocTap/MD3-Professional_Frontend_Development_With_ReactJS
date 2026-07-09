import axios from 'axios'
import { useBoundStore } from '../store/useBoundStore'

export const axiosClient = axios.create({
  baseURL: 'https://api.example.com',
})

axiosClient.interceptors.request.use((config) => {
  const token = useBoundStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  } else {
    delete config.headers.Authorization
  }
  console.log(
    '[Interceptor] Authorization =',
    config.headers.Authorization ?? '(không gắn header)',
  )
  return config
})
