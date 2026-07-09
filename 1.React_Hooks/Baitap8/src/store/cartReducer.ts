import type { CartState, CartAction, Course } from "./types";

const calculateTotal = (courses: Course[], discountValue: number) => {
  const subTotal = courses.reduce((sum, course) => sum + course.price, 0);
  return Math.max(0, subTotal - discountValue);
};

export const cartReducer = (
  state: CartState,
  action: CartAction,
): CartState => {
  switch (action.type) {
    case "ADD_COURSE": {
      const isExist = state.courses.some(
        (course) => course.id === action.payload.id,
      );
      if (isExist) {
        alert("Khóa học đã tồn tại trong giỏ hàng!");
        return state;
      }

      const newCourses = [...state.courses, action.payload];
      return {
        ...state,
        courses: newCourses,
        totalPrice: calculateTotal(newCourses, state.discountValue),
      };
    }

    case "REMOVE_COURSE": {
      const newCourses = state.courses.filter(
        (course) => course.id !== action.payload.id,
      );
      return {
        ...state,
        courses: newCourses,
        totalPrice: calculateTotal(newCourses, state.discountValue),
      };
    }

    case "APPLY_DISCOUNT": {
      return {
        ...state,
        discountCode: action.payload.code,
        discountValue: action.payload.discountValue,
        totalPrice: calculateTotal(state.courses, action.payload.discountValue),
      };
    }

    default:
      return state;
  }
};
