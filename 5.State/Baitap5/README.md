# [Bài 5 - Khá] Cô lập môi trường mạng bằng Mocking

Stack: Vite + React 19 + TypeScript + **Redux Toolkit (createAsyncThunk / redux-thunk)** + Vitest + React Testing Library.

## Cách chạy

```bash
npm install
npm test       # chạy kịch bản kiểm thử
npm run dev    # xem WeatherWidget trên trình duyệt
```

## Luồng dữ liệu

`<WeatherWidget />` mount → dispatch thunk `fetchWeather` (createAsyncThunk — chính là
redux-thunk tích hợp sẵn trong Redux Toolkit) → thunk gọi `fetch` → reducer cập nhật
`status/description` → component render kết quả.

## Thiết kế luồng chặn đứng API thật

1. **Tầng chặn cứng (`src/setupTests.ts`):** trước khi mọi test chạy, `global.fetch` bị thay
   bằng hàm luôn `reject("Real network request blocked in tests")`. Test nào quên mock cũng
   **không thể** phát sinh network request thật.
2. **Tầng giả lập (trong test):** `vi.spyOn(globalThis, 'fetch')` (tương đương `jest.spyOn`)
   ghi đè hàm fetch gốc, trả về dữ liệu thời tiết tĩnh `{ description: "Nắng đẹp" }`.
3. **Xác nhận:**
   - Component render ra dòng chữ **"Nắng đẹp"**.
   - `fetchSpy` được gọi đúng 1 lần với đúng URL → dữ liệu chỉ đi qua hàm giả lập.
   - Test thứ 2 chứng minh fetch gốc đã bị chặn: không mock thì component hiển thị lỗi,
     không có request thật nào được gửi.

## Cấu trúc

- `src/store/weatherSlice.ts` — slice + thunk `fetchWeather`.
- `src/store/index.ts` — cấu hình store (Redux Toolkit).
- `src/WeatherWidget.tsx` — component tự gọi API khi mount (qua thunk).
- `src/WeatherWidget.test.tsx` — kịch bản kiểm thử mock fetch.
- `src/setupTests.ts` — chặn fetch gốc + cấu hình jest-dom matchers.

> Ghi chú: đề gợi ý `jest.spyOn()`; project dùng Vitest (chuẩn cho Vite + React 19) nên
> API tương đương là `vi.spyOn()` — cú pháp và hành vi giống hệt. Enzyme/Jest cổ điển
> không tương thích React 19.
