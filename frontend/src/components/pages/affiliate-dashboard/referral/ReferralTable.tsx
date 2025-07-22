"use client";
import React, { useEffect, useMemo, useState } from "react";
import EmptyData from "@/components/common/empty-data";
import SpaceBetween from "@/components/common/SpaceBetween";
import { Input, Table } from "rizzui";
import TableSkeleton from "@/components/common/TableSkeleton";
import { renderStatusBadge } from "@/components/common/custom-badge";
import { CustomTable } from "@/components/common/custom-table";
import { Referrals } from "@/interfaces/affiliate";

interface ReferralTableProps {
  data: Referrals;
  isLoading: boolean;
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
  "Name",
  "Phone",
  " Email Address",
  "Referral Date",
  "Status",
  "Action",
];

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

const ReferralTable: React.FC<ReferralTableProps> = ({ data, isLoading }) => {
  const referrals = useMemo(() => data?.data?.referrals ?? [], [data]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Initial state for total pages
  const itemsPerPage = 10;

  useEffect(() => {
    // Update totalPages whenever couponList changes
    setTotalPages(Math.ceil(referrals.length / itemsPerPage) || 1);
  }, [referrals]);

  // Pagination logic: Slice data for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = referrals.slice(
    startIndex,
    startIndex + itemsPerPage
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
    <div className="flex flex-col gap-6 rounded-lg border mt-6 bg-white p-6">
      <SpaceBetween className="flex-wrap">
        <h2 className="text-xl text-[#49454F] font-bold mb-4">Referrals</h2>
        <Input
          placeholder="Search name or email"
          className="border-[#D0DBE9] w-[250px]"
          // onChange={(e) => onSearch(e.target.value)}
        />
      </SpaceBetween>

      {isLoading ? (
        <TableSkeleton />
      ) : referrals.length === 0 ? (
        <EmptyData />
      ) : (
        <>
          <CustomTable
            TableHeadComponent={<TableHeadChildren />}
            currentPage={currentPage}
            totalPages={totalPages}
            paginationEvents={paginationEvents}
          >
            {currentPageData.map((referral, i) => (
              <Table.Row
                className="hover:cursor-pointer text-xs text-[#182433] h-[52px]"
                key={i}
              >
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell>{referral.name}</Table.Cell>
                <Table.Cell className="">{referral.phone}</Table.Cell>
                <Table.Cell className="text-[#182433] text-sm">
                  {referral.email}
                </Table.Cell>
                <Table.Cell className="text-[#182433] text-sm">
                  {formatDate(referral.referral_date)}
                </Table.Cell>
                <Table.Cell className="text-[#182433] text-sm">
                  {renderStatusBadge[referral.status]}
                </Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
            ))}
          </CustomTable>
        </>
      )}
    </div>
  );
};

export default ReferralTable;
