import AddProductForm from "@/components/pages/seller-dashboard/products/add/AddProductForm";
import React from "react";

const page = () => {
  return (
    <div className="w-full">
      <p className="text-[#212529] font-medium text-[20px] mb-10">
        Add New Product
      </p>
      <AddProductForm />
    </div>
  );
};

export default page;
