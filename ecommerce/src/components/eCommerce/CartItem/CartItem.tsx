import { Button, Form } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@types";
import { memo } from "react";
import ProductInfo from "../ProductInfo/ProductInfo";
const { cartItem } = styles;

type TCartItem = TProduct & {
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};

const CartItem = memo(
  ({
    title,
    img,
    price,
    max,
    quantity,
    id,
    changeQuantityHandler,
    removeItemHandler,
  }: TCartItem) => {
    const renderOptions = Array.from({ length: max }, (_, idx) => {
      const quantity = idx + 1;
      return (
        <option value={quantity} key={quantity}>
          {quantity}
        </option>
      );
    });

    const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const quantity = +event.target.value;
      changeQuantityHandler(id, quantity);
    };

    const removeItem = () => {
      removeItemHandler(id);
    };
    return (
      <div className={cartItem}>
        <ProductInfo title={title} price={price} img={img} direction="column">
          <Button
            variant="secondary"
            style={{ color: "white" }}
            className="mt-auto"
            onClick={removeItem}
          >
            Remove
          </Button>
        </ProductInfo>

        <div>
          <Form.Group className="mb-3">
            <Form.Label
              htmlFor={`quantity-select-${id}`}
              className="d-block mb-1"
            >
              Quantity
            </Form.Label>
            <Form.Select
              id={`quantity-select-${id}`}
              value={quantity}
              onChange={changeQuantity}
              title={`Select quantity for ${title}`}
              aria-label={`Select quantity for ${title}`}
            >
              {renderOptions}
            </Form.Select>
          </Form.Group>
        </div>
      </div>
    );
  }
);

export default CartItem;
