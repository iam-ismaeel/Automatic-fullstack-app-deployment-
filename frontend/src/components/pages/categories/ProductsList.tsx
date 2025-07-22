import ProductCard from "@/components/common/product-card";
import React from "react";

// <ProductCard />

function ProductsList({
  children,
  categoryId,
}: {
  children: any;
  categoryId: string;
}) {
  return (
    <div>
      <h2 className="relative underline-after-line text-center text-[32px] text-[#212529] px-5 mx-auto mt-10 mb-8 w-max max-w-full">
        Browse Products in {categoryId}
      </h2>
      <div className="grid grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 md:gap-4 mx-auto max-w-[1380px] mt-10 px-5 md:px-3 pb-10">
        {children}
      </div>
    </div>
  );
}

export default ProductsList;
