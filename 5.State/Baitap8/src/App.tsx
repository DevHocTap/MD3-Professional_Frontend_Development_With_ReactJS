import { filterActiveUsers } from './filterActiveUsers'
import type { User } from './filterActiveUsers'
import './App.css'

const USERS: User[] = [
  { id: 1, name: 'Admin', isActive: true },
  { id: 2, name: 'Binh', isActive: false },
  { id: 3, name: 'Chi', isActive: true },
]

function App() {
  const activeUsers = filterActiveUsers(USERS)

  return (
    <div className="app">
      <h1>Bài 8 - Array/Object Matchers</h1>
      <p>Danh sách tài khoản đang hoạt động (hàm filterActiveUsers được kiểm thử bằng Vitest):</p>
      <ul>
        {activeUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
