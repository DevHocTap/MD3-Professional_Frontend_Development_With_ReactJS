# [Bài 7 - Giỏi] Tự động hóa định danh với Request Interceptor

## Cách chạy

```bash
npm install
npm run dev
```

## Nội dung

- `src/api/axiosClient.ts`: khởi tạo `axios.interceptors.request`:
  - Đọc token từ `localStorage` (token giả lập bằng hằng số `FAKE_ACCESS_TOKEN`).
  - Nếu **có token** → chèn `config.headers.Authorization = "Bearer <token>"`.
  - Nếu **không có token** (chưa đăng nhập) → bỏ qua việc gán header, không ném lỗi,
    ứng dụng không sập — để máy chủ tự trả về 401.

## Cách chụp ảnh minh chứng Request Headers

1. Bấm **"Đăng nhập (lưu token)"**.
2. Mở DevTools (F12) → tab **Network**.
3. Bấm **"Gọi API GET /users/1"**.
4. Chọn request `users/1` → mục **Request Headers** → thấy dòng
   `Authorization: Bearer fake-jwt-access-token-abc123xyz` → chụp ảnh nộp bài.
