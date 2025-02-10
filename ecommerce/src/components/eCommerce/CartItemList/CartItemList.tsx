import { TProduct } from "@types";
import CartItem from "../CartItem/CartItem";

type TCartItemListProps = {
  carts: TProduct[];
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};

const CartItemList = ({
  carts,
  changeQuantityHandler,
  removeItemHandler,
}: TCartItemListProps) => {
  return (
    <>
      {carts.map((cart) => (
        <CartItem
          {...cart}
          key={cart.id}
          changeQuantityHandler={changeQuantityHandler}
          removeItemHandler={removeItemHandler}
        />
      ))}
    </>
  );
};

export default CartItemList;
