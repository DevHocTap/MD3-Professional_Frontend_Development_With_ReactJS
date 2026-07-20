import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { afterEach, describe, expect, it, vi } from 'vitest'
import WeatherWidget from './WeatherWidget'
import { makeStore } from './store'

function renderWidget() {
  return render(
    <Provider store={makeStore()}>
      <WeatherWidget />
    </Provider>,
  )
}

describe('WeatherWidget - cô lập môi trường mạng bằng Mocking', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('render "Nắng đẹp" từ dữ liệu giả lập, không phát sinh network request thật', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: () => Promise.resolve({ description: 'Nắng đẹp' }),
    } as Response)

    renderWidget()

    expect(await screen.findByText(/Nắng đẹp/)).toBeInTheDocument()
    expect(fetchSpy).toHaveBeenCalledTimes(1)
    expect(fetchSpy).toHaveBeenCalledWith('https://api.example.com/weather/hanoi')
  })

  it('khi không mock, fetch gốc đã bị chặn nên component báo lỗi thay vì gọi mạng thật', async () => {
    renderWidget()

    expect(await screen.findByText(/Không lấy được dữ liệu thời tiết/)).toBeInTheDocument()
  })
})
