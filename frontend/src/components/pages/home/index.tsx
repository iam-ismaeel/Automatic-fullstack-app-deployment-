"use client";
import Banner from "./banner";
import Categories from "./categories";
import ProductCardFour from "@/components/common/product-card_4";
import ProductCardLg from "@/components/common/product-card_lg";
import FeaturedProduct from "./featuredProduct";
import TopDeal from "./top-deal";
import AdsSm from "@/components/common/ads-sm";
import HomeAppliance from "./home-appliance";
import TopBrand from "./top-brands";
import TopSellers from "./top-sellers";
import WhoWeAre from "./who-we-are";
import CountrySelectorNav from "@/components/common/Country-selector-Nav";
import {
  useGetBestSellingProduct,
  // useGetBestSellingProductQuery,
} from "@/api/bestSellingProduct";
import {
  useGetFeaturedProduct,
  // useGetFeaturedProductQuery,
} from "@/api/featuredProduct";
import {
  useGetPocketProduct,
  // useGetPocketProductQuery,
} from "@/api/pocketProduct";
import { productInterface, productModel } from "@interfaces/products";
import React, { Fragment, useState } from "react";

import { useGetTopBrandsQuery } from "@/api/brands";
import { Brands } from "@interfaces/brands";
import { useGetTopSellersQuery } from "@/api/topSellers";
import { TopSeller } from "@/interfaces/seller";
import { useGetProductCategory } from "@/api/homeProduct";
import { Button, Input } from "rizzui";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

const Home = () => {
  const [isRefetching, setIsRefetching] = useState(false);

  const {
    data: products,
    isLoading: isbestSellingLoading,
    refetch: refetchBestProduct,
  } = useGetBestSellingProduct();

  const { data: topBrand, isLoading: isTopBrandLoading } =
    useGetTopBrandsQuery();
  const { data: topSeller, isLoading: isTopSellerLoading } =
    useGetTopSellersQuery();

  const {
    data: featProduct,
    isLoading: isFeatLoading,
    refetch: refetchFeature,
  } = useGetFeaturedProduct();

  const {
    data: electronics,
    isLoading: isFetchingElectronics,
    refetch: refetchProductCategory,
  } = useGetProductCategory("electronics");

  const {
    data: pocketProduct,
    isLoading: isPocketLoading,
    refetch: refetchProduct,
  } = useGetPocketProduct();

  // Check if any API is still loading initially
  const isInitialLoading =
    isbestSellingLoading ||
    isTopBrandLoading ||
    isTopSellerLoading ||
    isFeatLoading ||
    isFetchingElectronics ||
    isPocketLoading;

  let bestSellingList: productModel[] = [];
  let featuredList: productInterface[] = [];
  let pocketList: productInterface[] = [];
  let topBrandList: Brands[] = [];
  let topSellerList: TopSeller[] = [];
  let homeAppliancesList: productModel[] = [];
  topBrandList = (topBrand?.data as Brands[]) || [];
  topSellerList = (topSeller?.data as TopSeller[]) || [];
  bestSellingList = (products?.data as productModel[]) || [];
  featuredList = (featProduct?.data as productInterface[]) || [];
  pocketList = (pocketProduct?.data as productInterface[]) || [];
  homeAppliancesList = (electronics?.data as productModel[]) || [];

  const isVendorAvailable =
    topSellerList.length !== 0 ||
    topBrandList.length !== 0 ||
    bestSellingList.length !== 0 ||
    featuredList.length !== 0 ||
    pocketList.length !== 0 ||
    homeAppliancesList.length !== 0;

  const refetch = async () => {
    setIsRefetching(true);
    await Promise.all([
      refetchBestProduct(),
      refetchFeature(),
      refetchProduct(),
      refetchProductCategory(),
    ]);
    setIsRefetching(false);
  };
  //Check this out

  const SkeletonLoader = () => (
    <div className="app_container mx-auto bg-white py-10 pb-16 px-3">
      <div className="grid grid-cols-3 md:grid-cols-2 smd:grid-cols-1 gap-8">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-[230px] w-full" />
        ))}
      </div>
    </div>
  );

  return (
    <div className="pt-[150px] md:pt-[220px]">
      <CountrySelectorNav refetch={refetch} />

      {isInitialLoading || isRefetching ? (
        <SkeletonLoader />
      ) : isVendorAvailable ? (
        <Fragment>
          <Banner
            data={[
              "/img/AZANY-TOP-1.jpg",
              "/img/AZANY-TOP-2.jpg",
              "/img/Azany-top-3.jpg",
              "/img/Azany-top-4.jpg",
              "/img/AZANY-TOP-5.jpg",
            ]}
          />
          <Categories />
          <div className="app_container">
            <ProductCardLg
              title="Best-selling Products"
              data={bestSellingList}
              name="best-selling"
              isLoading={isbestSellingLoading}
            />
          </div>
          <div className="app_container grid grid-cols-4  gap-y-5 gap-x-[22px] my-7">
            <FeaturedProduct
              data={featuredList}
              title="Featured Products"
              name={"featured-product"}
              isLoading={isFeatLoading}
            />

            <ProductCardFour
              data={pocketList}
              title="Shop Deals in Fashion"
              name="shop-deal"
              isLoading={isbestSellingLoading}
            />

            <ProductCardFour
              data={pocketList}
              title="Pocket Friendly Products"
              name="pocket-friendly"
              isLoading={isPocketLoading}
            />
          </div>
          <div className="app_container">
            <ProductCardLg
              title="Today's Deals"
              data={bestSellingList}
              name="today-deal"
              isLoading={false}
            />
          </div>
          <div className="app_container grid grid-cols-4 gap-x-[22px] gap-y-6 my-7">
            <TopDeal
              data={bestSellingList}
              title="Top Deal"
              name="top-deal"
              isLoading={isbestSellingLoading}
            />

            <ProductCardFour
              data={pocketList}
              title="Pocket Friendly Products"
              name="pocket-friendly"
              classNames="2xl:col-span-2"
              isLoading={isPocketLoading}
            />

            <AdsSm />
          </div>
          <div className="app_container">
            <HomeAppliance
              title="Home Appliances Under $30"
              data={homeAppliancesList}
              isLoading={isFetchingElectronics}
            />
          </div>
          <Banner
            data={[
              "/img/AZANY-BOTTOM-1.jpg",
              "/img/AZANY-BOTTOM-2.jpg",
              "/img/AZANY-BOTTOM-3.png",
              "/img/AZANY-BOTTOM-4.png",
            ]}
          />
          <div className="app_container grid grid-cols-2 gap-x-[22px] my-7 gap-y-6 ">
            <TopBrand
              title="Top Brands"
              data={topBrandList}
              name="top-brands"
            />
            <TopSellers
              title="Top Sellers"
              data={topSellerList}
              name="top-sellers"
            />
          </div>
          <WhoWeAre />
        </Fragment>
      ) : (
        <div className="max-w-[1200px] mx-auto flex flex-row md:flex-col items-center gap-10 md:gap-6 my-16 mb-20 px-8 lg:px-6 md:px-4 sm:px-2">
          <div className="max-w-[600px] xl:max-w-[520px] lg:max-w-[450px] slg:max-w-[400px] md:max-w-full flex flex-col gap-8">
            <h2 className="max-w-[570px] text-[32px] md:text-[28px] text-[#B31910] font-bold">
              No available vendors for this country at this time...
            </h2>
            <h2 className="text-[59px] md:text-[48px] text-[#0F415E] font-bold">
              All Good Things Come to Those who Wait...
            </h2>

            <div className="max-w-[500px] flex flex-col gap-2">
              <p className="text-xl md:text-lg text-black font-bold">
                Get notified when a vendor is available
              </p>
              <div className="flex border border-[#0F415E] rounded-xl overflow-hidden">
                <Input
                  inputClassName="h-full p-4 text-sm border-none ring-0 outline-none rounded-none"
                  className="w-full"
                  placeholder="Email"
                />
                <Button className="h-full w-[200px] bg-[#B31910] text-white px-6 py-[18px] border-0 rounded-s-none">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="max-w-[570px] flex-1 h-full">
            <Image
              src="/img/no_available_data_image.png"
              alt="No data available"
              width={570}
              height={570}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
