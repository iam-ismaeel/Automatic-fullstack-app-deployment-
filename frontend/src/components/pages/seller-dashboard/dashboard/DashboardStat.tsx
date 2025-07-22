import {
  CompletedSalesIcon,
  TotalBrandsIcon,
  TotalOrdersIcon,
  TotalProductsIcon,
} from "@/components/svg/seller/icons";
import { IDashboardAnalytics } from "@/interfaces/seller";

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
        <div
          style={{ backgroundColor: stat.color }}
          className="text-white overflow-hidden p-6 rounded-md relative flex flex-col justify-between"
          key={i}
        >
          <div className="absolute bottom-0 left-0 -translate-x-1/2 bg-white opacity-5 size-[250px] rounded-full"></div>
          <div>
            <p className="text-[28px] font-bold">{stat.value}</p>
            <p className="text-[18px] font-[400]">{stat.label}</p>
          </div>
          <div className="flex justify-end mt-1">
            <stat.Icon className="size-[30px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStat;
