# Bài 6 - Triển khai Kiến trúc Uncontrolled với React Hook Form

## Mục tiêu
Tối ưu hiệu suất (giảm re-render) cho biểu mẫu lớn bằng cách bỏ cơ chế Controlled Component.

## "Uncontrolled Component" trong React Hook Form là gì?
- **Controlled**: mỗi ô input có `value` + `onChange` gắn vào state React. Mỗi phím gõ -> `setState` -> component re-render. Form lớn (textarea dài) sẽ giật.
- **Uncontrolled**: input tự quản lý giá trị trong DOM. React Hook Form dùng `ref` (qua `{...register('field')}`) để đọc giá trị trực tiếp từ DOM khi cần, **không dùng state, không re-render mỗi phím gõ** -> gõ mượt.

## Cách triển khai
- Bỏ hoàn toàn `value` và `onChange`.
- Khởi tạo `useForm()` và gắn `{...register('fieldName')}` trực tiếp vào thẻ DOM.
- Ràng buộc kiểm duyệt truyền thẳng vào `register`: `{ required: true, minLength: 50 }`.

## Cách kiểm chứng
- Gõ nội dung < 50 ký tự rồi bấm "Đăng bài" -> báo "Nội dung bài viết tối thiểu 50 ký tự".
- Gõ trong textarea không gây re-render toàn form (khác hẳn Formik/Controlled).
