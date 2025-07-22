"use client";

import Flex from "@/components/common/Flex";
import { ShopWalletIcon } from "@/components/svg/seller/icons";
import React, { useState } from "react";
import SpaceBetween from "@/components/common/SpaceBetween";
import Image from "next/image";
import { Button } from "rizzui";
import useAuthStore from "@/zustand/authStore";
import { countryToCurrencyMap } from "@/utils/currencymapper";
import { formatPrice } from "@/utils/formatPrice";
import { IWithdrawalHistory } from "@/interfaces/seller";
import WithdrawBalanceModal from "./WithdrawBalanceModal";

const ShopWallet = ({ wallet }: { wallet: IWithdrawalHistory }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const { userData } = useAuthStore();
  const userCurrency = userData?.data?.default_currency!;

  const walletList = [
    {
      label: "Pending Withdrawal",
      value: wallet?.pending_withdrawals,
      Icon: "/img/pending-withdrawal.png",
    },
    {
      label: "Rejected Withdrawal",
      value: wallet?.rejected_withdrawals,
      Icon: "/img/rejected-withdrawal.png",
    },
    {
      label: "Total Withdrawal",
      value: wallet?.total_withdrawals,
      Icon: "/img/total-earned.png",
    },
  ];

  return (
    <div className="mt-8">
      <Flex className="text-[#334257] mb-6">
        <ShopWalletIcon />
        <p className="text-[14px] font-semibold">Shop Wallet</p>
      </Flex>
      <div className="grid grid-cols-[350px,1fr] xl:grid-cols-[320px,1fr] lg:grid-cols-1 gap-8">
        <div className="flex flex-col gap-2 items-center border bg-white border-[#CBD5E2] rounded-lg p-8">
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
            {countryToCurrencyMap(userCurrency)}
            {formatPrice(wallet?.balance)}
          </p>
          <p className="text-[#64748B] font-medium">Withdrawable Balance</p>
          <Button
            onClick={() => setModalOpen(true)}
            className="bg-[#279F51] dark:hover:bg-[#0f7733] text-white"
          >
            Withdraw
          </Button>
        </div>

        <div className="grid smd:grid-cols-1 grid-cols-2 grid-rows-3 gap-4">
          {walletList.map((wallet, i) => (
            <div
              style={{ boxShadow: "0px 0px 0px 3px #F1F5F9" }}
              className="border bg-white border-[#CBD5E2] rounded-lg p-4"
              key={i}
            >
              <SpaceBetween>
                <div className="flex-col flex">
                  <p className="text-[18px] text-[#212529] font-semibold">
                    {countryToCurrencyMap(userCurrency)}
                    {formatPrice(wallet?.value)}
                  </p>
                  <p className="text-[#64748B] font-medium">{wallet.label}</p>
                </div>
                <div className="size-[50px] rounded-full flex justify-center items-center bg-[#f1f5f9]">
                  <Image
                    src={wallet.Icon}
                    width={30}
                    height={30}
                    className="size-[30px]"
                    alt={`${wallet.label}-icon`}
                  />
                </div>
              </SpaceBetween>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <WithdrawBalanceModal
          onClose={() => setModalOpen(false)}
          currentBalance={wallet?.balance}
        />
      )}
    </div>
  );
};

export default ShopWallet;
