export interface Customer {
  id: number
  name: string
  phone: string
  city: string
}

const NAMES = [
  'Nguyen Van A',
  'Tran Thi B',
  'Le Van C',
  'Pham Thi D',
  'Hoang Van E',
  'Vo Thi F',
]

export async function fetchCustomers(): Promise<Customer[]> {
  console.log('[API] fetchCustomers')
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return NAMES.map((name, i) => ({
    id: i + 1,
    name,
    phone: '09' + Math.floor(10000000 + Math.random() * 89999999),
    city: i % 2 === 0 ? 'Ha Noi' : 'Da Nang',
  }))
}
