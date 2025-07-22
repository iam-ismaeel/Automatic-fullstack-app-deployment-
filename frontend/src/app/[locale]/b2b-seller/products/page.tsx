import Overview from "@/components/pages/b2b-seller/products/Overview";
import ProductTable from "@/components/pages/b2b-seller/products/ProductTable";
import { ArrowLeft, PlusFilledIcon } from "@/components/svg/seller/icons";
import React from "react";
import { Button } from "rizzui";

const Page = () => {
  return (
    <div>
      <Button className="gap-2 mb-5" variant="flat">
        <ArrowLeft /> Products
      </Button>
      <div className="grid gap-4 lg:grid-cols-1 grid-cols-2 items-end">
        <Overview />
        <div className="w-full lg:justify-end flex justify-center">
          <Button className="text-white bg-[#BE1E2D] gap-2" variant="solid">
            <PlusFilledIcon /> Add New Product
          </Button>
        </div>
      </div>
      <ProductTable />
    </div>
  );
};

export default Page;
