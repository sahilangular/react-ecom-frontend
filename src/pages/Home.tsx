import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { useCreatecartMutation } from "../redux/api/cartApi";
import { useLatestProductQuery } from "../redux/api/productApi";
import { addToCart } from "../redux/reducer/cartReducer";
import { rootState } from "../redux/store";
import { myCart } from "../types/types";

const Home = () => {
  const { user } = useSelector((state: rootState) => state.user);

  const [createCart] = useCreatecartMutation();
  const { data, isLoading, isError } = useLatestProductQuery("");

  if (isError) toast.error("Error in Products");

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: myCart) => {
    if (cartItem.stock < cartItem.quantity) return toast.error("Out Of Stock");
    createCart({
        name: cartItem.name,
        price: cartItem.price.toString(),
        photo: cartItem.photo,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        stock:cartItem.stock,
        user: user?._id!,
    }).unwrap().then((_)=>{
      dispatch(addToCart(cartItem));
      toast.success("Added To Cart");
    }).catch(_=>{
      toast.error('something wents wrong');
    })
     
  };

  return (
    <div className="home">
      <section></section>

      <h1>
        Latest Products
        <Link to={"/search"} className="findmore">
          More
        </Link>
      </h1>
      <main>
        {isLoading ? (
          <Skeleton />
        ) : (
          data?.products.map((product, i) => (
            <ProductCard
              key={i}
              productId={product._id}
              name={product.name}
              price={product.price}
              addToCartHandler={addToCartHandler}
              photo={product.photo}
              stock={product.stock}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
