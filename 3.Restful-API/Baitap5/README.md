# Bài 5 - Tích hợp toàn diện Formik & Yup

## Mục tiêu
Luồng dữ liệu một chiều khép kín: Khởi tạo giá trị -> Nhập liệu -> Kiểm chuẩn qua Schema -> Trả kết quả.

## Phân tích luồng dữ liệu

- **Input**: `fullName` (Họ tên), `cccd` (Căn cước công dân), `income` (Thu nhập hàng tháng).
- **Khởi tạo (initialValues)**: tất cả rỗng `''`.
- **Kiểm chuẩn (validationSchema - Yup)**:

| Trường | Quy tắc | Loại lỗi |
|---|---|---|
| fullName | required | Bỏ trống |
| cccd | required + `matches(/^\d{12}$/)` | Bỏ trống / Sai định dạng (không đủ 12 chữ số) |
| income | `number()` + `typeError` + required + `moreThan(5000000)` | Nhập chữ (sai kiểu) / Bỏ trống / Không đủ 5.000.000 |
| **Output** | `onSubmit(values)` chạy khi mọi rule pass | Trả object hợp lệ |

## Điểm nhấn
- CCCD dùng **Regex `.matches()`** để ép đúng 12 chữ số.
- Thu nhập dùng **`Yup.number().typeError()`**: nếu nhập chữ sẽ báo lỗi định dạng thay vì để lọt.

## Cách kiểm chứng
- CCCD nhập `123` -> "CCCD phải là chuỗi đúng 12 chữ số".
- Income nhập `abc` -> "Thu nhập phải là số".
- Income nhập `1000000` -> "Thu nhập phải lớn hơn 5.000.000".
- Nhập hợp lệ -> alert JSON kết quả.
