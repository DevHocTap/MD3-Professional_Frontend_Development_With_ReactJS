# Bài 9 - Quản lý Cấu trúc Dữ liệu Mảng (Dynamic Fields)

## Mục tiêu
Làm chủ binding dữ liệu phức tạp: thêm/xóa input động trong Form.

## Bối cảnh
Form "Lập kế hoạch chi tiêu": người dùng khai báo danh sách món cần mua (1 - 10 món).
Output khi submit: `{ items: [{ name: 'A', price: 10 }, ...] }`.

## Kiến trúc State quản lý danh sách động
Dùng **`useFieldArray`** của React Hook Form:
- `fields`: mảng field hiện tại (mỗi field có `id` ổn định để làm `key`).
- `append({ name: '', price: 0 })`: thêm 1 dòng.
- `remove(index)`: xóa dòng tương ứng.

Tên trường dùng **cú pháp index**: `register('items.0.name')`, `register('items.0.price')`.
RHF tự gom lại thành mảng object khi submit.

## Bẫy dữ liệu đã xử lý
- Không cho submit khi mảng rỗng (0 món) -> nút "Lưu" bị disable + báo lỗi.
- Giới hạn tối đa 10 món -> nút "Thêm" disable khi đủ 10.
- Mỗi dòng validate `name` bắt buộc, `price` là số và không âm.
- Dùng `field.id` làm `key` nên thêm/xóa liên tục không bị crash / lẫn dữ liệu.
