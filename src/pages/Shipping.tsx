import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../redux/reducer/cartReducer";
import axios from "axios";
import { rootState, serverUrl } from "../redux/store";
import toast from "react-hot-toast";
import { useAllCartQuery, useCalculatePriceQuery } from "../redux/api/cartApi";

const Shipping = () => {
  const { data: priceData } = useCalculatePriceQuery("");

  const { user } = useSelector((state: rootState) => state.user);
  const { data: cartData } = useAllCartQuery(user?._id!);

  const dispatch = useDispatch();

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    state: "",
    country: "",
    pincode: "",
    city: "",
  });

  const navigate = useNavigate();

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(saveShippingInfo(shippingInfo));
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/v1/payment/create`,
        {
          amount: priceData.pricing.total,
          name: user?.name,
          shippingInfo: shippingInfo,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/pay", {
        state: data.clientSecret,
      });
    } catch (error) {
      toast.error("something wents wrong");
    }
  };

  useEffect(() => {
    if (cartData?.cart.length! <= 0) return navigate("/cart");
  });

  return (
    <div className="shipping">
      <button className="backBtn" onClick={() => navigate("/cart")}>
        <BiArrowBack />
      </button>
      <form onSubmit={submitHandler}>
        <h1>Shipping Address</h1>
        <input
          type="text"
          placeholder="address"
          name="address"
          value={shippingInfo.address}
          onChange={changeHandler}
          required
        />
        <input
          type="text"
          placeholder="city"
          name="city"
          value={shippingInfo.city}
          onChange={changeHandler}
          required
        />
        <input
          type="number"
          placeholder="pincode"
          name="pincode"
          value={shippingInfo.pincode}
          onChange={changeHandler}
          required
        />
        <select
          required
          name="country"
          value={shippingInfo.country}
          onChange={changeHandler}
        >
          <option value={""}>Select country</option>
          <option value={"india"}>India</option>
        </select>

        <input
          type="text"
          placeholder="state"
          name="state"
          value={shippingInfo.state}
          onChange={changeHandler}
          required
        />
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default Shipping;
