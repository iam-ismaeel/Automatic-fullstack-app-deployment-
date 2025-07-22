"use client";
import { Breadcrumb } from "@/components/common/breadcrumb";
import DashboardCard from "@/components/pages/customer/dashboard/DashboardCard";
import { SmartPhone, User } from "@/components/svg";
import {
  AffiliatesIcon,
  AllOrdersIcon,
  CalendarIcon,
  ClipboardIcon,
  MailIcon,
  RewardsIcon,
} from "@/components/svg/seller/icons";
import React, { Fragment } from "react";
import useAuthStore from "@/zustand/authStore";
import {
  useGetAccountOverviewQuery,
  useGetDashboardAnalyticsQuery,
  useGetRecentOrdersQuery,
} from "@/api/customer";
import EmptyData from "@components/common/empty-data";
import { useLocale } from "next-intl";
import Link from "next/link";
import CenteredLoader from "@/components/common/centered-loader";
import { renderStatusBadge } from "@/components/common/custom-badge";
import { useUserStore } from "@/zustand/userStore";
import { countryToCurrencyMap } from "@/utils/currencymapper";
import { formatPrice } from "@/utils/formatPrice";
import DetailComponent from "@/components/pages/customer/dashboard/DetailComponent";

interface RootLayoutProps {
  params: {
    locale: string;
  };
}

export default function Page({
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const breadcrumbItems = [{ label: "Dashboard" }];
  const { userData } = useAuthStore();
  const userId = String(userData?.user_id);
  const localActive = useLocale();

  const userStore = useUserStore();
  const userCurrency = userStore?.user.data?.default_currency;

  const { data: stats, isLoading } = useGetDashboardAnalyticsQuery(userId);

  const { data: overview, isLoading: isOverviewLoading } =
    useGetAccountOverviewQuery(userId);

  const { data: recentOrders, isLoading: isRecentLoading } =
    useGetRecentOrdersQuery(userId);

  const calculatePercentageChange = (
    currentValue: number,
    previousValue: number
  ): string => {
    if (previousValue === 0) return "N/A";
    const change = ((currentValue - previousValue) / previousValue) * 100;
    return `${change.toFixed(2)}%`;
  };

  const data = [
    {
      icon: <AllOrdersIcon />,
      title: "Orders",
      value: stats?.data?.total_order,
      percentageChange: calculatePercentageChange(stats?.data?.total_order, 0),
      isPositive: stats?.data?.total_order,
      linkText: "View Orders",
      linkHref: "/orders",
    },
    {
      icon: <AffiliatesIcon />,
      title: "Affiliate Invites",
      value: stats?.data?.total_affiliate_invite,
      percentageChange: calculatePercentageChange(
        stats?.data?.total_affiliate_invites,
        0
      ),
      isPositive: stats?.data?.total_affiliate_invites,
    },
    {
      icon: <RewardsIcon />,
      title: "Points Earned",
      value: stats?.data?.points_earned,
      percentageChange: calculatePercentageChange(stats?.data.points_earned, 0),
      isPositive: stats?.data.points_earned,
      linkText: "See More",
      linkHref: "/reward",
    },
  ];

  return (
    <div className="py-6">
      <Breadcrumb items={breadcrumbItems} />
      {isLoading ? (
        <CenteredLoader classNames="!h-[150px] bg-white rounded-lg" />
      ) : stats?.data ? (
        <div className="grid smd:grid-cols-1 grid-cols-3  md:grid-cols-3 gap-6">
          {data.map((item, index) => (
            <DashboardCard
              key={index}
              icon={item.icon}
              title={item.title}
              value={item.value}
              isPositive={item.isPositive}
              linkText={item.linkText}
              linkHref={`/${localActive}/customer${item.linkHref}`}
              percentageChange={item.percentageChange}
            />
          ))}
        </div>
      ) : (
        <EmptyData message="Analytics data unavailable!" />
      )}

      <div className="mt-6 grid grid-cols-2 smd:grid-cols-1 gap-6">
        <div className="bg-white p-6 shadow-sm rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Account Overview
          </h3>
          {isOverviewLoading ? (
            <CenteredLoader />
          ) : overview?.data ? (
            <Fragment>
              <div className="space-y-4">
                <DetailComponent
                  text={overview?.data.uuid}
                  title="Customer ID"
                  Icon={ClipboardIcon}
                />
                <DetailComponent
                  text={overview?.data.email}
                  title="Emails"
                  Icon={MailIcon}
                />
                <DetailComponent
                  text={overview?.data.first_name}
                  title="First Name"
                  Icon={User}
                />
                <DetailComponent
                  text={overview?.data.last_name}
                  title="Last Name"
                  Icon={User}
                />
                <DetailComponent
                  text={overview?.data.phone}
                  title="Phone Number"
                  Icon={SmartPhone}
                />
                <DetailComponent
                  text={overview?.data.date_created}
                  title="Date Created"
                  Icon={CalendarIcon}
                />
              </div>
              <Link
                href={`/${localActive}/customer/profile`}
                className="text-red-500 text-sm mt-4 block text-right"
              >
                See more
              </Link>
            </Fragment>
          ) : (
            <EmptyData message="Account overview unavailable!" />
          )}
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white p-6 shadow-sm rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Recent Orders
          </h3>
          {isRecentLoading ? (
            <CenteredLoader />
          ) : recentOrders?.data.length ? (
            <Fragment>
              <ul className="space-y-4">
                {recentOrders?.data.map((order: any, index: number) => (
                  <li key={index} className="flex justify-between items-center">
                    <div className="flex items-center">
                      {order.status === "Cancelled" ? (
                        <AllOrdersIcon className="text-red-400 mr-3" />
                      ) : order.status === "Processing" ? (
                        <AllOrdersIcon className="text-yellow-400 mr-3" />
                      ) : (
                        <AllOrdersIcon className="text-green-400 mr-3" />
                      )}
                      <div>
                        <p className="text-sm text-gray-700 font-medium">
                          Order #{order.id}
                        </p>
                        <p>{renderStatusBadge[order.status]}</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-gray-800">
                      {countryToCurrencyMap(userCurrency!)}
                      {formatPrice(order.total_amount)}
                    </p>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${localActive}/customer/orders`}
                className="text-red-500 text-sm mt-4 block text-right"
              >
                See all orders
              </Link>
            </Fragment>
          ) : (
            <EmptyData message="Recent orders unavailable!" />
          )}
        </div>
      </div>
    </div>
  );
}
