import React from "react";
import { productHome } from "@interfaces/products";

const Description = ({
  productDetails,
}: {
  productDetails: productHome | undefined;
}) => {
  if (!productDetails?.description) {
    return null;
  }
  return (
    <div className=" max-w-[775px]">
      <div
        className="text-base-regular text-[#7E7E7E] leading-6"
        dangerouslySetInnerHTML={{ __html: productDetails?.description }}
      />
    </div>
  );
};

export default Description;
