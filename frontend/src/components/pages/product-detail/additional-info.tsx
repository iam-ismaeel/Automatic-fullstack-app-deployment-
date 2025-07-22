import React from "react";
import { productHome } from "@interfaces/products";

const AdditionalInfo = ({
  productDetails,
}: {
  productDetails: productHome | undefined;
}) => {
  return (
    <div>
      <dl className="flex flex-col gap-y-2">
        {productDetails?.size !== "" && (
          <div className="flex items-center gap-x-2">
            <dt className="text-base-regular text-black">Size:</dt>
            <dd className="text-base-regular text-[#707070]">
              {productDetails?.size}
            </dd>
          </div>
        )}
        {productDetails?.brand !== "" && (
          <div className="flex items-center gap-x-2">
            <dt className="text-base-regular text-black">Brand:</dt>
            <dd className="text-base-regular text-[#707070]">
              {productDetails?.brand}
            </dd>
          </div>
        )}
        {productDetails?.color !== "" && (
          <div className="flex items-center gap-x-2">
            <dt className="text-base-regular text-black">Colors:</dt>
            <dd className="text-base-regular text-[#707070]">
              {productDetails?.color}
            </dd>
          </div>
        )}
        {productDetails?.unit !== "" && (
          <div className="flex items-center gap-x-2">
            <dt className="text-base-regular text-black">Unit:</dt>
            <dd className="text-base-regular text-[#707070]">
              {productDetails?.unit}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
};

export default AdditionalInfo;
