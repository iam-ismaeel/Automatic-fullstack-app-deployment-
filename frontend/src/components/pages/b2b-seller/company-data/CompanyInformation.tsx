import Flex from "@/components/common/Flex";
import SpaceBetween from "@/components/common/SpaceBetween";
import { PencilIcon } from "@/components/svg/seller/icons";
import React from "react";
import { Button } from "rizzui";

const CompanyInformation = ({ onEdit }: { onEdit: () => void }) => {
  return (
    <div>
      <SpaceBetween className="mb-8 flex-wrap">
        <p className="text-[#0C0C0C] text-[32px] font-bold">
          Company Information
        </p>
        <Button
          onClick={onEdit}
          variant="flat"
          className="gap-2 !py-0 h-fit text-[#0F60FF]"
        >
          <PencilIcon />
          <p>Edit</p>
        </Button>
      </SpaceBetween>
      <div className="flex flex-col text-[#0C0C0C] gap-6">
        <p>Company Name: JKT Company</p>
        <p>Tax ID: 87678986767</p>
        <p>Address: 177 Kent, lorem, Ippsum</p>
        <p>Company Phone: +48 876 989 667</p>
      </div>
    </div>
  );
};

export default CompanyInformation;
