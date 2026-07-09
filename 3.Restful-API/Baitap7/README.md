# Bài 7 - Phân tích Đa giải pháp: Logic Schema phụ thuộc

## Bối cảnh
Form tuyển dụng có Dropdown "Trạng thái việc làm" (Đã có việc / Đang tìm việc).
- Chọn "Đã có việc" -> hiện thêm trường "Công ty hiện tại" và **bắt buộc** nhập.
- Chọn "Đang tìm việc" -> trường này ẩn đi và Schema **bỏ qua** lỗi.

## Hai giải pháp

### Giải pháp 1: Thao tác thủ công trong hàm validate
Tự viết `if (status === 'employed' && !currentCompany) errors.currentCompany = '...'`.
- Ưu: không cần thư viện schema.
- Nhược: logic rải rác, khó bảo trì khi nhiều trường phụ thuộc.

### Giải pháp 2 (đã chọn): Dùng `.when()` của Yup
```ts
currentCompany: yup.string().when('status', {
  is: 'employed',
  then: (s) => s.required('Vui lòng nhập công ty hiện tại'),
  otherwise: (s) => s.notRequired(),
})
```
- Ưu: khai báo (declarative), gọn, dễ mở rộng.
- Kết hợp `watch('status')` để ẩn/hiện field trên UI.

## Cách kiểm chứng
- Chọn "Đang tìm việc" -> submit được ngay (không đòi công ty).
- Chọn "Đã có việc" -> field công ty hiện ra, bỏ trống thì báo lỗi.
