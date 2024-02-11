import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { serverUrl } from "../redux/store";
import { myCart } from "../types/types";

interface Cart {
  cartItem: myCart;
  increaseHandler: (cartItem: myCart) => void;
  decreaseHandler: (cartItem: myCart) => void;
  removeHandler: (id: string) => void;
}

const CartItem = ({
  cartItem,
  increaseHandler,
  decreaseHandler,
  removeHandler,
}: Cart) => {
  const { productId,name,photo, quantity, price,_id } = cartItem;

  return (
    <div className="cartItem">
      <img src={`${serverUrl}/${photo}`} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>₹ {price}</span>
      </article>
      <div>
        <button onClick={() => decreaseHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => increaseHandler(cartItem)}>+</button>
      </div>
      <button onClick={() => removeHandler(_id!)}>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
