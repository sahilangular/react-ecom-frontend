import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../components/admin/TableHOC";
import { useMyOrdersQuery } from "../redux/api/orderApi";
import { customeError } from "../types/api-types";
import { initialReducer } from "../types/reducer-types";
import { rootState } from "../redux/store";

interface dataType {
  _id: string;
  _amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
}

const column: Column<dataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "AMOUNT",
    accessor: "_amount",
  },
  {
    Header: "QUANTITY",
    accessor: "quantity",
  },
  {
    Header: "DISCOUNT",
    accessor: "discount",
  },
  {
    Header: "STATUS",
    accessor: "status",
  },
  {
    Header: "ACTION",
    accessor: "action",
  },
];

const Orders = () => {
  const { user } = useSelector((state: rootState) => state.user);
  const { data, isLoading, error, isError } = useMyOrdersQuery(user?._id!);

  if (isError) toast.error((error as customeError).data.message);

  const [rows, setRow] = useState<dataType[]>([]);

  useEffect(()=>{
    if(data){
      setRow(
        data.orders.map((i)=>({
          _id:i._id,
          _amount:i.total,
          quantity:i.orderItems.length,
          discount:i.discount,
          status:(<span className={i.status === 'Processing'?'red':i.status === 'shipped'? 'green' :'purple'}>{i.status}</span>),
          action:<Link to={`/order/${i._id}`}>Manage</Link>
        }))
      )
    }
  })

  const Table = TableHOC<dataType>(
    column,
    rows,
    "dashboard-product-box",
    "Orders",
    rows.length > 6
  )();

  return (
    <div className="container">
      <h1>My orders</h1>
      {Table}
    </div>
  );
};

export default Orders;
