"use client";
import React from "react";

import { productHome } from "@interfaces/products";

import "reactjs-popup/dist/index.css";
import ProductImages from "./ProductImages";
import ProductDescription from "./ProductDescription";
import SellerInfo from "./SellerInfo";

const ProductInfo = ({
  productDetails,
}: {
  productDetails: productHome | undefined;
}) => {
  let images: string[] = [];
  if (productDetails) {
    images = [productDetails?.front_image];
    productDetails.images.forEach((img) => images.push(img.image));
  }

  return (
    <div className="mx-6 h-[580px] xl:h-auto px-9 slg:px-5 py-6 bg-white rounded-md shadow-md grid grid-cols-3 xl:grid-cols-2 md:grid-cols-1 xl:gap-y-8 gap-x-3 ">
      <ProductImages images={images} />
      {productDetails && <ProductDescription productDetails={productDetails} />}
      {productDetails?.seller?.id && (
        <SellerInfo
          seller={productDetails?.seller}
          productid={productDetails?.id}
        />
      )}
    </div>
  );
};

export default ProductInfo;
