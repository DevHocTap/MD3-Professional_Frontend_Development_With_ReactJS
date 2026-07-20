# [Bài 10 - Xuất sắc] Mini Module: Bộ giao tiếp API Kháng lỗi (Resilient API Client)

## Cách chạy

```bash
npm install
npm run dev
```

## Cấu trúc module (tách biệt với tầng UI)

```
src/
├── api/
│   └── apiClient.ts   <- toàn bộ logic gọi API nằm ở đây (module duy nhất)
├── App.tsx            <- tầng UI, chỉ import { get, post, put, remove }
└── main.tsx
```

## Yêu cầu kiến trúc đã đáp ứng

1. **Axios Instance** với `timeout: 5000` ms.
2. **Request Interceptor**: tự đọc token từ `localStorage`, gắn `Authorization: Bearer <token>` nếu có.
3. **Response Interceptor**:
   - Thành công: chỉ trả về `response.data` (ẩn metadata Axios, code UI gọn hơn).
   - Chặn bắt **401** (xóa token + chuyển về `/login`) và **500** (log lỗi hệ thống).
4. **Hàm export chuẩn hóa**: `get(url, params)`, `post(url, data)`, `put(url, data)`, `remove(url)`.

## Bẫy dữ liệu: dọn dẹp params rác

`cleanParams()` chạy trước mọi request GET:

- `params` không phải object (ví dụ `undefined`) → bỏ qua, không gửi query.
- Loại bỏ mọi entry có giá trị `undefined`, `null`, hoặc chuỗi rỗng `''`.
- Nếu sau khi dọn không còn gì → gửi request không có query string.

## Các kịch bản ngoại lệ module đã bao phủ

| # | Kịch bản | Cách xử lý |
|---|---|---|
| 1 | Server phản hồi chậm quá 5000ms | Instance timeout → request bị cắt, log `ECONNABORTED` |
| 2 | Phiên đăng nhập hết hạn (401) | Interceptor xóa token, chuyển hướng `/login` |
| 3 | Lỗi hệ thống server (500) | Interceptor log tập trung, vẫn reject để UI biết |
| 4 | Người dùng chưa đăng nhập (không có token) | Request interceptor bỏ qua header, không làm sập app |
| 5 | Truyền `params` là `undefined` / không phải object | `cleanParams` trả về `undefined`, request vẫn chạy bình thường |
| 6 | Params chứa giá trị rác (`undefined`, `null`, `''`) | Bị lọc bỏ trước khi đẩy qua Axios |
| 7 | UI phải bóc `response.data` lặp đi lặp lại | Interceptor đã unwrap sẵn, UI nhận thẳng data |
