import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/index";

const getCartTotalQuantitySelector = createSelector(
  (state: RootState) => state.cart.items,
  (items) => Object.values(items).reduce((a, b) => a + b, 0)
);

export { getCartTotalQuantitySelector };
