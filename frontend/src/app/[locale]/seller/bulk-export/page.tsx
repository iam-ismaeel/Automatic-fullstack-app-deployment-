import { Breadcrumb } from "@/components/common/breadcrumb";
import BulkProductExport from "@/components/pages/seller-dashboard/bulk-import/BulkProductExport";

const breadcrumbItems = [{ label: "Bulk Product Export" }];

const Page = () => {
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <BulkProductExport />
    </>
  );
};

export default Page;
