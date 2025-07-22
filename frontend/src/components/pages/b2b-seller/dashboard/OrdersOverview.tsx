import Flex from "@/components/common/Flex";
import SpaceBetween from "@/components/common/SpaceBetween";
import {
  TotalColorsIcon,
  TotalSizesIcon,
  TotalUnitsIcon,
} from "@/components/svg/seller/icons";
import React from "react";

const OrdersOverview = () => {
  const analyticsList = [
    { label: "Total Colors", value: "18", Icon: TotalColorsIcon },
    { label: "Total Units", value: "104", Icon: TotalUnitsIcon },
    { label: "Total Sizes", value: "1", Icon: TotalSizesIcon },
  ];
  return (
    <div
      style={{
        boxShadow: "0px 5px 10px rgba(51, 66, 87, 0.05)",
      }}
      className="p-4 border h-fit rounded-md bg-white"
    >
      <p className="text-[14px] text-[#334257] font-semibold">
        Orders Overview
      </p>
      <div className="h-[1px] w-full my-4 border-t"></div>
      <div className="grid smd:grid-cols-1 md:grid-cols-2 slg:grid-cols-1 lg:grid-cols-2 flex flex-col gap-4">
        {analyticsList.map((a, i) => (
          <div
            className="bg-[#F1F5F9] text-[#334155] font-medium rounded-lg p-4"
            key={i}
          >
            <SpaceBetween className="gap-8">
              <Flex>
                <a.Icon />

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

export default OrdersOverview;
