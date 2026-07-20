import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <h1>Bài 6 - Đóng gói và Phân tích quá trình Build</h1>
      <p>Dự án React cơ bản dùng để chạy lệnh build tối ưu hóa mã nguồn.</p>
      <button className="counter" onClick={() => setCount(count + 1)}>
        Đã bấm {count} lần
      </button>
    </div>
  )
}

export default App
