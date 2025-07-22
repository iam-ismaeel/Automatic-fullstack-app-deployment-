import {
  CompletedSalesIcon,
  TotalBrandsIcon,
  TotalOrdersIcon,
  TotalProductsIcon,
} from "@/components/svg/seller/icons";
import { IDashboardAnalytics } from "@/interfaces/seller";
import DashboardCard from "./DashboardCard";

const DashboardStat = (stat: IDashboardAnalytics) => {
  const statList = [
    {
      value: stat.total_products,
      label: "Total Products",
      Icon: TotalProductsIcon,
      color: "#BE1E2D",
    },
    {
      value: stat.total_orders,
      label: "Total Orders",
      Icon: TotalOrdersIcon,
      color: "#0F60FF",
    },
    {
      value: stat.completed_sales,
      label: "Completed Sales",
      Icon: CompletedSalesIcon,
      color: "#007638",
    },
    {
      value: stat.total_products,
      label: "Total Brands",
      Icon: TotalBrandsIcon,
      color: "#545454",
    },
  ];
  return (
    <div className="grid gap-4 smd:grid-cols-1 xl:grid-cols-2 grid-cols-4">
      {statList.map((stat, i) => (
        <DashboardCard key={stat.label} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStat;
