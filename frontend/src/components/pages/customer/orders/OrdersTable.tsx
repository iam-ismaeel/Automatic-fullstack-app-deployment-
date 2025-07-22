"use client";
import Flex from "@/components/common/Flex";
import { EyeIcon } from "@/components/svg/seller/icons";
import { useGetAllOrdersQuery } from "@/api/customer";
import EmptyData from "@components/common/empty-data";
import { useState } from "react";
import { Table } from "rizzui";
import { Pagination } from "@/interfaces/table";
import { formatDate } from "date-fns";
import { renderStatusBadge } from "@/components/common/custom-badge";
import { CustomTable } from "@/components/common/custom-table";
import TableSkeleton from "@/components/common/TableSkeleton";
import { countryToCurrencyMap } from "@/utils/currencymapper";
import { formatPrice } from "@/utils/formatPrice";
import { useUserStore } from "@/zustand/userStore";
import { useLocale } from "next-intl";
import Link from "next/link";

const tableHeadings = [
  "#",
  "Order ID",
  "Date",
  "Amount",
  "Method",
  "Status",
  "Action",
];

const TableHeadChildren = () => (
  <Table.Row>
    {tableHeadings.map((head, idx) => (
      <Table.Head
        key={idx + head}
        className="h-10 text-[12px] !text-[#212529] font-semibold "
      >
        {head}
      </Table.Head>
    ))}
  </Table.Row>
);

const OrdersTable = () => {
  const localActive = useLocale();
  const [currentPage, setCurrentPage] = useState(1);

  const userStore = useUserStore();
  const userCurrency = userStore?.user.data?.default_currency;

  const queryParams = {
    page: currentPage,
  };

  const { data, isLoading: fetchingOrders } = useGetAllOrdersQuery(queryParams);
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
    <>
      <div className="rounded-lg border p-4 bg-white">
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
                  <Table.Cell>{order.order_no}</Table.Cell>
                  <Table.Cell className="!text-sm whitespace-nowrap">
                    {formatDate(order.order_date, "yyyy-MM-dd")}
                  </Table.Cell>
                  <Table.Cell className="!text-sm">
                    {countryToCurrencyMap(userCurrency!)}
                    {formatPrice(order.total_amount)}
                  </Table.Cell>
                  <Table.Cell className="!text-sm capitalize">
                    {order.payment_method}
                  </Table.Cell>
                  <Table.Cell className="!text-sm">
                    {renderStatusBadge[order.status]}
                  </Table.Cell>
                  <Table.Cell role="sr-only">
                    <Flex className="text-main">
                      <Link
                        href={`/${localActive}/customer/orders/${order.order_no}`}
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
    </>
  );
};

export default OrdersTable;
