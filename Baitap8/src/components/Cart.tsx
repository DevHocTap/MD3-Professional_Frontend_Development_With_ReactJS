// File: src/components/Cart.tsx
import { useReducer } from "react";
import { cartReducer } from "../store/cartReducer";
import type { CartState, Course } from "../store/types";

const initialState: CartState = {
  courses: [],
  discountCode: null,
  discountValue: 0,
  totalPrice: 0,
};

export default function Cart() {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  // Dữ liệu mẫu
  const sampleCourse1: Course = {
    id: "c1",
    name: "React Fundamentals",
    price: 1000,
  };
  const sampleCourse2: Course = {
    id: "c2",
    name: "Advanced Hooks",
    price: 1500,
  };

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "600px" }}
    >
      <h2>Giỏ Hàng Bằng useReducer</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={() =>
            dispatch({ type: "ADD_COURSE", payload: sampleCourse1 })
          }
        >
          Thêm Khóa 1 (1000)
        </button>
        <button
          onClick={() =>
            dispatch({ type: "ADD_COURSE", payload: sampleCourse2 })
          }
        >
          Thêm Khóa 2 (1500)
        </button>
        <button
          onClick={() =>
            dispatch({
              type: "APPLY_DISCOUNT",
              payload: { code: "GIAM500", discountValue: 500 },
            })
          }
        >
          Áp mã GIAM500
        </button>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "15px",
          borderRadius: "8px",
        }}
      >
        <ul style={{ paddingLeft: "20px" }}>
          {cartState.courses.map((course) => (
            <li key={course.id} style={{ marginBottom: "10px" }}>
              {course.name} - {course.price} VNĐ
              <button
                onClick={() =>
                  dispatch({
                    type: "REMOVE_COURSE",
                    payload: { id: course.id },
                  })
                }
                style={{ marginLeft: "10px", color: "red" }}
              >
                Xóa
              </button>
            </li>
          ))}
          {cartState.courses.length === 0 && <li>Giỏ hàng trống</li>}
        </ul>

        <hr />
        <p>
          Mã giảm giá:{" "}
          <strong>{cartState.discountCode || "Chưa áp dụng"}</strong> (-
          {cartState.discountValue} VNĐ)
        </p>
        <h3 style={{ color: "red" }}>
          Tổng thanh toán: {cartState.totalPrice} VNĐ
        </h3>
      </div>
    </div>
  );
}
