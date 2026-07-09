# Bài 7 - Phân tích UX Trạng thái Tải dữ liệu (isLoading vs isFetching)

## Bối cảnh
Bảng dữ liệu khách hàng có background refetch tự động. Cần phân biệt:
- Tải lần đầu (chưa có cache) -> `isLoading = true`
- Tải ngầm (đã có cache cũ) -> `isFetching = true`, `isLoading = false`

## Hai giải pháp UI

### Giải pháp 1: Một Indicator che toàn màn hình cho mọi trạng thái tải
Bất cứ khi nào đang tải (kể cả refetch ngầm) đều hiện spinner to giữa màn hình.

### Giải pháp 2 (đã chọn): Tách biệt
- `isLoading` (Hard loading): hiện **Skeleton** thay cho bảng.
- `isFetching` (Soft loading): hiện **chấm nhỏ / badge quay ở góc màn hình**, giữ nguyên dữ liệu cũ đang xem.

## So sánh

| Tiêu chí | Giải pháp 1 (Full Indicator) | Giải pháp 2 (Tách biệt) |
|---|---|---|
| UX khi refetch ngầm | Giật trắng màn hình, đứt thao tác | Mượt, không làm gián đoạn |
| UX khi tải lần đầu | Ổn | Tốt (Skeleton gợi hình dạng dữ liệu) |
| Độ phức tạp code | Thấp (chỉ cần 1 cờ) | Cao hơn (phân biệt 2 cờ + 2 UI) |
| Cảm giác tốc độ | Chậm | Nhanh |

## Kết luận
Chọn **Giải pháp 2**: dùng `isLoading` để render Skeleton, dùng `isFetching` để hiện chỉ báo nhỏ ở góc. Trải nghiệm mượt hơn hẳn khi có background refetch.

## Cách kiểm chứng
- Lần đầu vào trang: thấy Skeleton (2s) rồi ra bảng.
- Bấm "Tải lại": dữ liệu cũ vẫn hiển thị, chỉ có badge "Đang cập nhật..." ở góc phải dưới.
