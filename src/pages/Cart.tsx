import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { Skeleton } from "../components/Loader";
import {
  useAllCartQuery,
  useCalculatePriceQuery,
  useDecQuantityItemMutation,
  useDeleteCartMutation,
  useIncQuantityItemMutation,
} from "../redux/api/cartApi";
import {
  cartItems,
  discountApplied
} from "../redux/reducer/cartReducer";
import { rootState, serverUrl } from "../redux/store";
import { customeError } from "../types/api-types";
import { myCart } from "../types/types";

const Cart = () => {
  const { user } = useSelector((state: rootState) => state.user);

  const { data, isLoading, isError, error } = useAllCartQuery(user?._id!);
  
  const [coupenCode, setCoupenCode] = useState<string>("");

  const { data: priceData, isLoading: priceLoading } =
    useCalculatePriceQuery(coupenCode);

  const [deleteCartItem] = useDeleteCartMutation();

  const [incItem] = useIncQuantityItemMutation();

  const [decItem] = useDecQuantityItemMutation();

  const dispatch = useDispatch();

  if (isError) {
    const err = error as customeError;
    toast.error(err.data.message);
  }

  const [isValid, setIsvalid] = useState<boolean>(false);

  const increaseHandler = (cartItem: myCart) => {
    if (cartItem.quantity >= cartItem.stock) return;
    incItem(cartItem._id)
      .unwrap()
      .then((_) => {})
      .catch((_) => {
        toast.error("something wents wrong");
      });
  };

  const decreaseHandler = (cartItem: myCart) => {
    if (cartItem.quantity <= 1) return;
    decItem(cartItem._id)
      .unwrap()
      .then((_) => {})
      .catch((_) => {
        toast.error("something wents wrong");
      });
  };

  const removeHandler = (cartId: string) => {
    deleteCartItem(cartId)
      .unwrap()
      .then((_) => {})
      .catch((_) => {
        toast.error("Something went wrong while removing the item.");
      });
  };

  useEffect(() => {
    if (data) {
      dispatch(cartItems(data?.cart));
    }
  }, [data]);

  useEffect(() => {
    const { token, cancel } = axios.CancelToken.source();
    const coupenId = setTimeout(() => {
      axios
        .get(`${serverUrl}/api/v1/payment/discount?code=${coupenCode}`, {
          cancelToken: token,
        })
        .then((_) => {
          setIsvalid(true);
        })
        .catch((_) => {
          dispatch(discountApplied(0));
        });
    }, 1000);

    return () => {
      clearTimeout(coupenId);
      cancel();
      setIsvalid(false);
    };
  }, [coupenCode]);

  return (
    <div className="cart">
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <main>
            {data?.cart && data.cart.length > 0 ? (
              data.cart.map((item, i) => (
                <CartItem
                  key={i}
                  increaseHandler={increaseHandler}
                  decreaseHandler={decreaseHandler}
                  removeHandler={removeHandler}
                  cartItem={item}
                />
              ))
            ) : (
              <h1>No items added</h1>
            )}
          </main>
          {data?.cart && data.cart.length > 0 && (
            <aside>
              {priceLoading ? (
                <Skeleton />
              ) : (
                <>
                  <p>subtotal:₹{priceData.pricing.subtotal}</p>
                  <p>shippingCharges:₹{priceData.pricing.shippingCharges}</p>
                  <p>Tax:₹{priceData.pricing.tax}</p>
                  <p>
                    Discount:<em>-₹{priceData.pricing.discount}</em>
                  </p>
                  <p>subtotal:₹{priceData.pricing.subtotal}</p>
                  <p>
                    <b>Total:₹{priceData.pricing.total}</b>
                  </p>
                  <input
                    type="text"
                    placeholder="Enter coupen code"
                    value={coupenCode}
                    onChange={(e) => setCoupenCode(e.target.value)}
                  />
                  {coupenCode &&
                    (isValid ? (
                      <span className="green">
                        ₹{priceData.pricing.discount} off using the{" "}
                        <code>{coupenCode}</code>
                      </span>
                    ) : (
                      <span className="red">
                        Invalid coupen code
                        <VscError />
                      </span>
                    ))}
                  {data.cart.length > 0 && (
                    <Link to={"/shipping"}>
                      <button>Checkout</button>
                    </Link>
                  )}
                </>
              )}
            </aside>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
