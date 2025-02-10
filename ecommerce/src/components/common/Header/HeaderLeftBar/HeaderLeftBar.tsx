import WishlistIcon from "@assets/svg/wishllist.svg?react";
import CartIcon from "@assets/svg/cart.svg?react";
import HeaderCounter from "../HeaderCounter/HeaderCounter";

import { useAppSelector } from "@store/hooks";
import { getCartTotalQuantitySelector } from "@store/cart/selectos";
import styles from "./styles.module.css";
const { headerLeftBar } = styles;
const HeaderLeftBar = () => {
  const wishlistTotalQuantity = useAppSelector(
    (state) => state.wishlist.itemsId.length
  );

  const cartTotalQuantity = useAppSelector(getCartTotalQuantitySelector);
  return (
    <div className={headerLeftBar}>
      <HeaderCounter
        to="wishlist"
        title="Wishlist"
        totalQuantity={wishlistTotalQuantity}
        svgIcon={<WishlistIcon title="wishlist icon" />}
      />
      <HeaderCounter
        to="cart"
        title="Cart"
        totalQuantity={cartTotalQuantity}
        svgIcon={<CartIcon title="Cart icon" />}
      />
    </div>
  );
};

export default HeaderLeftBar;
