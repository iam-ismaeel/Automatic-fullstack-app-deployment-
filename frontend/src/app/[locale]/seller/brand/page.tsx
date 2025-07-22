"use client";

import SpaceBetween from "@/components/common/SpaceBetween";
import BrandTable from "@/components/pages/seller-dashboard/brand/BrandTable";
import { PlusFilledIcon } from "@/components/svg/seller/icons";
import { useRouter } from "next/navigation";
import { Button } from "rizzui";

const Page = () => {
  const router = useRouter();
  return (
    <div className="w-full">
      <SpaceBetween>
        <p className="text-[#212529] font-medium text-[24px] ">Brand List</p>
        <Button
          onClick={() => {
            router.push("brand/add");
          }}
          className="bg-main gap-2 text-white translate-x-4"
        >
          <PlusFilledIcon />
          Create New
        </Button>
      </SpaceBetween>
      <BrandTable />
    </div>
  );
};

export default Page;
