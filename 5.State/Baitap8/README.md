# [Bài 8 - Giỏi] Phân tích Đa giải pháp: Array/Object Matchers

## Cách chạy

```bash
npm install
npm test
```

## Hai giải pháp kiểm tra user "Admin" trong kết quả `filterActiveUsers(users)`

1. **Giải pháp 1 — `toContainEqual()`:** so sánh sâu (deep equality) từng phần tử của mảng
   với object kỳ vọng. (Không dùng `toContain()` được vì `toContain` so sánh theo tham chiếu
   `===`, chỉ đúng khi truyền vào chính xác cùng một object.)
2. **Giải pháp 2 — vòng lặp + `toEqual()`:** duyệt `result.forEach(...)` và so sánh từng
   phần tử với mảng kỳ vọng.

## Trả lời bẫy dữ liệu: Admin có thêm `lastLoginDate` ngẫu nhiên

- **Cả hai giải pháp đều bị vỡ (fail)** nếu giữ nguyên cách so sánh bằng object đầy đủ:
  - `toContainEqual({ id: 1, name: 'Admin', isActive: true })` fail vì object thật có thêm
    trường `lastLoginDate` → deep equal không khớp.
  - `toEqual(expected[index])` fail với cùng lý do — `toEqual` yêu cầu khớp **toàn bộ** các trường.
- **Cách xử lý — chỉ so sánh tập trường mình quan tâm (partial matching):**
  - Giải pháp 1 sửa thành:
    `expect(result).toContainEqual(expect.objectContaining({ id: 1, name: 'Admin', isActive: true }))`
  - Giải pháp 2 sửa thành:
    `expect(admin).toMatchObject({ id: 1, name: 'Admin', isActive: true })`
  - Cả hai bỏ qua trường ngẫu nhiên `lastLoginDate` → test ổn định ở mọi thời điểm chạy.

`src/filterActiveUsers.test.ts` chứa đủ cả 2 giải pháp gốc lẫn 2 phiên bản chống bẫy
(kèm assert `not.toContainEqual` chứng minh cách so sánh cũ thất bại). Các matcher
`toContainEqual` / `toEqual` / `toMatchObject` / `expect.objectContaining` trong Vitest
giống hệt Jest.
