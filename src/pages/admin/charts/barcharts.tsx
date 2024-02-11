import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Skeleton } from "../../../components/Loader";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts";
import { useBarQuery } from "../../../redux/api/dashboardApi";
import { rootState } from "../../../redux/store";
import { customeError } from "../../../types/api-types";
import { getLastMonth } from "../../../utils/feature";

const { last12Month, last6Month } = getLastMonth();

const Barcharts = () => {
  const { user } = useSelector((state: rootState) => state.user);

  const { data, isLoading, error, isError } = useBarQuery(user?._id!);

  const barChart = data?.barChart;
  if (isError) {
    const err = error as customeError;
    toast.error(err.data.message);
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <h1>Bar Charts</h1>
            <section>
              <BarChart
                data_1={barChart?.products!}
                data_2={barChart?.users!}
                title_1="Products"
                title_2="Users"
                labels={last6Month}
                bgColor_1={`hsl(260, 50%, 30%)`}
                bgColor_2={`hsl(360, 90%, 90%)`}
              />
              <h2>Top Products & Top Customers</h2>
            </section>

            <section>
              <BarChart
                horizontal={true}
                data_1={barChart?.orders!}
                data_2={[]}
                title_1="Orders"
                title_2=""
                bgColor_1={`hsl(180, 40%, 50%)`}
                bgColor_2=""
                labels={last12Month}
              />
              <h2>Orders throughout the year</h2>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Barcharts;
