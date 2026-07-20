import { useState } from 'react'
import { get, post, put, remove } from './api/apiClient'
import './App.css'

interface User {
  id: number
  name: string
  email: string
}

function App() {
  const [output, setOutput] = useState('')

  const show = (label: string, data: unknown) =>
    setOutput(`${label}\n${JSON.stringify(data, null, 2)}`)

  const handleGet = async () => {
    const data = await get<User[]>('/users', { name: 'Leanne Graham' })
    show('GET /users?name=Leanne+Graham', data)
  }

  const handleGetDirtyParams = async () => {
    const data = await get<User[]>('/users', {
      username: 'Bret',
      junk: undefined,
      nothing: null,
      empty: '',
    })
    show(
      'GET /users với params rác { username: "Bret", junk: undefined, nothing: null, empty: "" }\n=> Module đã dọn dẹp, chỉ gửi ?username=Bret',
      data,
    )
  }

  const handlePost = async () => {
    const data = await post<User>('/users', { name: 'New User', email: 'new@test.com' })
    show('POST /users', data)
  }

  const handlePut = async () => {
    const data = await put<User>('/users/1', { id: 1, name: 'Updated', email: 'up@test.com' })
    show('PUT /users/1', data)
  }

  const handleRemove = async () => {
    const data = await remove('/users/1')
    show('DELETE /users/1', data)
  }

  return (
    <div className="app">
      <h1>Resilient API Client - Demo</h1>
      <p>Tầng UI chỉ gọi get / post / put / remove từ module, không đụng trực tiếp axios.</p>

      <button onClick={handleGet}>get(url, params)</button>
      <button onClick={handleGetDirtyParams}>get với params rác (bẫy dữ liệu)</button>
      <button onClick={handlePost}>post(url, data)</button>
      <button onClick={handlePut}>put(url, data)</button>
      <button onClick={handleRemove}>remove(url)</button>

      {output && <pre>{output}</pre>}
    </div>
  )
}

export default App
