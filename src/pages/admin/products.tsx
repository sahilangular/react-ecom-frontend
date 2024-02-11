import { ReactElement, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useAllProductQuery } from "../../redux/api/productApi";
import { rootState, serverUrl } from "../../redux/store";
import toast from "react-hot-toast";
import { customeError } from "../../types/api-types";
import { useSelector } from "react-redux";
import { initialReducer } from "../../types/reducer-types";
import { Skeleton } from "../../components/Loader";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];


const Products = () => {
  
  const {user} = useSelector((state:rootState)=>state.user)
  const { data, isLoading, error, isError } = useAllProductQuery(user?._id!);
  const [rows, setRows] = useState<DataType[]>([]);
  if (isError) toast.error((error as customeError).data.message);

  useEffect(()=>{
    if (data)
    setRows(
      data.products.map((i) => ({
        photo: <img src={`${serverUrl}/${i.photo}`} alt={i.name} />,
        name: i.name,
        stock: i.stock,
        price: i.price,
        action: <Link to={`/admin/product/${i._id}`}>Manage</Link>,
      }))
    );
  },[data])

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <Skeleton />:Table}</main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
