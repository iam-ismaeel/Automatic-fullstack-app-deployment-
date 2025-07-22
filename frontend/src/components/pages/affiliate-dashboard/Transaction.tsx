"use client";
import React, { useState } from "react";
import { useGetTransactionsQuery } from "@/api/affiliate";
import useAuthStore from "@/zustand/authStore";
import TransactionTable from "./transaction/TransactionTable";

const Transaction = () => {
  const { userData } = useAuthStore();

  const userId = String(userData?.user_id);

  return (
    <div className="">
      <h1 className="text-xl text-[#49454F] font-bold my-4">
        Transaction History
      </h1>

      <TransactionTable userId={userId} />
    </div>
  );
};

export default Transaction;
