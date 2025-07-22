"use client";
import React, { useState } from "react";
import ShopWallet from "./ShopWallet";
import WithdrawalHistory from "./WithdrawalHistory";
import { useGetWithdrawalHistoryQuery } from "@/api/seller";
import { Pagination } from "@/interfaces/table";
import { Button } from "rizzui";
import Link from "next/link";
import { useLocale } from "next-intl";

const WithdrawalPage = () => {
  const localActive = useLocale();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchVal, setSearchval] = useState("");

  const { data, isLoading } = useGetWithdrawalHistoryQuery(currentPage);
  const history = data?.data;

  const pagination_data = data?.pagination as Pagination;

  const filteredTransaction = searchVal
    ? history?.transactions?.filter((p) =>
        p.name.toLowerCase().includes(searchVal.toLowerCase())
      )
    : history?.transactions;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginationEvents = {
    onClickNumber: handlePageChange,
    onNext: () => {
      if (pagination_data?.next_page_url) {
        setCurrentPage((prev) => prev + 1);
      }
    },
    onPrevious: () => {
      if (pagination_data?.prev_page_url) {
        setCurrentPage((prev) => prev - 1);
      }
    },
  };

  return (
    <div>
      <ShopWallet wallet={history!} />
      <div className="flex justify-end">
        <Link href={`/${localActive}/seller/withdrawal/payment`}>
          <Button className="bg-[#E02014] text-white">
            Add Payment Method
          </Button>
        </Link>
      </div>
      <WithdrawalHistory
        onSearch={(val) => setSearchval(val)}
        transactions={filteredTransaction!}
        isLoading={isLoading}
        pagination={pagination_data}
        paginationEvents={paginationEvents}
      />
    </div>
  );
};

export default WithdrawalPage;
