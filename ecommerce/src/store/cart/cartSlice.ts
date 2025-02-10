import { TProduct, TLoading, isString } from "@types";
import { createSlice } from "@reduxjs/toolkit";
import getProductsInfoByItemsId from "./act/actGetProductsInfoByItemsId";
interface ICartState {
  items: { [key: string]: number };
  productsFullInfo: TProduct[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICartState = {
  items: {},
  productsFullInfo: [],
  loading: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id] += 1;
      } else {
        state.items[id] = 1;
      }
    },
    cartItemChangeQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      state.items[id] = quantity;
    },
    cartItemRemove: (state, action) => {
      const id = action.payload;
      delete state.items[id];
      state.productsFullInfo = state.productsFullInfo.filter(
        (el) => el.id !== id
      );
    },
    cleanCartProductsFullInfo: (state) => {
      state.productsFullInfo = [];
    },
    cleanCartAfterPlaceOrder: (state) => {
      state.items = {};
      state.productsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsInfoByItemsId.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getProductsInfoByItemsId.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productsFullInfo = action.payload ?? [];
    });
    builder.addCase(getProductsInfoByItemsId.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });
  },
});

export { getProductsInfoByItemsId };
export const {
  addToCart,
  cartItemChangeQuantity,
  cartItemRemove,
  cleanCartProductsFullInfo,
  cleanCartAfterPlaceOrder,
} = cartSlice.actions;
export default cartSlice.reducer;
