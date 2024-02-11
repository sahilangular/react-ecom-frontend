import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "../../../components/Loader";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import {
  useDeleteOrderMutation,
  useOrderDetailQuery,
  useUpdateOrderMutation,
} from "../../../redux/api/orderApi";
import { rootState, serverUrl } from "../../../redux/store";
import { customeError } from "../../../types/api-types";
import { initialReducer } from "../../../types/reducer-types";
import { Order, orderItem } from "../../../types/types";

const defaultItems: Order = {
  shippingInfo: {
    address: "",
    city: "",
    country: "",
    state: "",
    pincode: "",
  },
  status: "",
  subtotal: 0,
  discount: 0,
  shippingCharge: 0,
  tax: 0,
  total: 0,
  orderItems: [],
  user: {
    _id: "",
    name: "",
  },
  _id: "",
};

const TransactionManagement = ()=> {
  const params = useParams();
  const navigate = useNavigate();

  const { user } = useSelector((state: rootState) => state.user);
  const { data, isLoading,isError } = useOrderDetailQuery(params?.id!);
  const [updateOrderStatus] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const {
    shippingInfo: { address, city, country, state, pincode },
    orderItems,
    user: { name },
    status,
    subtotal,
    total,
    discount,
    tax,
    shippingCharge,
  } = data?.order || defaultItems;

  const updateHandler = (): void => {
    updateOrderStatus({ userId: user?._id!, orderId: data?.order._id! })
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        navigate("/admin/transaction");
      })
      .catch((err) => {
        toast.error((err as customeError).data.message);
      });
  };

  const deleteHandler = () => {
    deleteOrder({ userId: user?._id!, orderId: data?.order._id! })
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        navigate("/admin/transaction");
      })
      .catch((err) => {
        toast.error((err as customeError).data.message);
      });
  };

  if (isError) navigate("/404");

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {isLoading ? (
          <Skeleton />
        ) : 
          <>
            <section
              style={{
                padding: "2rem",
              }}
            >
              <h2>Order Items</h2>

              {orderItems.map((i) => (
                <ProductCard
                  key={i._id}
                  name={i.name}
                  photo={`${serverUrl}/${i.photo}`}
                  productId={i.productId}
                  _id={i._id}
                  quantity={i.quantity}
                  price={i.price}
                />
              ))}
            </section>

            <article className="shipping-info-card">
              <button className="product-delete-btn" onClick={deleteHandler}>
                <FaTrash />
              </button>
              <h1>Order Info</h1>
              <h5>User Info</h5>
              <p>Name: {name}</p>
              <p>
                Address:{" "}
                {`${address}, ${city}, ${state}, ${country} ${pincode}`}
              </p>
              <h5>Amount Info</h5>
              <p>Subtotal: {subtotal}</p>
              <p>Shipping Charges: {shippingCharge}</p>
              <p>Tax: {tax}</p>
              <p>Discount: {discount}</p>
              <p>Total: {total}</p>

              <h5>Status Info</h5>
              <p>
                Status:{" "}
                <span
                  className={
                    status === "Delivered"
                      ? "purple"
                      : status === "Shipped"
                      ? "green"
                      : "red"
                  }
                >
                  {status}
                </span>
              </p>
              <button className="shipping-btn" onClick={updateHandler}>
                Process Status
              </button>
            </article>
          </>
        }
      </main>
    </div>
  );
};

const ProductCard = ({
  name,
  photo,
  price,
  quantity,
  productId,
}: orderItem) => (
  <div className="transaction-product-card">
    <img src={photo} alt={name} />
    <Link to={`/product/${productId}`}>{name}</Link>
    <span>
      ₹{price} X {quantity} = ₹{price * quantity}
    </span>
  </div>
);

export default TransactionManagement;
