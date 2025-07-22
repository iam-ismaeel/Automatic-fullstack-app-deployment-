"use client";

import { useGetOrdersQuery } from "@/api/product";
import {
  useGetDashboardAnalyticsQuery,
  useGetTopSellingProductQuery,
  useGetWithdrawalHistoryQuery,
} from "@/api/seller";
import EmptyData from "@/components/common/empty-data";
import Loader from "@/components/common/loader";
import DashboardStat from "@/components/pages/seller-dashboard/dashboard/DashboardStat";
import OrderAnalytics from "@/components/pages/seller-dashboard/dashboard/OrderAnalytics";
import OrdersSummary from "@/components/pages/seller-dashboard/dashboard/OrdersSummary";
import ShopWallet from "@/components/pages/seller-dashboard/withdrawal/ShopWallet";
import TopFavouriteProducts from "@/components/pages/seller-dashboard/dashboard/TopFavouriteProducts";
import TopRatedProducts from "@/components/pages/seller-dashboard/dashboard/TopRatedProducts";
import TopSellingProducts from "@/components/pages/seller-dashboard/dashboard/TopSellingProducts";
import React from "react";
import { Breadcrumb } from "@/components/common/breadcrumb";

const breadcrumbItems = [{ label: "Dashboard" }];

const Page = () => {
  const { data, isLoading: fetchingAnalytics } =
    useGetDashboardAnalyticsQuery();
  const { data: topSellingData, isLoading: fetchingTopSelling } =
    useGetTopSellingProductQuery();
  const { data: ordersData, isLoading: fetchingOrders } = useGetOrdersQuery();
  const { data: withdrawal, isLoading } = useGetWithdrawalHistoryQuery();
  const transaction = withdrawal?.data;

  const dashboardStat = data?.data || {};
  return (
    <>
      {fetchingAnalytics || fetchingTopSelling || fetchingOrders ? (
        <Loader />
      ) : (
        <div>
          <div className="mb-10">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          {dashboardStat ? (
            <>
              <DashboardStat {...dashboardStat} />
              <OrderAnalytics {...dashboardStat} />
            </>
          ) : (
            <EmptyData description="Dashboard analytics unavailable!" />
          )}
          <ShopWallet wallet={transaction!} />
          <div className="mt-8">
            <p className="text-[#334257] font-semibold text-[14px] mb-2">
              Orders Summary
            </p>
            <div className="">
              <OrdersSummary data={ordersData?.data} />
            </div>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-1 grid-cols-2">
            <div className="w-full">
              <TopSellingProducts topSellingProducts={topSellingData?.data} />
              <TopFavouriteProducts
                topFavouriteProducts={dashboardStat.most_favorite}
              />
            </div>
            <div className="">
              <TopRatedProducts topRatedProducts={dashboardStat.top_rated} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
