"use client";
import { useProfileQuery } from "@/api/user";
import { showsuccess } from "@/utils/showPopup";
import useAuthStore from "@/zustand/authStore";
import React, { Fragment, useState } from "react";
import SummaryCard from "../SummaryCard";
import { IonIcon } from "@ionic/react";
import { copyOutline } from "ionicons/icons";
import ShareButton from "@/components/common/share-button";
import { Loader } from "rizzui";
import { useGetReferralsQuery } from "@/api/affiliate";
import ReferralTable from "./ReferralTable";
import { Referrals } from "@/interfaces/affiliate";

const ReferralManagementPage = () => {
  const { userData } = useAuthStore();
  const userId = String(userData?.user_id);

  const { data: referrals = [], isLoading } = useGetReferralsQuery(userId);

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
        <h1 className="text-2xl text-[#000000] font-bold mb-4">
          Referral Management
        </h1>
        <SummaryCard
          data={referrals}
          isLoading={isLoading}
          userCurrency={userCurrency}
          isReferralManagement
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          {user_profile?.referrer_link.map((referrer_link, i) => (
            <Fragment key={i}>
              <div className="flex md:flex-col-reverse gap-5 md:gap-3 items-center">
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

      <ReferralTable data={referrals as Referrals} isLoading={isLoading} />
    </div>
  );
};

export default ReferralManagementPage;
