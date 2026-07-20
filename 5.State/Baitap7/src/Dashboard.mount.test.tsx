import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Dashboard from './Dashboard'

describe('Giải pháp 2: render đầy đủ toàn bộ cây DOM (tương đương mount() của Enzyme)', () => {
  it('tìm thấy <h1>Title</h1> trong Dashboard', () => {
    render(<Dashboard />)

    expect(screen.getByRole('heading', { level: 1, name: 'Title' })).toBeInTheDocument()
  })

  it('toàn bộ 10 Chart con với 20.000 điểm dữ liệu bị render thật', () => {
    const { container } = render(<Dashboard />)

    expect(container.querySelectorAll('.chart')).toHaveLength(10)
    expect(container.querySelectorAll('.point')).toHaveLength(20000)
  })
})
