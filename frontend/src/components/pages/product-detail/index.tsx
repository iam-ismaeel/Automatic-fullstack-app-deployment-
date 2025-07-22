"use client";
import React from "react";
import ProductInfo from "./product-info";
import ProductDetails from "./product-details";
import { useGetProductDetailQuery } from "@/api/homeProduct";
import Loader from "@components/common/loader";
import EmptyData from "@components/common/empty-data";

const ProductDetail = ({ slug }: { slug: string }) => {
  const { data: productDetail, isLoading: isProductDetailLoading } =
    useGetProductDetailQuery(slug);
  const productdetails = productDetail?.data;

  return (
    <>
      {isProductDetailLoading ? (
        <div className="pt-[150px] md:pt-[220px] lg:pb-[70px] flex items-center">
          <Loader />
        </div>
      ) : (
        <>
          {productdetails ? (
            <div className="pt-[150px] md:pt-[220px] lg:pb-[70px] bg-[#EEEEEE] ">
              <ProductInfo productDetails={productdetails} />
              <ProductDetails productDetails={productdetails} slug={slug} />
              {/* <Tabs /> */}
            </div>
          ) : (
            <div className="pt-[150px] md:pt-[220px] lg:pb-[70px] flex items-center">
              <EmptyData />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetail;
