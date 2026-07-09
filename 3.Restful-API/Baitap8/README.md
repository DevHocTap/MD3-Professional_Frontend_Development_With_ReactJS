# Bài 8 - Báo cáo Hiệu năng: Controlled vs Uncontrolled

## Mục tiêu
Đo lường và ra quyết định kiến trúc dựa trên bằng chứng kỹ thuật trực quan.

## Thiết lập thí nghiệm
- `FormikForm`: 5 `<input>` (Controlled, dùng `formik.values` + `handleChange`).
- `RHFForm`: 5 `<input>` (Uncontrolled, dùng `{...register()}`).
- Đặt `console.log('Rendered ...')` ở thân mỗi component.
- Gõ 10 ký tự liên tiếp vào 1 input của mỗi bản.

## Diagnostic Matrix

| Thư viện | Cơ chế | Re-render mỗi phím gõ | Số lần log cho 10 phím |
|---|---|---|---|
| Formik | Controlled (state) | Có | ~10 lần (mỗi ký tự 1 lần) |
| React Hook Form | Uncontrolled (ref) | Không | ~1 lần (chỉ render đầu) |

> Ghi chú: dưới `StrictMode` (dev) mỗi lần render có thể log gấp đôi, nhưng **tỉ lệ** giữa 2 bản vẫn giữ nguyên (Formik nhiều hơn RHF theo số phím gõ).

## Kết luận
Với form 100 trường nhập liệu động, **React Hook Form (Uncontrolled)** thắng tuyệt đối về hiệu năng vì không re-render theo từng phím gõ.
