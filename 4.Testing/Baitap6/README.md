# [Bài 6 - Khá] Phân tích hành vi: PUT vs PATCH

## Cách chạy

```bash
npm install
npm run server   # json-server tại http://localhost:3004
npm run dev      # (terminal khác) chạy ứng dụng React
```

## Báo cáo phân tích (I/O)

Hồ sơ nhân sự `User` có 10 trường dữ liệu. Hai nhu cầu cập nhật khác nhau:

| Tiêu chí | PUT (Nhân viên B) | PATCH (Nhân viên A) |
|---|---|---|
| Ngữ nghĩa | **Thay thế toàn bộ** tài nguyên | **Cập nhật một phần** tài nguyên |
| Payload (Input) | Bắt buộc gửi **đầy đủ 10 trường** | Chỉ gửi trường muốn đổi, ví dụ `{ "phone": "090..." }` |
| Kết quả (Output) | Tài nguyên mới = đúng bằng payload gửi lên | Tài nguyên = dữ liệu cũ + các trường được vá |
| Idempotency | **Idempotent** — gọi N lần kết quả như gọi 1 lần | Với payload dạng gán giá trị thì cũng idempotent, nhưng chuẩn HTTP **không đảm bảo** |
| Băng thông | Lớn hơn (gửi cả object) | Nhỏ (chỉ gửi phần thay đổi) |
| Rủi ro | **Gửi thiếu trường ⇒ các trường thiếu bị XÓA** trên server chuẩn RESTful | Có thể ghi đè lẫn nhau ở mức từng trường nếu 2 người cùng PATCH 1 trường |

### Bẫy nghiệp vụ: PUT thiếu trường thì sao?

Trên máy chủ RESTful tiêu chuẩn, `PUT` mang ngữ nghĩa **replace**: server lấy nguyên payload
thay thế cho tài nguyên hiện có. Nếu chỉ gửi `{ "id": "1", "phone": "0999999999" }`,
9 trường còn lại (email, address, salary, ...) **bị mất vĩnh viễn** — đây chính là mất mát
dữ liệu (data loss) do dùng sai phương thức. Nút "PUT thiếu trường" trong ứng dụng demo
trực tiếp hậu quả này trên json-server.

### Kết luận

- Chỉ đổi 1 vài trường (Nhân viên A) → dùng **PATCH**.
- Ghi đè có chủ đích toàn bộ hồ sơ và đang có đủ dữ liệu (Nhân viên B) → dùng **PUT** với payload đầy đủ.

## Mã nguồn chính

- `src/api/userApi.ts` — `updateUserWithPut` (Hàm 1), `updatePhoneWithPatch` (Hàm 2) và hàm demo bẫy `updateWithPutMissingFields`.
