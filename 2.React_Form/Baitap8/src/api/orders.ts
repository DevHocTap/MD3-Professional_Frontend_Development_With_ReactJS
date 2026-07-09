export interface Order {
  id: number
  customer: string
  processed: boolean
}

let DB: Order[] = [
  { id: 1, customer: 'Nguyen Van A', processed: false },
  { id: 2, customer: 'Tran Thi B', processed: false },
  { id: 3, customer: 'Le Van C', processed: false },
  { id: 4, customer: 'Pham Thi D', processed: false },
]

export async function fetchOrders(): Promise<Order[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return DB.map((o) => ({ ...o }))
}

export async function markProcessed(
  id: number,
  shouldFail: boolean,
): Promise<Order> {
  console.log('[API] markProcessed', { id, shouldFail })
  await new Promise((resolve) => setTimeout(resolve, 2000))
  if (shouldFail) {
    throw new Error('Server lỗi khi cập nhật đơn hàng')
  }
  DB = DB.map((o) => (o.id === id ? { ...o, processed: true } : o))
  return DB.find((o) => o.id === id)!
}
