import { FaPlus } from "react-icons/fa6";
import { serverUrl } from "../redux/store";
import { myCart } from "../types/types";

interface ProductCard {
  productId: string;
  photo: string;
  name: string;
  price: number;
  addToCartHandler: (cartItem: myCart) => string | undefined;
  stock: number;
}

const ProductCard = ({
  productId,
  photo,
  name,
  price,
  addToCartHandler,
  stock,
}: ProductCard) => {
  return (
    <div className="productcard">
      <img src={`${serverUrl}/${photo}`} alt={name} />
      <p>{name}</p>
      <span>₹ {price}</span>
      <div>
        <button onClick={()=>addToCartHandler({
            productId,
            photo,
            name,
            quantity:1,
            price,
            stock
          })}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
