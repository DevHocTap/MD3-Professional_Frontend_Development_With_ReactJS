import { useQuery } from '@tanstack/react-query'
import { fetchCustomers } from '../api/customers'

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <tr key={i}>
          <td>
            <span className="skeleton" />
          </td>
          <td>
            <span className="skeleton" />
          </td>
          <td>
            <span className="skeleton" />
          </td>
        </tr>
      ))}
    </>
  )
}

export default function CustomerTable() {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
    refetchInterval: 10 * 60 * 1000,
  })

  return (
    <div>
      <div className="toolbar">
        <h2>Danh sách khách hàng</h2>
        <button type="button" onClick={() => refetch()}>
          Tải lại (giả lập background refetch)
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Điện thoại</th>
            <th>Thành phố</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <SkeletonRows />
          ) : (
            data?.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.phone}</td>
                <td>{c.city}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {isFetching && !isLoading && (
        <div className="corner-spinner">Đang cập nhật...</div>
      )}
    </div>
  )
}
