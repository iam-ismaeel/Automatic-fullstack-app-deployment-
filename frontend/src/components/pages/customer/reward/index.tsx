"use client";

import React, { Fragment, useEffect, useState } from "react";
import DashboardCard from "@components/pages/customer/dashboard/DashboardCard";
import useAuthStore from "@/zustand/authStore";
import {
  useGetRewardPointsActivitiesQuery,
  useGetRewardPointsAnalyticsQuery,
} from "@/api/customer";
import ActionCard from "./ActionCard";
import RecentActivity from "./RecentActivity";
import RewardCard from "./RewardCard";
import { useLocale } from "next-intl";
import CenteredLoader from "@/components/common/centered-loader";
import CenteredFlex from "@/components/common/CenteredFlex";
import { Button, Loader } from "rizzui";
import { AlignEndHorizontal } from "lucide-react";
import RecentActivityModal from "./RecentActivityModal";
import { useUserStore } from "@/zustand/userStore";

const rewards = [
  { title: "Free shipping", points: 1000 },
  { title: "$5 discount", points: 500 },
  { title: "10% discount", points: 500 },
  { title: "$5 gift card", points: 500 },
  { title: "Free product", points: 500 },
  { title: "Custom", points: 500 },
];

const RewardDashboard: React.FC = () => {
  const localActive = useLocale();

  const { userData } = useAuthStore();
  const userId = String(userData?.user_id);

  const { user } = useUserStore();

  const rewardsData = user?.data?.rewards;

  const { data: stats, isLoading } = useGetRewardPointsAnalyticsQuery(userId);

  const { data: activities, isLoading: isLoadingActivities } =
    useGetRewardPointsActivitiesQuery(userId);

  const [previousStats, setPreviousStats] = useState({
    points_earned: 0,
    points_cleared: 0,
  });

  const [isOpen, setOpen] = useState(false);

  const calculatePercentageChange = (
    currentValue: number,
    previousValue: number
  ): string => {
    if (previousValue === 0) return "N/A";
    const change = ((currentValue - previousValue) / previousValue) * 100;
    return `${change.toFixed(2)}%`;
  };

  useEffect(() => {
    if (stats?.data) {
      setPreviousStats((prev) => ({
        points_cleared: stats.data.points_cleared ?? prev.points_cleared,
        points_earned: stats.data.points_earned ?? prev.points_earned,
      }));
    }
  }, [stats]);

  const data = [
    {
      icon: <AlignEndHorizontal className="size-5 text-[#D65D5B]" />,
      title: "Points Earned",
      value: stats?.data.points_earned ?? 0,
      percentageChange: calculatePercentageChange(
        stats?.data.points_earned ?? 0,
        previousStats.points_earned
      ),
      isPositive: stats?.data.total_orders > previousStats.points_earned,
      linkText: "View Orders",
      linkHref: "/orders",
    },
    {
      icon: <AlignEndHorizontal className="size-5 text-[#D65D5B]" />,
      title: "Points Cleared",
      value: stats?.data.points_cleared ?? 0,
      percentageChange: calculatePercentageChange(
        stats?.data.points_cleared ?? 0,
        previousStats.points_cleared
      ),
      isPositive: stats?.data.points_cleared > previousStats.points_cleared,
      linkText: "See More",
      linkHref: "/reward/#",
    },
  ];

  const action_data = [
    { description: "Create an account", icon: "", points: "", status: "" },
    { description: "", icon: "", points: "", status: "" },
  ];

  return (
    <div className="">
      {isLoading ? (
        <CenteredLoader />
      ) : (
        <Fragment>
          <div className="grid sm:grid-cols-1 grid-cols-2 gap-4 mb-8">
            {data.map((item: any, index: number) => (
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

          {/* Actions Section */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 grid-cols-4 gap-4 mb-8">
            <ActionCard
              rewards={rewardsData!}
              userRewards={user?.data?.user_rewards || []}
            />
          </div>
        </Fragment>
      )}

      {/* Recent Activities Section */}
      {isLoadingActivities ? (
        <CenteredFlex className="w-full h-[75px] bg-white border rounded-lg">
          <Loader variant="bars" className="text-main" size="xl" />
        </CenteredFlex>
      ) : (
        <div className="max-w-[850px] md:max-w-full flex flex-col gap-6 bg-white p-5 rounded-lg border mb-8">
          <h2 className="text-lg text-[#49454F] font-bold">
            Recent Activities
          </h2>

          <div className="space-y-3">
            {activities?.data
              .slice(0, 5)
              .map((activity: any, index: number) => (
                <RecentActivity key={index} {...activity} />
              ))}
          </div>

          <Button
            onClick={() => setOpen(true)}
            className="bg-transparent text-[#DD7876] dark:hover:bg-transparent p-0 underline self-end"
          >
            See all
          </Button>
        </div>
      )}

      {/* Additional Rewards Section */}
      <div>
        <h2 className="text-lg text-[#49454F] font-bold mb-4">
          Additional Rewards
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3  gap-4">
          {isLoading ? (
            <>
              {Array.from({ length: 6 }).map((_, i) => (
                <CenteredFlex
                  key={i}
                  className="w-full h-[150px] bg-white border rounded-lg"
                >
                  <Loader variant="bars" className="text-main" size="xl" />
                </CenteredFlex>
              ))}
            </>
          ) : (
            rewards.map((reward: any, index: number) => (
              <RewardCard
                key={index}
                {...reward}
                availablePoints={
                  (stats?.data.points_earned ?? 0) -
                  (stats?.data.points_cleared ?? 0)
                }
              />
            ))
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {isOpen && (
        <RecentActivityModal
          onClose={() => setOpen(false)}
          activities={activities?.data}
          // onPay={handlePay}
          // loading={loading}
        />
      )}
    </div>
  );
};

export default RewardDashboard;
