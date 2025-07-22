import { Breadcrumb } from "@/components/common/breadcrumb";
import OrderDetails from "@/components/pages/customer/orders/OrderDetails";
import React from "react";

const breadcrumbItems = [{ label: "Order" }, { label: "Order Details" }];

const page = () => {
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <OrderDetails />
    </>
  );
};

export default page;
