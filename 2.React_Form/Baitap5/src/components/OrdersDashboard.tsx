import { useQuery } from '@tanstack/react-query'
import { useFilterStore, type OrderStatus } from '../store/filterStore'
import { fetchOrders } from '../api/orders'

const STATUSES: OrderStatus[] = ['All', 'Pending', 'Shipped', 'Delivered']

export default function OrdersDashboard() {
  const status = useFilterStore((s) => s.status)
  const search = useFilterStore((s) => s.search)
  const searchInput = useFilterStore((s) => s.searchInput)
  const setStatus = useFilterStore((s) => s.setStatus)
  const setSearch = useFilterStore((s) => s.setSearch)

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['orders', status, search],
    queryFn: () => fetchOrders(status, search),
  })

  return (
    <div className="dashboard">
      <h1>Order Dashboard</h1>

      <div className="filters">
        {STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            className={status === s ? 'active' : ''}
            onClick={() => setStatus(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <input
        className="search"
        placeholder="Tìm theo tên khách hàng..."
        value={searchInput}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="status-bar">
        Filter hiện tại: <b>{status}</b>
        {search && (
          <>
            {' '}
            | Search (đã trim): <b>"{search}"</b>
          </>
        )}
        {isFetching && <span className="fetching"> đang cập nhật...</span>}
      </div>

      {isError ? (
        <p className="error">Có lỗi khi tải dữ liệu.</p>
      ) : isLoading ? (
        <p>Đang tải lần đầu...</p>
      ) : (
        <ul className="order-list">
          {data && data.length > 0 ? (
            data.map((order) => (
              <li key={order.id}>
                <span>#{order.id}</span>
                <span>{order.customer}</span>
                <span className={`badge badge-${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </li>
            ))
          ) : (
            <li className="empty">Không có đơn hàng phù hợp</li>
          )}
        </ul>
      )}
    </div>
  )
}
