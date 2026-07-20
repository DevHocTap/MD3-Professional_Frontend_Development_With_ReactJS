import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3004',
})

export interface User {
  id: string
  fullName: string
  email: string
  phone: string
  address: string
  department: string
  position: string
  dateOfBirth: string
  startDate: string
  salary: number
  status: string
}

export async function getUser(id: string): Promise<User> {
  const res = await api.get<User>(`/users/${id}`)
  return res.data
}

export async function updateUserWithPut(user: User): Promise<User> {
  const res = await api.put<User>(`/users/${user.id}`, user)
  return res.data
}

export async function updatePhoneWithPatch(id: string, phone: string): Promise<User> {
  const res = await api.patch<User>(`/users/${id}`, { phone })
  return res.data
}

export async function updateWithPutMissingFields(id: string, phone: string): Promise<User> {
  const res = await api.put<User>(`/users/${id}`, { id, phone })
  return res.data
}
