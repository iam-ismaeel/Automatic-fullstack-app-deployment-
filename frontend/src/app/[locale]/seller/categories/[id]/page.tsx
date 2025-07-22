"use client";

import SpaceBetween from "@/components/common/SpaceBetween";
import CategoryTable from "@/components/pages/seller-dashboard/categories/CategoryTable";
import SubCategoryTable from "@/components/pages/seller-dashboard/categories/sub-category/SubCategoryTable";
import { PlusFilledIcon } from "@/components/svg/seller/icons";
import { useRouter } from "next/navigation";
import { Button } from "rizzui";

const Page = () => {
  const router = useRouter();
  return (
    <div className="w-full">
      <SpaceBetween>
        <p className="text-[#212529] font-medium text-[24px] ">
          Sub-categories
        </p>
        <Button
          onClick={() => {
            router.push("sub-category/add");
          }}
          className="bg-main gap-2 text-white translate-x-4"
        >
          <PlusFilledIcon />
          Create New
        </Button>
      </SpaceBetween>
      <SubCategoryTable />
    </div>
  );
};

export default Page;
