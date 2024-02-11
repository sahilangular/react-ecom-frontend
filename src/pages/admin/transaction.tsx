import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useAllordersQuery } from "../../redux/api/orderApi";
import { useSelector } from "react-redux";
import { initialReducer } from "../../types/reducer-types";
import { Skeleton } from "../../components/Loader";
import { rootState } from "../../redux/store";

interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];



const Transaction = () => {
  const {user} = useSelector((state:rootState)=>state.user)
  const {data,isLoading,isError,error} = useAllordersQuery(user?._id!)
  const [rows, setRows] = useState<DataType[]>([]);

  useEffect(()=>{
    if(data){
      setRows(
        data.orders.map((i)=>({
          user:i.user.name,
          amount:i.total,
          discount:i.discount,
          quantity:i.orderItems.length,
          status:(<span className={i.status === 'Processing' ? 'red':i.status === 'Shipped' ? "green":"purple"}>{i.status}</span>),
          action:<Link to={`/admin/transaction/${i._id}`}>Manage</Link>
        }))
      )
    }
  },[data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Transactions",
    rows.length > 6
  )();
  return (
    <div className="admin-container">
      <AdminSidebar />
     {
      isLoading ? <Skeleton />:(
        <>
         <main>{Table}</main>
        </>
      )
     }
    </div>
  );
};

export default Transaction;
