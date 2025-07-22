import Flex from "@/components/common/Flex";
import SpaceBetween from "@/components/common/SpaceBetween";
import {
  ChartIcon,
  ConfirmedIcon,
  PendingIcon,
  ProcessingIcon,
} from "@/components/svg/seller/icons";
import { IDashboardAnalytics } from "@/interfaces/seller";
import Image from "next/image";
import React from "react";

const OrderAnalytics = (stat: IDashboardAnalytics) => {
  const analyticsList = [
    { label: "Pending", value: stat.pending_count, Icon: PendingIcon },
    { label: "Confirmed", value: stat.confirmed_count, Icon: ConfirmedIcon },
    { label: "Processing", value: stat.processing_count, Icon: ProcessingIcon },
    {
      label: "Shipped",
      value: stat.shipped_count,
      Icon: "/img/shipped-icon.png",
    },
    {
      label: "Delivered",
      value: stat.delivered_count,
      Icon: "/img/delivered-icon.png",
    },
    {
      label: "Canceled",
      value: stat.cancelled_count,
      Icon: "/img/cancel-icon.png",
    },
  ];
  return (
    <div className="mt-8">
      <Flex className="text-[#334257] mb-6">
        <ChartIcon />
        <p className="text-[14px] font-semibold">Order Analytics</p>
      </Flex>

      <div className="grid smd:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid-cols-4 gap-4">
        {analyticsList.map((a, i) => (
          <div
            className="bg-[#F1F5F9] text-[#334155] font-medium rounded-lg p-4"
            key={i}
          >
            <SpaceBetween>
              <Flex>
                {typeof a.Icon === "string" ? (
                  <Image
                    src={a.Icon}
                    alt="icon"
                    width={50}
                    height={50}
                    className="size-[20px]"
                  />
                ) : (
                  <a.Icon />
                )}
                <p>{a.label}</p>
              </Flex>
              <div className="size-[50px]  rounded-full flex justify-center items-center bg-white border border-[##334155] border-[8px]">
                {a.value}
              </div>
            </SpaceBetween>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderAnalytics;
