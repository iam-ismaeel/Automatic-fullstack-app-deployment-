"use client";

import AccountDefaultSettings from "@/components/pages/b2b-seller/account-data/AccountDefaultSettings";
import AccountInformation from "@/components/pages/b2b-seller/account-data/AccountInformation";
import EditAccountInformation from "@/components/pages/b2b-seller/account-data/EditAccountInformation";
import { useState } from "react";

const AccountDataPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div>
      <p className="text-[#23272E] text-[14px] font-bold">Account Data</p>
      <div className="mt-24 grid gap-4 slg:grid-cols-1 grid-cols-2">
        {isEdit ? (
          <EditAccountInformation onCancel={() => setIsEdit(false)} />
        ) : (
          <AccountInformation onEdit={() => setIsEdit(true)} />
        )}

        <AccountDefaultSettings />
      </div>
    </div>
  );
};

export default AccountDataPage;
