import {
  TotalBrandsIcon,
  TotalProductsIcon,
} from "@/components/svg/seller/icons";
import DashboardCard from "../dashboard/DashboardCard";

const Overview = () => {
  const statList = [
    {
      value: 194,
      label: "Orders",
      Icon: TotalProductsIcon,
      color: "#2A936A",
    },
    {
      value: 5,
      label: "RFQs",
      Icon: TotalBrandsIcon,
      color: "#1D4ED8",
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
