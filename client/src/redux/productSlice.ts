import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../interfaces/product";

interface State {
  products: IProduct[];
  filteredProduct: null;
}

const initialState: State = {
  //Değer tutacağımız stateleri burada tanımlıyoruz.
  products: [],
  filteredProduct: null,
};

const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setFilteredProduct: (state, action) => {
      state.filteredProduct = action.payload;
    },
  },
});

export const { setProducts, setFilteredProduct } = productsSlice.actions;
export default productsSlice.reducer;
