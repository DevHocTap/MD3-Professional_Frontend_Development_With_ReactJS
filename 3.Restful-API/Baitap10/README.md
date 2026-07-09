# Bài 10 - Mini LMS Module: Kiosk Quản lý Chấm điểm

## Mục tiêu
Thiết kế trọn vẹn vòng đời nghiệp vụ phức tạp: tích hợp React Hook Form + Resolver (Yup) + Error Handling.

## Cấu trúc Form
- `courseCode`: Mã môn học (chữ in hoa).
- `studentCount`: Sĩ số (số sinh viên dự thi).
- `scores[]`: Mảng điểm, **số lượng ô input sinh ra tự động** theo `studentCount`.

Dùng `@hookform/resolvers/yup` để quản lý toàn bộ logic kiểm duyệt.

## Lưu đồ xử lý (tương tác Sĩ số <-> ô Nhập điểm)

```
[Nhập studentCount] ──watch()──> count
        │
        ├── count <= 0  ─> Khóa mảng nhập điểm + báo "Sĩ số không hợp lệ"
        │
        └── count > 0   ─> render đúng `count` ô input điểm (scores.0 ... scores.n)
                                 │
                                 ▼
                        [Submit] ─> Yup validate từng điểm 0.0 - 10.0
                                 ├── lỗi -> hiện message từng ô
                                 └── hợp lệ -> trả kết quả
```

Ghi chú: bật `shouldUnregister: true` để khi giảm sĩ số, các ô điểm thừa tự hủy đăng ký, tránh dữ liệu rác.

## Bẫy dữ liệu bắt buộc
- **Sĩ số <= 0**: khóa mảng nhập điểm, báo "Sĩ số không hợp lệ", disable nút Lưu.
- **Điểm ngoài [0.0, 10.0]**: báo "Điểm phải từ 0.0 đến 10.0".
- **Mã môn không in hoa**: báo lỗi định dạng.
