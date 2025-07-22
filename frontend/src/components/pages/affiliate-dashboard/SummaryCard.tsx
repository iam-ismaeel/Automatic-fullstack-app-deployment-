import React, { Fragment } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { maskAccountNumber } from "@/utils";
import { countryToCurrencyMap } from "@/utils/currencymapper";
import Skeleton from "react-loading-skeleton";
import { IonIcon } from "@ionic/react";
import { personOutline } from "ionicons/icons";

const Card = ({
  name,
  value,
  date,
  additionalText,
  color,
  bgColor,
  data,
  isReferralManagement,
}: {
  name: string;
  value: string;
  date: string;
  additionalText?: string;
  color: string;
  bgColor: string;
  data: any;
  isReferralManagement?: boolean;
}) => {
  const localActive = useLocale();

  return (
    <div
      className={`rounded-lg p-4 shadow-sm ${bgColor} border border-gray-200 flex justify-between items-center`}
    >
      <div className="flex flex-col">
        <label className="text-gray-700 text-sm font-semibold mb-1">
          {name}
        </label>
        <h2 className={`text-2xl font-bold ${color}`}>
          {isReferralManagement && (
            <span className="text-black self-center mr-1">
              <IonIcon icon={personOutline} className="size-5" />
            </span>
          )}
          {value}
        </h2>
        {date && <p className="text-gray-500 text-xs mt-1">as of {date}</p>}
      </div>
      {additionalText && (
        <div>
          <Link
            href={`/${localActive}/affiliate/withdrawal?currentBalance=${data?.data?.current_balance}`}
            className="text-red-500 text-xs underline"
          >
            {additionalText}
          </Link>
        </div>
      )}
    </div>
  );
};

const SummaryCard = ({
  data,
  isLoading,
  userCurrency,
  isReferralManagement,
}: {
  data: any;
  isLoading: boolean;
  userCurrency?: string;
  isReferralManagement?: boolean;
}) => {
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const today = new Date();
  const formattedDate = formatDate(today);

  const summaryData = [
    {
      name: "Current Balance",
      value: `${countryToCurrencyMap(userCurrency!)}${
        data?.data?.current_balance
      }`,
      date: formattedDate,
      additionalText: "",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      name: "Pending Withdrawals",
      value: `${countryToCurrencyMap(userCurrency!)}${
        data?.data?.pending_withdrawals
      }`,
      date: formattedDate,
      additionalText: "Initiate Withdrawal",
      color: "text-[#1DB7C2]",
      bgColor: "bg-[#F3F4F6]",
    },
    {
      name: "Payment Method",
      value:
        data?.data?.payment_method !== null
          ? maskAccountNumber(data?.data?.payment_method)
          : "None",
      date: "",
      additionalText: "",
      color: "text-gray-600",
      bgColor: "bg-white",
    },
  ];

  const refferalData = [
    {
      name: "Total Referrals",
      value: `${data?.data?.total_referrals}`,
      date: formattedDate,
      additionalText: "",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      name: "Total Signed Up",
      value: `${data?.data?.total_signed_up}`,
      date: formattedDate,
      additionalText: "",
      color: "text-[#1DB7C2]",
      bgColor: "bg-[#F3F4F6]",
    },
  ];

  return (
    <Fragment>
      {isLoading ? (
        <div className="grid grid-cols-3 lg:grid-cols-2 smd:grid-cols-1 gap-4">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-[100px] w-full" />
          ))}
        </div>
      ) : isReferralManagement ? (
        <div className="grid grid-cols-3 lg:grid-cols-2 smd:grid-cols-1 gap-4">
          {refferalData.map((referral, index) => (
            <Card
              key={index}
              name={referral.name}
              value={referral.value}
              date={referral.date}
              additionalText={referral.additionalText}
              color={referral.color}
              bgColor={referral.bgColor}
              data={data}
              isReferralManagement
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 lg:grid-cols-2 smd:grid-cols-1 gap-4">
          {summaryData.map((summary, index) => (
            <Card
              key={index}
              name={summary.name}
              value={summary.value}
              date={summary.date}
              additionalText={summary.additionalText}
              color={summary.color}
              bgColor={summary.bgColor}
              data={data}
            />
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default SummaryCard;
