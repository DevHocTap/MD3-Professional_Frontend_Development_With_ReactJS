import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchInventory, updateQuantity } from '../api/inventory'
import { useUiStore } from '../store/uiStore'

export default function Sidebar() {
  const queryClient = useQueryClient()
  const selectedId = useUiStore((s) => s.selectedId)
  const close = useUiStore((s) => s.close)

  const { data: items } = useQuery({
    queryKey: ['inventory'],
    queryFn: fetchInventory,
  })
  const item = items?.find((i) => i.id === selectedId)

  const [qty, setQty] = useState(item?.quantity ?? 0)
  const [error, setError] = useState('')

  const mutation = useMutation({
    mutationFn: (quantity: number) => updateQuantity(selectedId!, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] })
      close()
    },
    onError: (err: Error) => setError(err.message),
  })

  if (!item) {
    return null
  }

  const handleSave = () => {
    setError('')
    if (qty < 0) {
      setError('Số lượng không được âm')
      return
    }
    mutation.mutate(qty)
  }

  return (
    <aside className="sidebar">
      <h3>Cập nhật: {item.name}</h3>
      <label>
        Số lượng mới
        <input
          type="number"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />
      </label>

      {error && <p className="error">{error}</p>}

      <div className="actions">
        <button type="button" onClick={handleSave} disabled={mutation.isPending}>
          {mutation.isPending ? 'Đang lưu...' : 'Lưu'}
        </button>
        <button type="button" onClick={close}>
          Đóng
        </button>
      </div>
    </aside>
  )
}
