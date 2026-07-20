import { useEffect, useState } from 'react'
import {
  getUser,
  updatePhoneWithPatch,
  updateUserWithPut,
  updateWithPutMissingFields,
} from './api/userApi'
import type { User } from './api/userApi'
import './App.css'

const USER_ID = '1'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [log, setLog] = useState('')

  const loadUser = async () => {
    try {
      setUser(await getUser(USER_ID))
    } catch {
      setLog('Không kết nối được mock server. Hãy chạy: npm run server')
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  const handlePatchPhone = async () => {
    const newPhone = '09' + Math.floor(10000000 + Math.random() * 89999999)
    await updatePhoneWithPatch(USER_ID, newPhone)
    setLog(`PATCH /users/1 với payload: { "phone": "${newPhone}" }\n=> Chỉ phone thay đổi, 9 trường còn lại giữ nguyên.`)
    loadUser()
  }

  const handlePutFull = async () => {
    if (!user) return
    const fullUser: User = {
      ...user,
      fullName: 'Nguyen Van An (updated)',
      address: 'TP. Ho Chi Minh',
    }
    await updateUserWithPut(fullUser)
    setLog('PUT /users/1 với payload ĐẦY ĐỦ 10 trường.\n=> Toàn bộ hồ sơ được ghi đè an toàn, không mất dữ liệu.')
    loadUser()
  }

  const handlePutMissing = async () => {
    await updateWithPutMissingFields(USER_ID, '0999999999')
    setLog('PUT /users/1 với payload CHỈ CÓ { id, phone }.\n=> HẬU QUẢ: server ghi đè toàn bộ tài nguyên, các trường không gửi (email, address, salary...) BỊ XÓA MẤT!')
    loadUser()
  }

  return (
    <div className="app">
      <h1>PUT vs PATCH - Cập nhật Hồ sơ nhân sự</h1>

      <h3>Hồ sơ hiện tại trên server:</h3>
      <pre>{user ? JSON.stringify(user, null, 2) : 'Đang tải...'}</pre>

      <button onClick={handlePatchPhone}>PATCH: chỉ đổi số điện thoại</button>
      <button onClick={handlePutFull}>PUT: ghi đè toàn bộ (payload đầy đủ)</button>
      <button onClick={handlePutMissing}>PUT thiếu trường (demo mất dữ liệu!)</button>

      {log && <pre className="log">{log}</pre>}

      <p>
        Sau khi demo mất dữ liệu, khôi phục lại bằng cách sửa file <code>db.json</code> hoặc
        khởi động lại json-server với dữ liệu gốc.
      </p>
    </div>
  )
}

export default App
