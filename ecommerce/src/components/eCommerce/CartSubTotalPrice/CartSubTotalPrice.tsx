import { useAppDispatch } from "@store/hooks";
import { useState } from "react";
import { actPlaceOrder } from "@store/orders/ordersSlice";
import { TProduct } from "@types";
import { Button, Modal, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { cleanCartAfterPlaceOrder } from "@store/cart/cartSlice";

const { container } = styles;

type TCartSubTotalPrice = {
  products: TProduct[];
  userAccessToken: string | null;
};

const CartSubTotalPrice = ({
  products,
  userAccessToken,
}: TCartSubTotalPrice) => {
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const totalPrice = products.reduce(
    (acc, cur) => acc + cur.price * cur.quantity!,
    0
  );

  const modalHandler = () => {
    setShowModal(!showModal);
    setError(null);
  };

  const placeOrderHandle = () => {
    setLoading(true);
    dispatch(actPlaceOrder(totalPrice))
      .unwrap()
      .then(() => {
        dispatch(cleanCartAfterPlaceOrder());
        setShowModal(false);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };
  return (
    <>
      <Modal show={showModal} onHide={modalHandler} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Placing order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to place order with Subtotal :{" "}
          {totalPrice.toFixed(2)} EGP
          {error && (
            <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalHandler}>
            close
          </Button>
          <Button
            variant="primary"
            style={{ color: "white" }}
            onClick={placeOrderHandle}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <div className={container}>
        <span>SubTotal:</span>
        <span>{totalPrice.toFixed(2)} EGP</span>
      </div>
      {!!userAccessToken && (
        <div className={container}>
          <span></span>
          <span>
            <Button
              variant="info"
              style={{ color: "white" }}
              onClick={modalHandler}
            >
              Place order
            </Button>
          </span>
        </div>
      )}
    </>
  );
};

export default CartSubTotalPrice;
