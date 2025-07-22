import {
  CategoriesIcon,
  TotalBrandsIcon,
  TotalProductsIcon,
} from "@/components/svg/seller/icons";
import DashboardCard from "../dashboard/DashboardCard";

const Overview = () => {
  const statList = [
    {
      value: 194,
      label: "Total Products",
      Icon: TotalProductsIcon,
      color: "#BE1E2D",
    },
    {
      value: 5,
      label: "Total Orders",
      Icon: TotalBrandsIcon,
      color: "#545454",
    },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-1 grid-cols-2">
      {statList.map((stat) => (
        <DashboardCard key={stat.label} {...stat} />
      ))}
    </div>
  );
};

export default Overview;
