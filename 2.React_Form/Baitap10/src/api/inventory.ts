export interface InventoryItem {
  id: number
  name: string
  quantity: number
}

let DB: InventoryItem[] = [
  { id: 1, name: 'Bàn phím cơ', quantity: 20 },
  { id: 2, name: 'Chuột không dây', quantity: 35 },
  { id: 3, name: 'Màn hình 24"', quantity: 12 },
  { id: 4, name: 'Tai nghe', quantity: 50 },
]

export async function fetchInventory(): Promise<InventoryItem[]> {
  console.log('[API] fetchInventory')
  await new Promise((resolve) => setTimeout(resolve, 500))
  return DB.map((i) => ({ ...i }))
}

export async function updateQuantity(
  id: number,
  quantity: number,
): Promise<InventoryItem> {
  console.log('[API] updateQuantity', { id, quantity })
  await new Promise((resolve) => setTimeout(resolve, 1000))
  if (quantity > 1000) {
    throw new Error('Đã hết hạn mức cập nhật (tối đa 1000)')
  }
  DB = DB.map((i) => (i.id === id ? { ...i, quantity } : i))
  return DB.find((i) => i.id === id)!
}
