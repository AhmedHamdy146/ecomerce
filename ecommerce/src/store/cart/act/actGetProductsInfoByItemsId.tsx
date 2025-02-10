import { TProduct } from "@types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import { axiosErrorHandler } from "@utils/index";

import axios from "axios";

type TResponse = TProduct[];

const getProductsInfoByItemsId = createAsyncThunk(
  "cart/getProductsInfoByItemsId",
  async (_, thunkApi) => {
    const { rejectWithValue, fulfillWithValue, getState, signal } = thunkApi;
    const { cart } = getState() as RootState;
    const itemsIds = Object.keys(cart.items);
    const concatenatedItemsIds = itemsIds.map((el) => `id=${el}`).join("&");

    if (!itemsIds.length) {
      return fulfillWithValue([]);
    }

    try {
      const response = await axios.get<TResponse>(
        `/products?${concatenatedItemsIds}`,
        { signal }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default getProductsInfoByItemsId;
