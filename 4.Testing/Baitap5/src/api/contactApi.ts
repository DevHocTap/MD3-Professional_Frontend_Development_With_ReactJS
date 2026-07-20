import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3004',
})

export interface Contact {
  id?: string
  name: string
  phone: string
}

export async function getContacts(): Promise<Contact[]> {
  const res = await api.get<Contact[]>('/contacts')
  return res.data
}

export async function addContact(contact: Contact): Promise<Contact> {
  const res = await api.post<Contact>('/contacts', contact)
  return res.data
}

export async function deleteContact(id: string): Promise<void> {
  try {
    await api.delete(`/contacts/${id}`)
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error(`Lỗi 404: Không tìm thấy liên hệ có ID = "${id}" trên server`)
    }
    throw error
  }
}
