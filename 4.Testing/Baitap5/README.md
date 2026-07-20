# [Bài 5 - Khá] Tích hợp Mock Server và thao tác CRUD

Màn hình Quản lý Danh bạ (Contacts) dùng `json-server` làm mock API.

## Cách chạy

```bash
npm install
npm run server   # chạy json-server tại http://localhost:3004
npm run dev      # (terminal khác) chạy ứng dụng React
```

## Nội dung

- `db.json`: dữ liệu khởi tạo (resource `contacts`).
- `src/api/contactApi.ts`: các hàm gọi API bằng Axios:
  - `getContacts()` — GET `/contacts`
  - `addContact()` — POST `/contacts`
  - `deleteContact(id)` — DELETE `/contacts/:id`, bắt lỗi **404 Not Found** khi ID không tồn tại và ném ra thông báo thân thiện.
- Nút **"Test DELETE ID không tồn tại"** trong UI để kiểm chứng bẫy dữ liệu 404.
