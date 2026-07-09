import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchOrders, markProcessed, type Order } from '../api/orders'

export default function OrderList() {
  const queryClient = useQueryClient()
  const [simulateError, setSimulateError] = useState(false)

  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  })

  const mutation = useMutation({
    mutationFn: (id: number) => markProcessed(id, simulateError),
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ['orders'] })
      const previous = queryClient.getQueryData<Order[]>(['orders'])
      queryClient.setQueryData<Order[]>(['orders'], (old) =>
        old?.map((o) => (o.id === id ? { ...o, processed: true } : o)),
      )
      return { previous }
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['orders'], context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })

  return (
    <div>
      <label className="sim">
        <input
          type="checkbox"
          checked={simulateError}
          onChange={(e) => setSimulateError(e.target.checked)}
        />
        Giả lập lỗi server (để xem roll-back)
      </label>

      <ul className="order-list">
        {orders?.map((o) => (
          <li key={o.id}>
            <span>
              #{o.id} - {o.customer}
            </span>
            {o.processed ? (
              <span className="done">Đã xử lý</span>
            ) : (
              <button type="button" onClick={() => mutation.mutate(o.id)}>
                Đánh dấu đã xử lý
              </button>
            )}
          </li>
        ))}
      </ul>

      {mutation.isError && (
        <p className="error">Lỗi: đã roll-back về trạng thái cũ.</p>
      )}
    </div>
  )
}
