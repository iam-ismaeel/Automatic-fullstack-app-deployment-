import { Breadcrumb } from "@/components/common/breadcrumb";
import React from "react";

const breadcrumbItems = [{ label: "Withdrawal" }];

const WithdrawalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Breadcrumb items={breadcrumbItems} />

      {children}
    </div>
  );
};

export default WithdrawalLayout;
