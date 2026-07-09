export interface Order {
  id: number
  customer: string
  status: 'Pending' | 'Shipped' | 'Delivered'
}

const DB: Order[] = [
  { id: 1, customer: 'Nguyen Van A', status: 'Pending' },
  { id: 2, customer: 'Tran Thi B', status: 'Shipped' },
  { id: 3, customer: 'Le Van C', status: 'Delivered' },
  { id: 4, customer: 'Pham Thi D', status: 'Pending' },
  { id: 5, customer: 'Hoang Van E', status: 'Shipped' },
  { id: 6, customer: 'Vo Thi F', status: 'Delivered' },
  { id: 7, customer: 'Nguyen Van G', status: 'Pending' },
]

export async function fetchOrders(
  status: string,
  search: string,
): Promise<Order[]> {
  console.log('[API] fetchOrders', { status, search })
  await new Promise((resolve) => setTimeout(resolve, 600))

  return DB.filter((order) => {
    const matchStatus = status === 'All' || order.status === status
    const matchSearch =
      search === '' ||
      order.customer.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })
}
