import { TProduct } from "@types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@utils/index";

import axios from "axios";

type TResponse = TProduct[];
const actGetProductsByCatPrefix = createAsyncThunk(
  "products/getProductsByCatPrefix",
  async (prefix: string, thunkApi) => {
    const { rejectWithValue, signal } = thunkApi;

    try {
      const response = await axios.get<TResponse>(
        `/products?cat_prefix=${prefix}`,
        {
          signal,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetProductsByCatPrefix;
