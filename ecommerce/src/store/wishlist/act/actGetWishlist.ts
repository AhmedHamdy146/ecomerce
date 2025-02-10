import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "@utils/index";

import { TProduct } from "@types";
import { RootState } from "@store/index";

type TDataType = "productsFullInfo" | "productsId";
type TResponse = TProduct[];

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (dataType: TDataType, thunkApi) => {
    const { rejectWithValue, signal, getState } = thunkApi;
    const { auth } = getState() as RootState;
    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `/wishlist?userId=${auth.user?.id}`,
        { signal }
      );

      if (!userWishlist.data.length) {
        return { data: [], dataType: "empty" };
      }

      if (dataType === "productsId") {
        const concatenatedItemsIds = userWishlist.data.map(
          (el) => el.productId
        );
        return { data: concatenatedItemsIds, dataType: "productsId" };
      } else {
        const concatenatedItemsIds = userWishlist.data
          .map((el) => `id=${el.productId}`)
          .join("&");

        const response = await axios.get<TResponse>(
          `/products?${concatenatedItemsIds}`
        );
        return { data: response.data, dataType: "productsFullInfo" };
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetWishlist;
