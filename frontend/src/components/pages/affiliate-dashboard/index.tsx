"use client";
import React, { Fragment } from "react";
import SummaryCard from "./SummaryCard";
import { useGetDashboardAnalyticsQuery } from "@/api/affiliate";
import useAuthStore from "@/zustand/authStore";
import TransactionTable from "./transaction/TransactionTable";
import { useProfileQuery } from "@/api/user";
import { showsuccess } from "@/utils/showPopup";
import { IonIcon } from "@ionic/react";
import { copyOutline } from "ionicons/icons";
import { Loader } from "rizzui";
import ShareButton from "@/components/common/share-button";

const AffiliateDashboard: React.FC = () => {
  const { userData } = useAuthStore();
  const userId = String(userData?.user_id);

  const { data, isLoading } = useGetDashboardAnalyticsQuery(userId);

  const { data: profile, isFetching: isFetchingUser } = useProfileQuery();
  const user_profile = profile?.data;
  const userCurrency = profile?.data?.default_currency;

  const handleCopyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    showsuccess("Copied to clipboard");
  };

  return (
    <div className="flex flex-col gap-8 max-w-[100vw] overflow-hidden">
      <div>
        <h1 className="text-2xl text-[#000000] font-bold mb-4">Dashboard</h1>
        <SummaryCard
          data={data}
          isLoading={isLoading}
          userCurrency={userCurrency}
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-5 items-center">
          <p className="text-[15px] text-[#231F20]">B2C referrer code:</p>

          <div className="flex items-center gap-1">
            <p className="text-lg text-[#1DB7C2] font-medium">
              {user_profile?.referrer_code}
            </p>
            <button
              onClick={() =>
                handleCopyToClipboard(user_profile?.referrer_code!)
              }
              className="h-5"
            >
              <IonIcon icon={copyOutline} className="size-5 text-[#1DB7C2]" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {user_profile?.referrer_link.map((referrer_link, i) => (
            <Fragment key={i}>
              <div className="flex md:flex-col gap-5 md:gap-3 items-center">
                <div className="max-w-[600px] w-full flex items-center gap-3 justify-between bg-[#3636361A] rounded-2xl px-3 py-1">
                  <div className="flex smd:flex-col items-center gap-3 md:gap-2">
                    <div className="md:hidden size-4 rounded-full bg-[#1DB7C2] flex-shrink-0" />
                    <div className="flex md:flex-col gap-2 md:gap-0">
                      {referrer_link.name === "b2c"
                        ? "B2C Seller Referrer Link:"
                        : referrer_link.name === "b2b"
                        ? "B2B Seller Referrer Link:"
                        : "AgriEcom Seller Referrer Link:"}

                      {isFetchingUser ? (
                        <div className="px-4">
                          <Loader />
                        </div>
                      ) : (
                        <span className="max-w-[250px] md:max-w-[320px] smd:max-w-[200px] truncate">
                          {referrer_link.link}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopyToClipboard(referrer_link.link!)}
                    className="h-5"
                  >
                    <IonIcon
                      icon={copyOutline}
                      className="size-5 text-[#1DB7C2]"
                    />
                  </button>
                </div>

                <div className="md:self-end">
                  <ShareButton
                    shareUrl={referrer_link.link!}
                    content="Share this link"
                  />
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-xl text-[#49454F] font-bold">
          Transaction History
        </h1>
        <TransactionTable userId={userId} isDashboard />
      </div>
    </div>
  );
};

export default AffiliateDashboard;
