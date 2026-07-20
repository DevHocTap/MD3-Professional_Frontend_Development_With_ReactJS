import { useState } from 'react'
import axiosClient, { getToken, login, logout } from './api/axiosClient'
import './App.css'

function App() {
  const [hasToken, setHasToken] = useState(!!getToken())
  const [sentHeader, setSentHeader] = useState('')
  const [result, setResult] = useState('')

  const handleLogin = () => {
    login()
    setHasToken(true)
  }

  const handleLogout = () => {
    logout()
    setHasToken(false)
  }

  const callApi = async () => {
    try {
      const res = await axiosClient.get('/users/1')
      const authHeader = res.config.headers?.Authorization
      setSentHeader(
        authHeader
          ? `Authorization: ${String(authHeader)}`
          : '(Không có header Authorization - người dùng chưa đăng nhập)',
      )
      setResult(JSON.stringify(res.data, null, 2))
    } catch (err) {
      setResult(`Lỗi: ${(err as Error).message}`)
    }
  }

  return (
    <div className="app">
      <h1>Request Interceptor - Tự động gắn Bearer Token</h1>

      <p>
        Trạng thái: <b>{hasToken ? 'Đã đăng nhập (có token)' : 'Chưa đăng nhập (không có token)'}</b>
      </p>

      <button onClick={handleLogin}>Đăng nhập (lưu token)</button>
      <button onClick={handleLogout}>Đăng xuất (xóa token)</button>
      <button onClick={callApi}>Gọi API GET /users/1</button>

      {sentHeader && (
        <>
          <h3>Header đã gửi đi (mở DevTools → Network để chụp ảnh):</h3>
          <pre>{sentHeader}</pre>
        </>
      )}

      {result && (
        <>
          <h3>Kết quả:</h3>
          <pre>{result}</pre>
        </>
      )}
    </div>
  )
}

export default App
