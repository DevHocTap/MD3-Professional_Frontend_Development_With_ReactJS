# [Bài 8 - Giỏi] Phân tích Đa giải pháp: Global Error Handling

## Cách chạy

```bash
npm install
npm run dev
```

Bấm nút **"Gọi API hết hạn phiên (401)"** → interceptor bắt được mã 401 và chuyển hướng
ngay về `/login`, bất kể đang ở màn hình nào.

## Triển khai

`src/api/axiosClient.ts` — `axios.interceptors.response`:

- Luồng thành công: trả response đi tiếp.
- Luồng thất bại `(err: AxiosError)`: đọc `err.response?.status`; nếu `=== 401` thì
  `window.location.href = '/login'`, sau đó vẫn `Promise.reject(err)` để nơi gọi biết request thất bại.

## Bảng so sánh 2 phương pháp

| Tiêu chí | Interceptor tập trung | Bắt lỗi từng khối `catch` (phân tán) |
|---|---|---|
| Độ dễ bảo trì | **Cao** — logic 401 nằm ở 1 nơi duy nhất; đổi hành vi (ví dụ thêm refresh token) chỉ sửa 1 file | **Thấp** — sửa hành vi phải rà lại hàng chục hàm gọi API |
| Tính lặp lại mã | **Không lặp** — viết 1 lần, áp dụng cho mọi request | **Lặp nhiều** — mỗi hàm API đều phải copy đoạn `if (status === 401) redirect...` |
| Nguy cơ bỏ sót | Gần như không — request nào đi qua instance cũng bị kiểm soát | Cao — chỉ cần 1 hàm quên xử lý là người dùng kẹt ở màn hình lỗi |
| Nhất quán trải nghiệm | Đồng nhất toàn ứng dụng | Dễ mỗi nơi xử lý một kiểu |
| Xử lý lỗi đặc thù theo màn hình | Cần cho lỗi "rơi tiếp" xuống catch cục bộ (interceptor vẫn `reject`) | Linh hoạt tại chỗ nhưng trộn lẫn lỗi hệ thống với lỗi nghiệp vụ |
| Độ phức tạp ban đầu | Cần hiểu vòng đời interceptor | Đơn giản, dễ hiểu với người mới |

**Kết luận:** lỗi mang tính hệ thống (401, 500, mất mạng) nên chặn **tập trung** ở Interceptor;
khối `catch` cục bộ chỉ nên xử lý lỗi nghiệp vụ riêng của từng màn hình.
