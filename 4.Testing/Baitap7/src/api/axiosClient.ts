import axios from 'axios'

export const FAKE_ACCESS_TOKEN = 'fake-jwt-access-token-abc123xyz'

const TOKEN_KEY = 'access_token'

export function login() {
  localStorage.setItem(TOKEN_KEY, FAKE_ACCESS_TOKEN)
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

const axiosClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

axiosClient.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

export default axiosClient
