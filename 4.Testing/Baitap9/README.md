# [Bài 9 - Xuất sắc] Tối ưu hiệu suất với Kỹ thuật Hủy Request (Cancellation)

## Cách chạy

```bash
npm install
npm run dev
```

Gõ nhanh vào ô tìm kiếm — mỗi ký tự mới sẽ **hủy** request cũ đang bay
(`controller.abort()`) trước khi gửi request mới, tránh Race Condition khiến
kết quả cũ đè lên kết quả mới.

## Bẫy dữ liệu

Việc `abort()` khiến Axios ném lỗi vào khối `catch`. Code dùng `axios.isCancel(error)`
để phân biệt: nếu là hủy chủ động thì **bỏ qua im lặng** (không `console.error` rác),
chỉ lỗi mạng thật mới được log và báo cho người dùng.

## Sơ đồ luồng dữ liệu (Sequence diagram)

```mermaid
sequenceDiagram
    participant U as Người dùng
    participant C as Component (React)
    participant A1 as Request 1 (cũ)
    participant A2 as Request 2 (mới)
    participant S as Server

    U->>C: Gõ "Le"
    C->>A1: axios.get(q="Le", signal 1)
    A1->>S: HTTP GET /users?q=Le

    U->>C: Gõ tiếp "Lea"
    C->>A1: controller1.abort()  ❌ hủy request cũ
    A1--)C: throw CanceledError
    Note over C: axios.isCancel(err) = true → bỏ qua im lặng
    C->>A2: axios.get(q="Lea", signal 2)
    A2->>S: HTTP GET /users?q=Lea

    S--)A2: 200 OK (kết quả "Lea")
    A2->>C: setUsers(kết quả mới)
    Note over C: UI luôn hiển thị đúng kết quả<br/>của từ khóa mới nhất
```
