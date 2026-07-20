# [Bài 10 - Xuất sắc] Mini Product: CI/CD Pipeline Automation

Ứng dụng "Danh bạ nhân viên" với pipeline: **Git → Test → Build → Deploy (Vercel)**.

## Cách chạy local

```bash
npm install
npm test        # chạy unit test
npm run build   # test -> tsc -> vite build (test fail thì build dừng ngay)
npm run dev
```

## Cấu hình gating trong package.json

```json
"scripts": {
  "test": "vitest run",
  "build": "npm run test && tsc -b && vite build"
}
```

Vercel mặc định chạy `npm run build` → lệnh này **tự động chạy `npm run test` trước**.
Toán tử `&&` bảo đảm: **CHỈ KHI test pass** thì `vite build` mới được thực thi;
test fail → tiến trình thoát mã lỗi ≠ 0 → Vercel dừng pipeline, không deploy.

## Các bước kết nối GitHub + Vercel

1. Tạo repository trên GitHub, push mã nguồn lên (`git push`).
2. Vào [vercel.com](https://vercel.com) → **Add New Project** → **Import** repository vừa tạo.
3. Vercel tự nhận diện framework **Vite**, Build Command là `npm run build` → bấm **Deploy**.
4. Mỗi lần `git push` mới, Vercel tự động chạy lại pipeline và xuất bản lên Internet.

## Báo cáo bẫy hệ thống: cố tình push code làm test fail

Thử nghiệm: sửa `getActiveEmployees` trả về cả nhân viên `active: false` (sai logic) rồi push.

- Vercel Build Logs hiển thị `vitest run` chạy trước, test **FAIL**
  (`expected [...] to have a length of 1 but got 2`).
- Lệnh `npm run build` thoát với exit code 1 ngay tại bước test, `vite build` **không bao giờ chạy**.
- Deployment chuyển trạng thái **Error/Failed** → **Pipeline ĐÃ CHẶN bản build rác**:
  Live URL vẫn phục vụ phiên bản tốt gần nhất, người dùng cuối không bị ảnh hưởng.

## Nộp bài

- Live URL Vercel: _(dán link sau khi deploy)_
- Ảnh chụp Vercel Build Logs: _(đính kèm ảnh thể hiện bước test chạy trước build)_
