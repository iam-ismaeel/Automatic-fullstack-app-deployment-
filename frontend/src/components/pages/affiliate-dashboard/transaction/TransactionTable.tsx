"use client";
import React, { useEffect, useMemo, useState } from "react";
import EmptyData from "@/components/common/empty-data";
import { useGetTransactionsQuery } from "@/api/affiliate";
import SpaceBetween from "@/components/common/SpaceBetween";
import { Button, Table } from "rizzui";
import TableSkeleton from "@/components/common/TableSkeleton";
import { CustomTable } from "@/components/common/custom-table";
import { renderStatusBadge } from "@/components/common/custom-badge";
import Link from "next/link";
import { useLocale } from "next-intl";

interface TransactionTableProps {
  userId: string;
  isDashboard?: boolean;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const tableHeadings = [
  "#",
  // "Transaction Id",
  "Transaction Type",
  "Date",
  "Amount",
  "Status",
  // "Action",
];

const TableHeadChildren = () => (
  <Table.Row>
    {tableHeadings.map((head, idx) => (
      <th
        key={idx + head}
        className="h-10 !text-sm !text-[#000000] !capitalize whitespace-nowrap"
      >
        {head}
      </th>
    ))}
  </Table.Row>
);

const TransactionTable: React.FC<TransactionTableProps> = ({
  userId,
  isDashboard = false,
}) => {
  const localActive = useLocale();
  const { data, isLoading } = useGetTransactionsQuery(userId!, "");
  const transactions = useMemo(() => data?.data ?? [], [data]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Initial state for total pages
  const itemsPerPage = 10;

  useEffect(() => {
    // Update totalPages whenever transactions changes
    setTotalPages(Math.ceil(transactions.length / itemsPerPage) || 1);
  }, [transactions]);

  // Display logic:
  // - For dashboard: always show first 10 items
  // - For transaction page: paginate normally
  const displayData = isDashboard
    ? transactions.slice(0, itemsPerPage)
    : transactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginationEvents = {
    onClickNumber: handlePageChange,
    onNext: (nextPage: number) => {
      if (nextPage <= totalPages) setCurrentPage(nextPage);
    },
    onPrevious: (prevPage: number) => {
      if (prevPage >= 1) setCurrentPage(prevPage);
    },
  };

  return (
    <>
      <div className="flex flex-col gap-6 rounded-lg border mt-6 bg-white p-6">
        <SpaceBetween className="flex-wrap">
          <h2 className="text-xl text-[#49454F] font-bold">Transactions</h2>
          {isDashboard && (
            <Link href={`/${localActive}/affiliate/transactions`}>
              <Button className="bg-main gap-2 text-white">View All</Button>
            </Link>
          )}
        </SpaceBetween>

        {isLoading ? (
          <TableSkeleton />
        ) : transactions.length === 0 ? (
          <EmptyData />
        ) : (
          <>
            <CustomTable
              TableHeadComponent={<TableHeadChildren />}
              currentPage={isDashboard ? undefined : currentPage}
              totalPages={isDashboard ? undefined : totalPages}
              paginationEvents={isDashboard ? undefined : paginationEvents}
            >
              {displayData.map((transaction, i) => (
                <Table.Row
                  className="hover:cursor-pointer text-xs text-[#182433] h-[52px]"
                  key={i}
                >
                  <Table.Cell>{i + 1}</Table.Cell>
                  <Table.Cell className="capitalize text-[#182433] !text-sm whitespace-nowrap">
                    {transaction.type}
                  </Table.Cell>
                  <Table.Cell className="text-[#182433] !text-sm whitespace-nowrap">
                    {formatDate(transaction.date)}
                  </Table.Cell>
                  <Table.Cell className="text-[#182433] !text-sm whitespace-nowrap">
                    {transaction.amount}
                  </Table.Cell>
                  <Table.Cell className="text-[#182433] !text-sm whitespace-nowrap">
                    {renderStatusBadge[transaction.status]}
                  </Table.Cell>
                  {/* <Table.Cell></Table.Cell> */}
                </Table.Row>
              ))}
            </CustomTable>
          </>
        )}
      </div>
    </>
  );
};

export default TransactionTable;
