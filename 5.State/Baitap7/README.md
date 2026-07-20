# [Bài 7 - Giỏi] Đánh giá Trade-off: Ma trận Render (shallow vs mount)

## Cách chạy

```bash
npm install
npm test
```

Vitest in thời gian thực thi của từng file test — so sánh dòng của
`Dashboard.shallow.test.tsx` với `Dashboard.mount.test.tsx` để thấy chênh lệch.

## Bối cảnh

`Dashboard` (Component Cha) chứa **10 `<Chart />` phức tạp** (mỗi Chart render 2.000 điểm
dữ liệu → tổng 20.000 node). Cần test sự tồn tại của `<h1>Title</h1>`.

- `src/Dashboard.shallow.test.tsx` — **render nông**: `vi.mock('./Chart')` biến 10 Chart con
  thành stub rỗng, tương đương `shallow()` của Enzyme (chỉ render 1 tầng).
- `src/Dashboard.mount.test.tsx` — **render đầy đủ** toàn bộ cây DOM, tương đương `mount()`.

> Enzyme đã ngừng phát triển và không hỗ trợ React 18/19, nên project dùng
> Vitest + React Testing Library với 2 kỹ thuật tương đương về bản chất.

## Bảng so sánh shallow vs mount (component có DOM Tree sâu)

| Tiêu chí | shallow (mock con) | mount (render đầy đủ) |
|---|---|---|
| Độ sâu render | Chỉ 1 tầng — Chart con là stub, không render thật | Toàn bộ cây — 10 Chart × 2.000 điểm render đầy đủ |
| Thời gian chạy | **Rất nhanh** (bỏ qua 20.000 node) | **Chậm hơn nhiều lần**, tăng theo độ phức tạp của con |
| Tính cô lập | Cao — lỗi trong Chart con không làm fail test của Dashboard | Thấp — Chart con lỗi kéo fail test của cha |
| Độ phủ thực tế | Thấp hơn — không phát hiện lỗi tích hợp cha-con | Cao — kiểm tra DOM thật và tương tác giữa các tầng |
| Phù hợp khi | Test logic hiển thị **của riêng component cha** | Test tích hợp, hành vi phụ thuộc con |

## Chốt giải pháp

Yêu cầu chỉ là kiểm tra tiêu đề `<h1>Title</h1>` **của Dashboard** → chọn **render nông
(mock con / shallow)**: nhanh hơn hàng chục lần và cô lập Dashboard khỏi lỗi của Chart.
Chỉ dùng render đầy đủ (mount) khi cần kiểm tra sự tích hợp thật giữa Dashboard và các Chart.
