import { Breadcrumb } from "@/components/common/breadcrumb";
import WishlistPage from "@components/pages/customer/wishlist";

const Page = () => {
  const breadcrumbItems = [{ label: "Wishlist" }];
  return (
    <div className="container mx-auto py-6">
      <Breadcrumb items={breadcrumbItems} />
      <WishlistPage />
    </div>
  );
};

export default Page;
