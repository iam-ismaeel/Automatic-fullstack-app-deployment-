import React from "react";
import { renderStatusBadge } from "@/components/common/custom-badge";
import { CustomTable } from "@/components/common/custom-table";
import EmptyData from "@/components/common/empty-data";
import SpaceBetween from "@/components/common/SpaceBetween";
import TableSkeleton from "@/components/common/TableSkeleton";
import { Pagination } from "@/interfaces/table";
import { Badge, Table } from "rizzui";
import { formatPrice } from "@/utils/formatPrice";
import { countryToCurrencyMap } from "@/utils/currencymapper";
import useAuthStore from "@/zustand/authStore";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const tableHeadings = ["#", "Transaction Type", "Date", "Amount", "Status"];

const TableHeadChildren = () => (
  <Table.Row>
    {tableHeadings.map((head, idx) => (
      <Table.Head
        key={idx + head}
        className="h-10 text-[12px] !text-[#212529] font-semibold whitespace-nowrap"
      >
        {head}
      </Table.Head>
    ))}
  </Table.Row>
);

const WithdrawalHistory = ({
  transactions,
  onSearch = () => {},
  isLoading,
  pagination,
  paginationEvents,
}: {
  transactions: any[];
  onSearch?: (val: string) => void;
  isLoading: boolean;
  pagination: Pagination;
  paginationEvents: {
    onClickNumber: (page: number) => void;
    onNext: () => void;
    onPrevious: () => void;
  };
}) => {
  const { userData } = useAuthStore();
  const userCurrency = userData?.data?.default_currency!;

  return (
    <div className="flex flex-col gap-3 rounded-lg border mt-10 bg-white p-6">
      <SpaceBetween className="flex-wrap">
        <h2 className="text-[#334257] text-[14px] font-semibold">
          Withdrawals History
        </h2>
        {/* <Input
          placeholder="Search name or email"
          className="border-[#D0DBE9] w-[250px]"
          // onChange={(e) => onSearch(e.target.value)}
        /> */}
      </SpaceBetween>

      {isLoading ? (
        <TableSkeleton />
      ) : transactions.length === 0 ? (
        <EmptyData />
      ) : (
        <>
          <CustomTable
            TableHeadComponent={<TableHeadChildren />}
            currentPage={pagination.current_page}
            totalPages={pagination.last_page}
            paginationEvents={paginationEvents}
          >
            {transactions.map((transaction, i) => (
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
                  {countryToCurrencyMap(userCurrency)}
                  {formatPrice(transaction.amount)}
                </Table.Cell>
                <Table.Cell className="text-[#182433] !text-sm whitespace-nowrap">
                  {renderStatusBadge[transaction.status]}
                </Table.Cell>
              </Table.Row>
            ))}
          </CustomTable>
        </>
      )}
    </div>
  );
};

export default WithdrawalHistory;
