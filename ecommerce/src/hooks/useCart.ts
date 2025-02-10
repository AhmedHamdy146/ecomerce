import {
  cartItemChangeQuantity,
  getProductsInfoByItemsId,
  cartItemRemove,
  cleanCartProductsFullInfo,
} from "@store/cart/cartSlice";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import { resetOrdersStatus } from "@store/orders/ordersSlice";
import { useCallback, useEffect } from "react";

const useCart = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error, productsFullInfo } = useAppSelector(
    (state) => state.cart
  );

  const placeOrderStatus = useAppSelector((state) => state.orders.loading);

  const userAccessToken = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const promise = dispatch(getProductsInfoByItemsId());

    return () => {
      promise.abort();
      dispatch(cleanCartProductsFullInfo());
      dispatch(resetOrdersStatus());
    };
  }, [dispatch]);

  const products = productsFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id] ?? 0,
  }));

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(cartItemRemove(id));
    },
    [dispatch]
  );
  return {
    loading,
    error,
    products,
    placeOrderStatus,
    changeQuantityHandler,
    removeItemHandler,
    userAccessToken,
  };
};

export default useCart;
