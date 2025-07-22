import { Breadcrumb } from "@/components/common/breadcrumb";
import BulkProductImport from "@/components/pages/seller-dashboard/bulk-import/BulkProductImport";

const breadcrumbItems = [{ label: "Bulk Product Import" }];

const Page = () => {
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <BulkProductImport />
    </>
  );
};

export default Page;
