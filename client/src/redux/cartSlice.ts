import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../interfaces/product";

interface CartState {
  cartItems: IProduct[];
  total: number;
  tax: number;
}

const initialState: CartState = {
  //Değer tutacağımız stateleri burada tanımlıyoruz.
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") as string).cartItems
    : [],
  total: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") as string).total
    : 0,
  tax: 8,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //Method fonksiyonu yazacağımız yerde burası, buradan fonksiyon yazıp gerekli yerlerde çağıracağız.
    addProduct: (state, action) => {
      const findCartItem = state.cartItems.find(
        (item) => item._id === action.payload._id //state id'si ile action yani aksiyon tıklanma anında ki id almamızı sağlıyor.
      );
      if (findCartItem?.quantity !== undefined) {
        findCartItem.quantity = findCartItem.quantity + 1;
      } else {
        state.cartItems.push(action.payload);
      }
      state.total += action.payload.price;
    },

    deleteCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.total -= action.payload.price * action.payload.quantity;
    },

    increaseProduct: (state, action) => {
      const findCartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (findCartItem?.quantity !== undefined) {
        findCartItem.quantity = findCartItem.quantity + 1;
        state.total += action.payload.price;
      }
    },
    decreaseProduct: (state, action) => {
      const findCartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (findCartItem?.quantity !== undefined) {
        findCartItem.quantity = findCartItem.quantity - 1;
        state.total -= action.payload.price;
      }
      if (findCartItem?.quantity === 0) {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
      }
    },
    reset: (state) => {
      state.cartItems = [];
      state.total = 0;
    },
  },
});

export const {
  addProduct,
  deleteCart,
  increaseProduct,
  decreaseProduct,
  reset,
} = cartSlice.actions;
export default cartSlice.reducer;
