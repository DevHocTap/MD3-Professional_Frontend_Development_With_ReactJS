# Bài 10 - Module Quản lý Tồn kho (End-to-End State)

## Mục tiêu
Làm chủ biên giới giữa Client State (Zustand) và Server State (TanStack Query) trong một luồng hoàn chỉnh.

## Phân chia trách nhiệm
- **Server State (TanStack Query)**: danh sách tồn kho (`['inventory']`), mutation cập nhật số lượng.
- **Client State (Zustand)**: `selectedId` của dòng đang mở Sidebar (`store/uiStore.ts`).

## Data Flow Diagram (luồng giao tiếp chéo)

```
[InventoryList]  useQuery(['inventory'])  ── Server State ──> render bảng
      │ click 1 dòng
      ▼
[Zustand uiStore]  open(id) -> selectedId  ── Client State ──> mở Sidebar
      │
      ▼
[Sidebar]  đọc item từ cache Query theo selectedId
      │ nhập số lượng mới -> bấm "Lưu"
      ▼
[useMutation updateQuantity]  ── gọi Server ──>
      │ onSuccess
      ├──> invalidateQueries(['inventory'])   (TanStack: làm mới danh sách)
      └──> uiStore.close()                     (Zustand: đóng Sidebar)
```

## Xử lý lỗi (bẫy dữ liệu)
- **Số lượng âm**: chặn ngay ở client trước khi gọi mutation ("Số lượng không được âm").
- **API hết hạn mức**: server ném lỗi khi quantity > 1000, `onError` hiển thị thông báo và giữ Sidebar mở để user sửa lại.

## Cách kiểm chứng
1. Bấm 1 dòng -> Sidebar mở bên phải.
2. Nhập số mới hợp lệ -> Lưu -> Sidebar đóng, bảng cập nhật (invalidate).
3. Nhập số âm -> báo lỗi client, không gọi API.
4. Nhập số > 1000 -> API báo "hết hạn mức", Sidebar vẫn mở.
