"use client";

import Flex from "@/components/common/Flex";
import { ShopWalletIcon } from "@/components/svg/seller/icons";
import React from "react";
import SpaceBetween from "@/components/common/SpaceBetween";
import Image from "next/image";
import { Button } from "rizzui";

const ShopWallet = () => {
  const walletList = [
    {
      label: "Pending Withdrawal",
      value: "$10",
    },
    {
      label: "Rejected Withdrawal",
      value: "$0",
    },
    {
      label: "Delivery Charge Collected",
      value: "$549.96",
    },
  ];
  return (
    <div className="mt-8">
      <Flex className="text-[#334257] mb-6">
        <ShopWalletIcon />
        <p className="text-[14px] font-semibold">Shop Wallet</p>
      </Flex>

      <div className="grid lg:grid-cols-1 grid-cols-[auto,1fr] gap-4">
        <div className="flex flex-col gap-2 items-center border bg-[#f9f9fb] border-[#CBD5E2] rounded-lg p-8">
          <div className="size-[100px] rounded-full flex justify-center items-center bg-[#f1f5f9]">
            <Image
              src={"/img/wallet-icon.png"}
              width={100}
              height={100}
              className="size-[80px]"
              alt={`wallet-icon`}
            />
          </div>
          <p className="text-[24px] text-[#212529] font-semibold">
            $ 381,802.03
          </p>
          <p className="text-[#64748B] font-medium">Withdrawable Balance</p>
          <Button className="bg-[#279F51] text-white">Withdraw</Button>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 slg:grid-cols-1 grid-cols-2 gap-4">
          <div className="flex flex-col gap-4 justify-between">
            {walletList.map((wallet, i) => (
              <div
                style={{ boxShadow: "0px 0px 0px 3px #F1F5F9" }}
                className="border bg-[#f9f9fb] border-[#CBD5E2] rounded-lg p-4"
                key={i}
              >
                <SpaceBetween>
                  <div className="flex-col flex">
                    <p className="text-[19px] text-[#212529] font-semibold">
                      {wallet.value}
                    </p>
                    <p className="text-[#64748B] font-medium">{wallet.label}</p>
                  </div>
                </SpaceBetween>
              </div>
            ))}
          </div>

          <div className="rounded-lg p-4 pb-24 h-fit  bg-[#279F51] text-white">
            <p className="font-semibold text-[38px]">$ 15,000</p>
            <p className="text-[#DBDADE] font-medium">Lifetime Withdrawal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopWallet;
