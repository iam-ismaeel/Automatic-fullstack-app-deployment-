"use client";
import { useGetOrdersQuery } from "@/api/product";
import { renderStatusBadge } from "@/components/common/custom-badge";
import { CustomTable } from "@/components/common/custom-table";
import EmptyData from "@/components/common/empty-data";
import Flex from "@/components/common/Flex";
import TableSkeleton from "@/components/common/TableSkeleton";
import { EyeIcon } from "@/components/svg/seller/icons";
import { Pagination } from "@/interfaces/table";
import { countryToCurrencyMap } from "@/utils/currencymapper";
import { formatPrice } from "@/utils/formatPrice";
import useAuthStore from "@/zustand/authStore";
import { formatDate } from "date-fns";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Table } from "rizzui";

const tableHeadings = [
  "#",
  "Order ID",
  "Order Date",
  "Customer",
  "Total Amount",
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

const OrdersTable = () => {
  const localActive = useLocale();
  const [currentPage, setCurrentPage] = useState(1);

  const { userData } = useAuthStore();
  const userCurrency = userData?.data?.default_currency!;

  const searchParams = useSearchParams(); // If using Next.js
  const statusFilter = searchParams.get("status");

  // Create a combined query object that includes both status and page
  const queryParams = {
    page: currentPage,
    status: statusFilter!,
  };

  const { data, isLoading: fetchingOrders } = useGetOrdersQuery(queryParams);
  const ordersList: any[] = data?.data || {};
  const pagination_data = data?.pagination as Pagination;

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
    <div className="flex flex-col gap-6 rounded-lg border mt-6 p-4 bg-white">
      <p className="text-[#334257] text-[14px] font-semibold">Orders Summary</p>

      {fetchingOrders ? (
        <TableSkeleton />
      ) : ordersList?.length === 0 ? (
        <EmptyData />
      ) : (
        <>
          <CustomTable
            TableHeadComponent={<TableHeadChildren />}
            currentPage={pagination_data?.current_page}
            totalPages={pagination_data?.last_page}
            paginationEvents={paginationEvents}
          >
            {ordersList?.map((order, i) => (
              <Table.Row
                className="hover:cursor-pointer text-xs text-[#182433] h-[52px]"
                key={i}
              >
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell className="whitespace-nowrap">
                  {order.order_no}
                </Table.Cell>
                <Table.Cell className="!text-sm">
                  {formatDate(order.order_date, "yyyy-MM-dd")}
                </Table.Cell>
                <Table.Cell className="!text-sm">{order.customer}</Table.Cell>
                <Table.Cell className="!text-sm">
                  {countryToCurrencyMap(userCurrency!)}
                  {formatPrice(order.total_amount)}
                </Table.Cell>
                <Table.Cell className="!text-sm">
                  {renderStatusBadge[order.status]}
                </Table.Cell>
                <Table.Cell role="sr-only">
                  <Flex className="text-main">
                    <Link
                      href={`/${localActive}/seller/orders/${order.id}`}
                      className="size-[32px] border cursor-pointer flex justify-center items-center rounded-full"
                    >
                      <EyeIcon className="cursor-pointer text-[#6C757D]" />
                    </Link>
                    {/* <div className="size-[32px] border flex justify-center items-center  cursor-pointer rounded-full">
                      <DownloadIcon />
                    </div> */}
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </CustomTable>
        </>
      )}
    </div>
  );
};

export default OrdersTable;
