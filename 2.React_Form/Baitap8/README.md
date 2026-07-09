# Bài 8 - Trải nghiệm Thời gian thực (Optimistic Updates)

## Bối cảnh
Nút "Đã xử lý" cho đơn hàng vi phạm. Server ở nước ngoài, phản hồi mất ~2 giây.
Yêu cầu: UI đổi sang "Đã xử lý" (màu xanh) ngay tại thời điểm click (t = 0.0s), không bắt user chờ.

## Hai cơ chế

### Pessimistic Update
Đợi server trả 200 OK rồi mới đổi UI. An toàn nhưng user phải chờ 2s mỗi lần bấm.

### Optimistic Update (đã chọn)
Đổi UI ngay lập tức, nếu server báo lỗi thì roll-back về trạng thái cũ.

## So sánh

| Tiêu chí | Pessimistic | Optimistic |
|---|---|---|
| Tốc độ phản hồi UI | Chậm (chờ 2s) | Tức thì (0s) |
| Nguy cơ dữ liệu ảo | Không | Có (nếu server lỗi) -> cần roll-back |
| Độ phức tạp code | Thấp | Cao hơn (onMutate/onError/onSettled) |
| Trải nghiệm | Lag | Mượt |

## Kết luận
Chọn **Optimistic Update**, xử lý roll-back an toàn bằng 3 hàm của TanStack Query:
- `onMutate`: backup cache hiện tại + chèn dữ liệu ảo (đổi UI ngay).
- `onError`: khôi phục lại bản backup (roll-back).
- `onSettled`: `invalidateQueries` để đồng bộ lại với server.

## Cách kiểm chứng
- Bỏ tick "Giả lập lỗi" -> bấm nút: UI xanh ngay, sau 2s vẫn xanh.
- Tick "Giả lập lỗi" -> bấm nút: UI xanh ngay, sau 2s tự roll-back về nút cũ.
