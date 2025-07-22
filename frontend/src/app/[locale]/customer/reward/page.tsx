import { Breadcrumb } from "@/components/common/breadcrumb";
import RewardDashboard from "@components/pages/customer/reward";
const breadcrumbItems = [{ label: "Reward Points" }];

const Page = () => {
  return (
    <div className="py-6">
      <Breadcrumb items={breadcrumbItems} />
      <RewardDashboard />
    </div>
  );
};

export default Page;
