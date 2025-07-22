"use client";
import { useGetTransactionsQuery } from "@/api/affiliate";
import useAuthStore from "@/zustand/authStore";
import { useState } from "react";
import TransactionTable from "./TransactionTable";

export default function Home() {
  const { userData } = useAuthStore();

  const userId = String(userData?.user_id);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl text-[#49454F] font-bold mb-4">
        Transaction History
      </h1>

      <TransactionTable userId={userId} />
    </div>
  );
}
