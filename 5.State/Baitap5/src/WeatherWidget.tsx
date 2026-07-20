import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'
import { fetchWeather } from './store/weatherSlice'

export default function WeatherWidget() {
  const dispatch = useDispatch<AppDispatch>()
  const { status, description } = useSelector((state: RootState) => state.weather)

  useEffect(() => {
    dispatch(fetchWeather())
  }, [dispatch])

  if (status === 'idle' || status === 'loading') {
    return <div className="weather">Đang tải...</div>
  }

  if (status === 'failed') {
    return <div className="weather">Không lấy được dữ liệu thời tiết</div>
  }

  return <div className="weather">Thời tiết hôm nay: {description}</div>
}
