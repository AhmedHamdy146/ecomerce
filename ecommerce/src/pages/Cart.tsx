import { Heading } from "@components/common";
import { CartItemList, CartSubTotalPrice } from "@components/eCommerce";
import { Loading, LottieHandler } from "@components/feedback";
import useCart from "@hooks/useCart";

const Cart = () => {
  const {
    products,
    loading,
    error,
    placeOrderStatus,
    changeQuantityHandler,
    removeItemHandler,
    userAccessToken,
  } = useCart();
  return (
    <>
      <Heading title={`Your Cart`} />
      <Loading status={loading} error={error} type="cart">
        {products.length ? (
          <>
            <CartItemList
              carts={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />
            <CartSubTotalPrice
              products={products}
              userAccessToken={userAccessToken}
            />
          </>
        ) : placeOrderStatus === "succeeded" ? (
          "Your order has been placed successfully"
        ) : (
          <LottieHandler type="empty" message="Your cart is empty" />
        )}
      </Loading>
    </>
  );
};

export default Cart;
