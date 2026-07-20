import { describe, expect, it } from 'vitest'
import { getActiveEmployees } from './employees'

describe('getActiveEmployees - Unit Test nội bộ chạy trước khi build', () => {
  it('chỉ trả về các nhân viên đang hoạt động', () => {
    const result = getActiveEmployees([
      { id: 1, name: 'An', phone: '0901', active: true },
      { id: 2, name: 'Binh', phone: '0902', active: false },
    ])

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('An')
  })

  it('trả về mảng rỗng khi không có ai hoạt động', () => {
    const result = getActiveEmployees([
      { id: 1, name: 'An', phone: '0901', active: false },
    ])

    expect(result).toEqual([])
  })
})
