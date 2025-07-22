"use client";

import SpaceBetween from "@/components/common/SpaceBetween";
import UnitTable from "@/components/pages/seller-dashboard/unit/UnitTable";
import { PlusFilledIcon } from "@/components/svg/seller/icons";
import { useRouter } from "next/navigation";
import { Button } from "rizzui";

const Page = () => {
  const router = useRouter();
  return (
    <div className="w-full bg-[#eee]">
      <SpaceBetween>
        <p className="text-[#212529] font-medium text-[24px] ">Unit List</p>
        <Button
          onClick={() => {
            router.push("unit/add");
          }}
          className="bg-main gap-2 text-white translate-x-4"
        >
          <PlusFilledIcon />
          Create New
        </Button>
      </SpaceBetween>
      <UnitTable />
    </div>
  );
};

export default Page;
