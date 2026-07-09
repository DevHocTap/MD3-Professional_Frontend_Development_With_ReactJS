# Bài 9 - Kiến trúc Zustand Slices & Vanilla JS

## Mục tiêu
Tách store lớn thành nhiều slice và cho phép đọc state ở file thuần JS/TS (ngoài cây React Component).

## Slices Pattern
Store được chia thành 2 slice độc lập, gộp vào một Bound Store duy nhất:

- `authSlice` (`store/authSlice.ts`): giữ `token` (JWT), `login`, `logout`.
- `uiSlice` (`store/uiSlice.ts`): giữ `toast`, `showToast`, `clearToast`.
- `useBoundStore` (`store/useBoundStore.ts`): gộp cả hai bằng `create<BoundState>()((...a) => ({ ...createAuthSlice(...a), ...createUiSlice(...a) }))`.

Mỗi slice là một `StateCreator<BoundState, [], [], SliceType>` nên vẫn truy cập được toàn bộ store khi cần, mà code tách file rõ ràng.

## Vanilla JS API cho file ngoài React
`api/axiosClient.ts` là file thuần TS, KHÔNG nằm trong cây React nên không được dùng hook `useStore()`.
Giải pháp: dùng **`useBoundStore.getState()`** để đọc token trực tiếp trong Axios interceptor:

```ts
axiosClient.interceptors.request.use((config) => {
  const token = useBoundStore.getState().token
  if (token) config.headers.Authorization = `Bearer ${token}`
  else delete config.headers.Authorization
  return config
})
```

## Bẫy dữ liệu
Nếu token bị xóa (đăng xuất), `getState().token` trả về `null`, interceptor **không gắn header** Authorization.

## Cách kiểm chứng
Mở Console:
- Bấm "Đăng nhập" rồi "Gọi API" -> log `Authorization = Bearer jwt-token-abc-123`.
- Bấm "Đăng xuất" rồi "Gọi API" -> log `Authorization = (không gắn header)`.
