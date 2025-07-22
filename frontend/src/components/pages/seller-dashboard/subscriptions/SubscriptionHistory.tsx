import { useGetSubscriptionHistoryQuery } from "@/api/seller";
import { renderStatusBadge } from "@/components/common/custom-badge";
import { CustomTable } from "@/components/common/custom-table";
import EmptyData from "@/components/common/empty-data";
import SpaceBetween from "@/components/common/SpaceBetween";
import TableSkeleton from "@/components/common/TableSkeleton";
import { format } from "date-fns";
import React, { useEffect, useMemo, useState } from "react";
import { Badge, Table } from "rizzui";

const tableHeadings = [
  "#",
  "Start Date",
  "End Date",
  "Subscription Plan",
  "Status",
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

const SubscriptionHistory = () => {
  const { data, isLoading } = useGetSubscriptionHistoryQuery();
  const history = useMemo(() => data?.data ?? [], [data]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Initial state for total pages
  const itemsPerPage = 10;

  useEffect(() => {
    // Update totalPages whenever couponList changes
    setTotalPages(Math.ceil(history.length / itemsPerPage) || 1);
  }, [history]);

  // Pagination logic: Slice data for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = history.slice(startIndex, startIndex + itemsPerPage);

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
    <div className="flex flex-col gap-6 rounded-lg border mt-16 bg-white p-6">
      <SpaceBetween className="flex-wrap">
        <h2 className="text-xl text-[#49454F] font-bold mb-4">
          Billing History
        </h2>
        {/* <Input
          placeholder="Search name or email"
          className="border-[#D0DBE9] w-[250px]"
          // onChange={(e) => onSearch(e.target.value)}
        /> */}
      </SpaceBetween>

      {isLoading ? (
        <TableSkeleton />
      ) : history.length === 0 ? (
        <EmptyData />
      ) : (
        <>
          <CustomTable
            TableHeadComponent={<TableHeadChildren />}
            currentPage={currentPage}
            totalPages={totalPages}
            paginationEvents={paginationEvents}
          >
            {currentPageData.map((h, i) => (
              <Table.Row
                className="hover:cursor-pointer text-xs text-[#182433] h-[52px]"
                key={i}
              >
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell>{format(h.plan_start, "yyyy-MM-dd")}</Table.Cell>
                <Table.Cell className="">
                  {format(h.plan_end, "yyyy-MM-dd")}
                </Table.Cell>
                <Table.Cell className="text-[#182433] text-sm">
                  <Badge
                    className="text-[#0F60FF] bg-[#EFF4FA]"
                    variant={"solid"}
                  >
                    {h.subcription_plan}
                  </Badge>
                </Table.Cell>
                <Table.Cell className="text-[#182433] text-sm">
                  {renderStatusBadge[h.status]}
                </Table.Cell>
              </Table.Row>
            ))}
          </CustomTable>
        </>
      )}

      {/* {isPending ? (
        <CenteredFlex className="h-[100px]">
          <Loader />
        </CenteredFlex>
      ) : history.length !== 0 ? (
        <div className="overflow-x-auto grid grid-cols-1 w-full">
          <table className="table overflow-x-auto table-pin-rows">
            <thead>
              <tr className="border-b-secondary">
                {tableHeadings.map((head, i) => (
                  <td className="text-[14px] py-4" key={i}>
                    {head}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {history.map((h, i) => (
                <tr className="border-b-secondary " key={i}>
                  <td>{h.id}</td>
                  <td>{format(h.plan_start, "yyyy-MM-dd")}</td>
                  <td>{format(h.plan_end, "yyyy-MM-dd")}</td>
                  <td>
                    <Badge
                      className="text-[#0F60FF] bg-[#EFF4FA]"
                      variant={"solid"}
                    >
                      {h.subcription_plan}
                    </Badge>
                  </td>
                  <td
                    className={`${getColor(h.status)} capitalize text-center`}
                  >
                    {h.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyData />
      )} */}
    </div>
  );
};

export default SubscriptionHistory;
