"use client";

import CompanyInformation from "@/components/pages/b2b-seller/company-data/CompanyInformation";
import EditCompanyInformation from "@/components/pages/b2b-seller/company-data/EditCompanyInformation";
import { useState } from "react";

const CompanyDataPage = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  return (
    <div>
      <p className="text-[#23272E] text-[14px] font-bold">Company Data</p>
      <div className="mt-24 max-w-[600px] mx-auto">
        {!isEdit ? (
          <CompanyInformation onEdit={() => setIsEdit(true)} />
        ) : (
          <EditCompanyInformation onCancel={() => setIsEdit(false)} />
        )}
      </div>
    </div>
  );
};

export default CompanyDataPage;
