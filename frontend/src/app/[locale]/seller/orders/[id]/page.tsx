import { Breadcrumb } from "@/components/common/breadcrumb";
import OrderDetails from "@/components/pages/seller-dashboard/orders/OrderDetails";
import React from "react";

const breadcrumbItems = [
  { label: "Order", href: "/seller/orders" },
  { label: "Order Details" },
];

const page = () => {
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <OrderDetails />
    </>
  );
};

export default page;
