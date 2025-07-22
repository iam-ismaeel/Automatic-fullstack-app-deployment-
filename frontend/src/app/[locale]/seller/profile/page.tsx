import { Breadcrumb } from "@/components/common/breadcrumb";
import SellerProfile from "@/components/pages/seller-dashboard/profile/profile";

const breadcrumbItems = [{ label: "Your Profile" }];

const Page = () => {
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <SellerProfile />
    </>
  );
};

export default Page;
