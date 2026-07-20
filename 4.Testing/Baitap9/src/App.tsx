import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import './App.css'

interface User {
  id: number
  name: string
  email: string
}

function App() {
  const [keyword, setKeyword] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const [status, setStatus] = useState('')
  const controllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (!keyword.trim()) {
      setUsers([])
      setStatus('')
      return
    }

    if (controllerRef.current) {
      controllerRef.current.abort()
    }

    const controller = new AbortController()
    controllerRef.current = controller

    const search = async () => {
      setStatus(`Đang tìm "${keyword}"...`)
      try {
        const res = await axios.get<User[]>(
          'https://jsonplaceholder.typicode.com/users',
          {
            params: { q: keyword },
            signal: controller.signal,
          },
        )
        setUsers(res.data)
        setStatus(`Tìm thấy ${res.data.length} kết quả cho "${keyword}"`)
      } catch (error) {
        if (axios.isCancel(error)) {
          return
        }
        console.error(error)
        setStatus('Lỗi mạng khi tìm kiếm')
      }
    }

    search()

    return () => controller.abort()
  }, [keyword])

  return (
    <div className="app">
      <h1>Tìm kiếm Live với AbortController</h1>

      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Gõ tên user để tìm (ví dụ: Leanne)"
        size={40}
      />

      <p>{status}</p>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} — {u.email}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
