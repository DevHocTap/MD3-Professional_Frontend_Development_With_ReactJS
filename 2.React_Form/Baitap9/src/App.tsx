import { useBoundStore } from './store/useBoundStore'
import { axiosClient } from './api/axiosClient'
import './App.css'

export default function App() {
  const token = useBoundStore((s) => s.token)
  const login = useBoundStore((s) => s.login)
  const logout = useBoundStore((s) => s.logout)
  const toast = useBoundStore((s) => s.toast)
  const showToast = useBoundStore((s) => s.showToast)
  const clearToast = useBoundStore((s) => s.clearToast)

  const handleLogin = () => {
    login('jwt-token-abc-123')
    showToast('Đăng nhập thành công')
  }

  const handleLogout = () => {
    logout()
    showToast('Đã đăng xuất')
  }

  const callApi = async () => {
    try {
      await axiosClient.get('/me')
    } catch {
      console.log('[Demo] Request đã gửi, xem dòng [Interceptor] phía trên')
    }
  }

  return (
    <div className="page">
      <h1>Zustand Slices + Axios Interceptor</h1>
      <p>Token hiện tại: {token ?? '(null)'}</p>

      <div className="row">
        <button type="button" onClick={handleLogin}>
          Đăng nhập
        </button>
        <button type="button" onClick={handleLogout}>
          Đăng xuất
        </button>
        <button type="button" onClick={callApi}>
          Gọi API (xem header ở Console)
        </button>
      </div>

      {toast && (
        <div className="toast" onClick={clearToast}>
          {toast}
        </div>
      )}
    </div>
  )
}
