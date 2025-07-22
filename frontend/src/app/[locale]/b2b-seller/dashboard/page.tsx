"use client";

import DashboardStat from "@/components/pages/b2b-seller/dashboard/DashboardStat";
import OrderAnalytics from "@/components/pages/b2b-seller/dashboard/OrderAnalytics";
import OrdersOverview from "@/components/pages/b2b-seller/dashboard/OrdersOverview";
import OrdersSummary from "@/components/pages/b2b-seller/dashboard/OrdersSummary";
import ShopWallet from "@/components/pages/b2b-seller/dashboard/ShopWallet";
import TopFavouriteProducts from "@/components/pages/b2b-seller/dashboard/TopFavouriteProducts";
import TopRatedProducts from "@/components/pages/b2b-seller/dashboard/TopRatedProducts";
import TopSellingProducts from "@/components/pages/b2b-seller/dashboard/TopSellingProducts";

const Page = () => {
  const dashboardStat = {
    cancelled_count: 10,
    completed_sales: 10,
    confirmed_count: 5,
    delivered_count: 3,
    pending_count: 21,
    processing_count: 45,
    shipped_count: 22,
    total_orders: 1000,
    total_products: 455,
  };
  return (
    <>
      <>
        <DashboardStat {...dashboardStat} />
        <OrderAnalytics {...dashboardStat} />
      </>
      <ShopWallet />
      <div className="mt-8">
        <p className="text-[#334257] font-semibold text-[14px] mb-2">
          Orders Summary
        </p>
        <div className="grid gap-4 lg:grid-cols-1 grid-cols-[1fr,auto]">
          <OrdersSummary />
          <OrdersOverview />
        </div>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-1 grid-cols-2">
        <div className="w-full">
          <TopSellingProducts topSellingProducts={[1]} />
          <TopFavouriteProducts />
        </div>
        <div className="">
          <TopRatedProducts />
        </div>
      </div>
    </>
  );
};

export default Page;
