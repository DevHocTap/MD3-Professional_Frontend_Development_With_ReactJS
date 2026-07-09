import { useQuery } from '@tanstack/react-query'
import { fetchInventory } from '../api/inventory'
import { useUiStore } from '../store/uiStore'

export default function InventoryList() {
  const open = useUiStore((s) => s.open)
  const selectedId = useUiStore((s) => s.selectedId)

  const { data, isLoading } = useQuery({
    queryKey: ['inventory'],
    queryFn: fetchInventory,
  })

  if (isLoading) {
    return <p>Đang tải kho...</p>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Mã</th>
          <th>Tên hàng</th>
          <th>Số lượng</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => (
          <tr
            key={item.id}
            className={item.id === selectedId ? 'selected' : ''}
            onClick={() => open(item.id)}
          >
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
