import { describe, expect, it } from 'vitest'
import { filterActiveUsers } from './filterActiveUsers'
import type { User } from './filterActiveUsers'

describe('filterActiveUsers - Array/Object Matchers', () => {
  const users: User[] = [
    { id: 1, name: 'Admin', isActive: true },
    { id: 2, name: 'Binh', isActive: false },
    { id: 3, name: 'Chi', isActive: true },
  ]

  it('Giải pháp 1: toContainEqual xác nhận Admin nằm trong danh sách trả về', () => {
    const result = filterActiveUsers(users)

    expect(result).toContainEqual({ id: 1, name: 'Admin', isActive: true })
  })

  it('Giải pháp 2: duyệt vòng lặp qua mảng, so sánh từng phần tử bằng toEqual', () => {
    const result = filterActiveUsers(users)
    const expected = [
      { id: 1, name: 'Admin', isActive: true },
      { id: 3, name: 'Chi', isActive: true },
    ]

    expect(result).toHaveLength(expected.length)
    result.forEach((user, index) => {
      expect(user).toEqual(expected[index])
    })
  })

  describe('Bẫy dữ liệu: Admin có thêm lastLoginDate ngẫu nhiên tại thời điểm test', () => {
    const usersWithRandom: User[] = users.map((user) =>
      user.name === 'Admin'
        ? { ...user, lastLoginDate: new Date(Date.now() - Math.random() * 1e9) }
        : user,
    )

    it('so sánh bằng object đầy đủ sẽ FAIL, phải chuyển sang expect.objectContaining', () => {
      const result = filterActiveUsers(usersWithRandom)

      expect(result).not.toContainEqual({ id: 1, name: 'Admin', isActive: true })
      expect(result).toContainEqual(
        expect.objectContaining({ id: 1, name: 'Admin', isActive: true }),
      )
    })

    it('với vòng lặp, thay toEqual bằng toMatchObject để bỏ qua trường ngẫu nhiên', () => {
      const result = filterActiveUsers(usersWithRandom)
      const admin = result.find((user) => user.name === 'Admin')

      expect(admin).toMatchObject({ id: 1, name: 'Admin', isActive: true })
    })
  })
})
