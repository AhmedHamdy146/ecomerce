import { memo, useEffect, useState } from "react";
import { TProduct } from "@types";
import { useAppDispatch } from "@store/hooks";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";
import { addToCart } from "@store/cart/cartSlice";
import { Button, Modal, Spinner } from "react-bootstrap";
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";

import styles from "./styles.module.css";
import ProductInfo from "../ProductInfo/ProductInfo";
const { maximumNotice, wishlistBtn } = styles;

const Product = memo(
  ({
    title,
    price,
    img,
    id,
    max,
    quantity,
    isLiked,
    isAuthenticated,
  }: TProduct) => {
    const dispatch = useAppDispatch();

    const [showModal, setShowModal] = useState(false);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const currentRemainingQuantity = max - (quantity ?? 0); // nullish coalescing operator
    const quantityReachedToMax = currentRemainingQuantity <= 0;
    useEffect(() => {
      if (!isBtnDisabled) return;

      const debounce = setTimeout(() => {
        setIsBtnDisabled(false);
      }, 300);
      return () => {
        clearTimeout(debounce);
      };
    }, [isBtnDisabled]);

    const addToCartHandler = () => {
      dispatch(addToCart(id));
      setIsBtnDisabled(true);
    };

    const likeToggleHandler = () => {
      if (isAuthenticated) {
        if (!isLoading) {
          setIsLoading(true);
          dispatch(actLikeToggle(id))
            .unwrap()
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
        }
      } else {
        setShowModal(true);
      }
    };

    return (
      <>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need to login first to add this item to your wishlist.
          </Modal.Body>
        </Modal>
        <ProductInfo title={title} img={img} direction="row" price={price}>
          <div className={wishlistBtn} onClick={likeToggleHandler}>
            {isLoading ? (
              <Spinner animation="border" size="sm" variant="primary" />
            ) : isLiked ? (
              <LikeFill />
            ) : (
              <Like />
            )}
          </div>
          <p className={maximumNotice}>
            {quantityReachedToMax
              ? "You reach to the limit"
              : `You can add ${currentRemainingQuantity} item(s)`}
          </p>
          <Button
            variant="info"
            style={{ color: "white", width: "100%" }}
            disabled={isBtnDisabled || currentRemainingQuantity <= 0}
            onClick={addToCartHandler}
          >
            {isBtnDisabled ? <Spinner size="sm" /> : "Add to cart"}
          </Button>
        </ProductInfo>
      </>
    );
  }
);

export default Product;
