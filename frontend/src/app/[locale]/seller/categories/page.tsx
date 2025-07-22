"use client";

import SpaceBetween from "@/components/common/SpaceBetween";
import CategoryTable from "@/components/pages/seller-dashboard/categories/CategoryTable";
import { PlusFilledIcon } from "@/components/svg/seller/icons";
import { useRouter } from "next/navigation";
import { Button } from "rizzui";

const Page = () => {
  const router = useRouter();
  return (
    <div className="w-full">
      <SpaceBetween>
        <p className="text-[#212529] font-medium text-[24px] ">Category List</p>
        <Button
          onClick={() => {
            router.push("categories/add");
          }}
          className="bg-main gap-2 text-white translate-x-4"
        >
          <PlusFilledIcon />
          Create New
        </Button>
      </SpaceBetween>
      <CategoryTable />
    </div>
  );
};

export default Page;
