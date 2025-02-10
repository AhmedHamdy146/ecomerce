import { useAppDispatch } from "@store/hooks";
import { actGetOrders } from "@store/orders/ordersSlice";
import { useEffect } from "react";

const Orders = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const promise = dispatch(actGetOrders());

    return () => {
      promise.abort();
    };
  }, [dispatch]);
  return <div>orders</div>;
};

export default Orders;
