import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Dashboard from './Dashboard'

vi.mock('./Chart', () => ({
  default: ({ index }: { index: number }) => <div data-testid="chart-stub">Chart {index}</div>,
}))

describe('Giải pháp 1: render nông - mock 10 Chart con (tương đương shallow() của Enzyme)', () => {
  it('tìm thấy <h1>Title</h1> trong Dashboard', () => {
    render(<Dashboard />)

    expect(screen.getByRole('heading', { level: 1, name: 'Title' })).toBeInTheDocument()
  })

  it('10 Chart con chỉ là stub, 20.000 điểm dữ liệu KHÔNG bị render thật', () => {
    const { container } = render(<Dashboard />)

    expect(screen.getAllByTestId('chart-stub')).toHaveLength(10)
    expect(container.querySelectorAll('.point')).toHaveLength(0)
  })
})
