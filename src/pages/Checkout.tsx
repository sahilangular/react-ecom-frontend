import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useNewOrderMutation } from "../redux/api/orderApi";
import { rootState, serverUrl } from "../redux/store";
import { newOrderRequest } from "../types/api-types";
import { initialcartReducer } from "../types/reducer-types";
import { useAllCartQuery } from "../redux/api/cartApi";
import axios from "axios";

const CheckOutForm = () => {
  const { shippingInfo } = useSelector(
    (state: { cart: initialcartReducer }) => state.cart
  );

  const { user } = useSelector((state: rootState) => state.user);
  
  const { data: cartData } = useAllCartQuery(user?._id!);
  
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [newOrder] = useNewOrderMutation();
    
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

     const {data} = await axios.get(`${serverUrl}/api/v1/cart/price`)

    if (!stripe || !elements) return;
    setIsProcessing(true);

    const order: newOrderRequest = {
      shippingInfo,
      shippingCharges: data.pricing.shippingCharges,
      total: data.pricing.total,
      tax: data.pricing.tax,
      orderItems: cartData?.cart!,
      discount: data.pricing.discount,
      subtotal: data.pricing.subtotal,
      user: user?._id!,
    };

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
      redirect: "if_required",
    });

    
    
    if (error) {
      toast.error(error.message || "something wrong");
      setIsProcessing(false);
    }
    
    if (paymentIntent?.status === "succeeded") {
       newOrder(order).unwrap().then((_)=>{
         setIsProcessing(false);
         toast.success('order placed successfully');
       }).catch(_=>{
        toast.error('Error in placing the order')
       })
    }
  };

  return (
    <div className="checkout-container">
      <form onSubmit={submitHandler}>
          <>
            <PaymentElement />
            <button type="submit" disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Pay"}
            </button>
          </>
      </form>
    </div>
  );
};

const Checkout = () => {
  const navigate = useNavigate();

  const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PROMISE as string
  );

  const location = useLocation();

  const clientSecret: string | undefined = location.state;

  useEffect(() => {
    if (!clientSecret) return navigate("/cart");
  }, [clientSecret]);

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
      }}
    >
      <CheckOutForm />
    </Elements>
  );
};

export default Checkout;
