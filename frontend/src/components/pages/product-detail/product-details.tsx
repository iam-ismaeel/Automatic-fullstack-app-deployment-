"use client";
import React, { useState } from "react";
import Description from "./description";
import Reviews from "./reviews";
import AdditionalInfo from "./additional-info";
import Image from "next/image";

import { productHome, productModel } from "@interfaces/products";
import { useGetBestSellingProductQuery } from "@/api/bestSellingProduct";
import productplaceholder from "../../../../public/img/product-placeholder.png";
import Link from "next/link";
import { useLocale } from "next-intl";
import { formatPrice } from "@/utils/formatPrice";
import { countryToCurrencyMap } from "@/utils/currencymapper";
import EmptyData from "@/components/common/empty-data";
import Skeleton from "react-loading-skeleton";

const ProductDetails = ({
  productDetails,
  slug,
}: {
  productDetails: productHome | undefined;
  slug: string;
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const review = productDetails?.total_reviews;

  return (
    <div className="m-6 flex lg:flex-col gap-8 items-start justify-between">
      <div className="w-full max-w-[800px] xl:max-w-[750px] lg:max-w-full bg-white shadow-md rounded-md py-6 px-8 smd:px-4">
        <div className="flex items-center gap-x-5 smd:gap-x-3 smd:flex-wrap smd:gap-y-3">
          {["Description", "Additional Info", `Reviews ${review}`].map(
            (label, index) => (
              <button
                onClick={() => {
                  setActiveTab(index);
                }}
                key={index}
                className={`${
                  activeTab === index
                    ? "border-main text-main"
                    : "border-[#ECECEC] text-[#7E7E7E]"
                } border  rounded-[30px] py-3 px-6 text-base-bold smd:text-small-bold hover:text-main hover:border-main transition duration-300 ease-in-out`}
              >
                {label}
              </button>
            )
          )}
        </div>
        <div className="tab_content py-7">
          {activeTab === 0 && <Description productDetails={productDetails} />}
          {activeTab === 1 && (
            <AdditionalInfo productDetails={productDetails} />
          )}
          {activeTab === 2 && (
            <Reviews
              productid={productDetails?.id}
              reviews={productDetails?.reviews}
              name={productDetails?.name}
              slug={slug}
            />
          )}
        </div>
      </div>

      <SimilarProduct />
    </div>
  );
};

const SimilarProduct = () => {
  const { data: products, isLoading } = useGetBestSellingProductQuery();
  const localActive = useLocale();

  return (
    <div className="bg-white shadow-md py-5 px-4 rounded-md xl:w-[350px] lg:w-fit md:w-full">
      <h6 className="text-extra-large-medium">You may like</h6>
      {isLoading ? (
        <div className="mt-3 grid grid-cols-2 smd:grid-col-1 gap-3">
          <Skeleton className="h-[230px] w-[170px] xl:w-full lg:w-[170px] md:w-full" />
          <Skeleton className="h-[230px] w-[170px] xl:w-full lg:w-[170px] md:w-full" />
        </div>
      ) : products?.data ? (
        <div className="mt-3 grid grid-cols-2 2xl:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 smd:grid-cols-1 gap-x-4">
          {products?.data?.map((product: productModel, index: number) => (
            <Link
              href={`/${localActive}/product/${product.slug}`}
              className="flex items-start gap-x-3 mb-4"
              key={index}
            >
              <div className="w-[80px] h-[70px] border border-[#E0E0E0] p-[10px] flex items-center justify-center rounded-md overflow-hidden">
                <Image
                  src={
                    product.image || product.front_image || productplaceholder
                  }
                  alt="You may Like"
                  width={55}
                  height={60}
                  className="object-contain"
                />
              </div>
              <div className="max-w-[151px]">
                <h6 className="text-base-regular leading-5">{product.name}</h6>
                <label className="text-small-regular text-[#8B96A5]">
                  {countryToCurrencyMap(product.currency)}
                  {formatPrice(product.price)}
                </label>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyData className="w-[350px] xl:w-full lg:w-[350px] md:w-full" />
      )}
    </div>
  );
};
export default ProductDetails;
