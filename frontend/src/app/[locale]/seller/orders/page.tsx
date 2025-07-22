import { Breadcrumb } from "@/components/common/breadcrumb";
import OrdersTable from "@/components/pages/seller-dashboard/orders/OrdersTable";
import React from "react";

const breadcrumbItems = [{ label: "Order History" }];

const Page = () => {
  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <OrdersTable />
    </div>
  );
};

export default Page;
