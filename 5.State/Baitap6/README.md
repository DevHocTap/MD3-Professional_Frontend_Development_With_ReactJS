# [Bài 6 - Khá] Đóng gói và Phân tích quá trình Build

## Cách chạy

```bash
npm install
npm run build    # lệnh tiêu chuẩn tối ưu hóa mã nguồn -> sinh ra thư mục dist/
npm run preview  # xem thử bản production
```

## Vì sao dự án 300MB không thể gửi thẳng cho khách hàng?

Thư mục dự án phình to chủ yếu do `node_modules` (thư viện chỉ phục vụ **phát triển**).
Khách hàng/máy chủ chỉ cần **sản phẩm cuối** — vài trăm KB file tĩnh — nên phải chạy build.

## Khác biệt cấu trúc Dev vs Prod

| | Môi trường Dev (mã nguồn) | Thư mục Prod (`dist/`) |
|---|---|---|
| Thành phần | `src/` nhiều file `.tsx`, `.css` rời rạc + `node_modules` hàng trăm MB | Chỉ còn `index.html` + 1-2 file JS/CSS đã gộp (bundle) |
| Kích thước | Hàng trăm MB | Vài trăm KB (đã minify + gzip) |
| Mã JS | Đọc được, có JSX, chia module | Đã biên dịch, gộp, **minify** thành 1 dòng khó đọc |
| Tên file | `App.tsx`, `main.tsx` cố định | `index-D4f8kQz2.js` — có **hash** trong tên |
| Mục đích | Cho lập trình viên sửa đổi, có HMR | Cho trình duyệt tải nhanh nhất |

## Trả lời bẫy dữ liệu: vì sao file JS bị đổi tên (hash) và không đọc được?

1. **Không đọc được (minify/uglify):** khoảng trắng, xuống dòng, tên biến dài bị rút gọn
   (`employeeList` → `e`) để **giảm tối đa dung lượng tải về**, đồng thời gây khó cho việc
   đọc trộm logic. Trình duyệt không cần tên biến đẹp nên mã vẫn chạy bình thường.
2. **Tên file có hash (`index-D4f8kQz2.js`):** hash được sinh từ **nội dung file**, giải quyết
   vấn đề **cache của trình duyệt** trên môi trường thực tế:
   - Trình duyệt cache file tĩnh rất lâu để lần sau tải nhanh.
   - Nếu tên file không đổi, sau khi deploy bản mới người dùng có thể vẫn bị chạy **bản JS cũ** trong cache.
   - Nội dung thay đổi → hash đổi → tên file đổi → trình duyệt buộc phải tải bản mới
     (**cache busting**); file không đổi vẫn được cache tối đa.

> Ghi chú: template CRA sinh thư mục `build/`, còn Vite sinh thư mục `dist/` — vai trò như nhau.
