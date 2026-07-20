import { useState } from 'react'
import axiosClient from './api/axiosClient'
import './App.css'

function LoginPage() {
  return (
    <div className="app">
      <h1>Trang Đăng nhập</h1>
      <p>Phiên đăng nhập đã hết hạn (401). Bạn đã được chuyển hướng về đây bởi Response Interceptor.</p>
      <a href="/">Quay lại trang chính</a>
    </div>
  )
}

function App() {
  const [result, setResult] = useState('')

  if (window.location.pathname === '/login') {
    return <LoginPage />
  }

  const callOkApi = async () => {
    const res = await axiosClient.get('https://jsonplaceholder.typicode.com/users/1')
    setResult(`Thành công (200): ${JSON.stringify(res.data.name)}`)
  }

  const call401Api = async () => {
    setResult('Đang gọi API trả về 401...')
    await axiosClient.get('https://httpstat.us/401').catch(() => undefined)
  }

  return (
    <div className="app">
      <h1>Global Error Handling - Response Interceptor</h1>
      <p>Đây là một màn hình bất kỳ trong ứng dụng.</p>

      <button onClick={callOkApi}>Gọi API thành công (200)</button>
      <button onClick={call401Api}>Gọi API hết hạn phiên (401) → tự chuyển về /login</button>

      {result && <pre>{result}</pre>}
    </div>
  )
}

export default App
