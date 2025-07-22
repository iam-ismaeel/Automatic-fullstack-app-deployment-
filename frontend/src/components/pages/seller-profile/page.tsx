"use client";
import CountrySelectorNav from "@/components/common/Country-selector-Nav";
import sellerbg from "../../../../public/img/sellerbg.png";
import { useState } from "react";

import ProfileBanner from "./ProfileBanner";
import Products from "./Products";
import Categories from "./Categories";
import Reviews from "./Reviews";

import {
  useGetSellerCategoryQuery,
  useGetSellerProfileDetailQuery,
  useGetSellerReviewQuery,
} from "@/api/seller";
import { CategoryType, ProductReview, SellerData } from "@/interfaces/seller";
import Product from "./Product";
import Skeleton from "react-loading-skeleton";
import EmptyData from "@/components/common/empty-data";
import Image from "next/image";

export default function SellerProfileDetails({
  sellerid,
}: {
  sellerid: string;
}) {
  const [active, setActive] = useState(0);
  const { data, isLoading } = useGetSellerProfileDetailQuery(sellerid);
  const { data: categorydata, isLoading: loadingCategory } =
    useGetSellerCategoryQuery(sellerid);
  const { data: reviewsdata, isLoading: loadingReviews } =
    useGetSellerReviewQuery(sellerid);
  const seller = data?.data as SellerData;
  const products = seller?.products;
  const categories = categorydata?.data as CategoryType[];
  const reviews = reviewsdata?.data as ProductReview;

  return (
    <div className="pt-[150px] bg-white">
      <div className="bg-[#FAF5FF]">
        <Image alt="banner" src={sellerbg} className="w-full" />

        <ProfileBanner
          active={active}
          setActive={setActive}
          details={seller}
          reviews={reviews}
          categorieslength={categories?.length || 0}
          isLoading={isLoading}
        />
      </div>

      {active == 0 && (
        <Products>
          {isLoading ? (
            ["_", "_", "_", "_"].map((v, i) => (
              <Skeleton key={i} width={"100%"} height={370} />
            ))
          ) : !products?.length ? (
            <div className="col-span-10">
              <EmptyData />
            </div>
          ) : (
            products?.map((product, i) => <Product key={i} product={product} />)
          )}
        </Products>
      )}
      {active == 1 && (
        <Categories categories={categories} isLoading={loadingCategory} />
      )}
      {active == 2 && <Reviews reviews={reviews} isLoading={loadingReviews} />}
    </div>
  );
}
