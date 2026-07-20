import { useEffect, useState } from 'react'
import { addContact, deleteContact, getContacts } from './api/contactApi'
import type { Contact } from './api/contactApi'
import './App.css'

function App() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const loadContacts = async () => {
    try {
      setContacts(await getContacts())
      setError('')
    } catch {
      setError('Không kết nối được mock server. Hãy chạy: npm run server')
    }
  }

  useEffect(() => {
    loadContacts()
  }, [])

  const handleAdd = async () => {
    if (!name.trim() || !phone.trim()) return
    await addContact({ name, phone })
    setName('')
    setPhone('')
    setMessage('Đã thêm liên hệ mới')
    loadContacts()
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteContact(id)
      setMessage(`Đã xóa liên hệ ID = ${id}`)
      setError('')
      loadContacts()
    } catch (err) {
      setError((err as Error).message)
      setMessage('')
    }
  }

  return (
    <div className="app">
      <h1>Quản lý Danh bạ (json-server :3004)</h1>

      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên" />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Số điện thoại" />
        <button onClick={handleAdd}>Thêm (POST)</button>
      </div>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Số điện thoại</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.phone}</td>
              <td>
                <button onClick={() => handleDelete(c.id!)}>Xóa (DELETE)</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Bẫy dữ liệu: xóa ID không tồn tại</h3>
      <button onClick={() => handleDelete('id-khong-ton-tai-999')}>
        Test DELETE ID không tồn tại (404)
      </button>
    </div>
  )
}

export default App
