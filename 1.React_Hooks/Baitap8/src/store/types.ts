export type Course = {
  id: string;
  name: string;
  price: number;
};

export type CartState = {
  courses: Course[];
  discountCode: string | null;
  discountValue: number;
  totalPrice: number;
};

export type CartAction =
  | { type: "ADD_COURSE"; payload: Course }
  | { type: "REMOVE_COURSE"; payload: { id: string } }
  | {
      type: "APPLY_DISCOUNT";
      payload: { code: string; discountValue: number };
    };
