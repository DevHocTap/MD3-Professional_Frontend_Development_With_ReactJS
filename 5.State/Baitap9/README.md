# [Bài 9 - Xuất sắc] Phát triển tính năng với TDD (Test-Driven Development)

Stack: Vite + React 19 + TypeScript + **Redux Toolkit** + Vitest + React Testing Library.
State của bộ đếm được quản lý bằng Redux Toolkit slice (không dùng useState).

## Cách chạy

```bash
npm install
npm test
npm run dev
```

## Minh chứng cấu trúc file: Test và Component tách biệt

```
src/
├── SmartCounter.test.tsx     <- Bước 1: viết TRƯỚC (3 unit test)
├── SmartCounter.tsx          <- Bước 3: viết SAU, vừa đủ để pass 3 test
└── store/
    ├── counterSlice.ts       <- Redux Toolkit slice: increase / decrease / reset
    └── index.ts              <- configureStore + makeStore (store mới cho mỗi test)
```

## Quy trình TDD đã thực hiện

**Bước 1 — Viết 3 Unit Test trước** (`src/SmartCounter.test.tsx`):

1. Hiển thị ban đầu là `0`.
2. Bấm **Tăng** → giá trị lên `1`.
3. **Bẫy dữ liệu:** đang `0` bấm **Giảm** → vẫn là `0` (không được phép âm).

**Bước 2 — Chạy test khi chưa có code** → fail đúng như kỳ vọng (RED):

```
FAIL src/SmartCounter.test.tsx
  Error: Failed to resolve import "./SmartCounter"
```

**Bước 3 — Viết code vừa đủ để pass** (GREEN):

- `counterSlice.ts`: reducer `increase` (`value += 1`), `reset` (`value = 0`), và
  `decrease` chặn bẫy số âm: chỉ giảm khi `value > 0`.
- `SmartCounter.tsx`: đọc giá trị bằng `useSelector`, phát action bằng `useDispatch`
  với 3 nút Tăng / Giảm / Reset.

Chạy lại `npm test` → cả 3 test PASS.

## Vì sao mỗi test tạo store riêng (`makeStore()`)?

Redux store là state toàn cục — nếu các test dùng chung một store, giá trị đếm của test
trước sẽ rò rỉ sang test sau. `renderCounter()` bọc component trong `<Provider>` với một
store mới tinh cho từng test để bảo đảm tính độc lập.
