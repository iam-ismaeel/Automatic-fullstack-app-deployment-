"use client";

import SpaceBetween from "@/components/common/SpaceBetween";
import ColorTable from "@/components/pages/seller-dashboard/color/ColorTable";
import { PlusFilledIcon } from "@/components/svg/seller/icons";
import { useRouter } from "next/navigation";
import { Button } from "rizzui";

const Page = () => {
  const router = useRouter();
  return (
    <div className="w-full">
      <SpaceBetween>
        <p className="text-[#212529] font-medium text-[24px] ">Color List</p>
        <Button
          onClick={() => {
            router.push("color/add");
          }}
          className="bg-main gap-2 text-white translate-x-4"
        >
          <PlusFilledIcon />
          Create New
        </Button>
      </SpaceBetween>
      <ColorTable />
    </div>
  );
};

export default Page;
