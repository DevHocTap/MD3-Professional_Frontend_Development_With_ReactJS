import axios, { AxiosError } from 'axios'

const TOKEN_KEY = 'access_token'

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response.data,
  (err: AxiosError) => {
    const status = err.response?.status

    if (status === 401) {
      localStorage.removeItem(TOKEN_KEY)
      window.location.href = '/login'
    } else if (status === 500) {
      console.error('[apiClient] Lỗi hệ thống phía server (500):', err.message)
    } else if (err.code === 'ECONNABORTED') {
      console.error('[apiClient] Request quá 5000ms (timeout)')
    }

    return Promise.reject(err)
  },
)

function cleanParams(params?: Record<string, unknown>): Record<string, unknown> | undefined {
  if (!params || typeof params !== 'object') return undefined
  const cleaned = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null && value !== '',
    ),
  )
  return Object.keys(cleaned).length > 0 ? cleaned : undefined
}

export function get<T = unknown>(url: string, params?: Record<string, unknown>): Promise<T> {
  return apiClient.get(url, { params: cleanParams(params) }) as Promise<T>
}

export function post<T = unknown>(url: string, data?: unknown): Promise<T> {
  return apiClient.post(url, data) as Promise<T>
}

export function put<T = unknown>(url: string, data?: unknown): Promise<T> {
  return apiClient.put(url, data) as Promise<T>
}

export function remove<T = unknown>(url: string): Promise<T> {
  return apiClient.delete(url) as Promise<T>
}
