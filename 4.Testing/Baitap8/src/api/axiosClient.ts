import axios, { AxiosError } from 'axios'

const axiosClient = axios.create()

axiosClient.interceptors.response.use(
  (response) => response,
  (err: AxiosError) => {
    const status = err.response?.status

    if (status === 401) {
      window.location.href = '/login'
    }

    return Promise.reject(err)
  },
)

export default axiosClient
