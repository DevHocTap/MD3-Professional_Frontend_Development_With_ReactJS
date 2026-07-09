import { useQuery } from '@tanstack/react-query'
import { fetchRevenue } from '../api/dashboard'

export default function RevenueTab() {
  const { data, isLoading, isFetching, isStale, refetch } = useQuery({
    queryKey: ['revenue'],
    queryFn: fetchRevenue,
    staleTime: 5 * 60 * 1000,
  })

  if (isLoading) {
    return <p>Đang tải doanh thu...</p>
  }

  return (
    <div>
      <h2>Doanh thu</h2>
      <p>Tháng: {data?.month}</p>
      <p>Tổng: {data?.total.toLocaleString('vi-VN')} đ</p>
      <p>Lấy dữ liệu lúc: {data?.fetchedAt}</p>

      <p className="state">
        Trạng thái: {isFetching ? 'Fetching' : isStale ? 'Stale' : 'Fresh'}
      </p>

      <button type="button" onClick={() => refetch()} disabled={isFetching}>
        Làm mới dữ liệu
      </button>
    </div>
  )
}
