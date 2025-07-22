"use client";
import { useGetWishListQuery } from "@/api/customer";
import { renderStatusBadge } from "@/components/common/custom-badge";
import { CustomTable } from "@/components/common/custom-table";
import EmptyData from "@/components/common/empty-data";
import Flex from "@/components/common/Flex";
import SpaceBetween from "@/components/common/SpaceBetween";
import TableSkeleton from "@/components/common/TableSkeleton";
import { SearchIcon } from "@/components/svg";
import {
  EyeIcon,
  PencilIcon,
  PlusFilledIcon,
} from "@/components/svg/seller/icons";
import { IProduct } from "@/interfaces/products";
import { Pagination } from "@/interfaces/table";
import { countryToCurrencyMap } from "@/utils/currencymapper";
import { formatPrice } from "@/utils/formatPrice";
import useAuthStore from "@/zustand/authStore";
import { useUserStore } from "@/zustand/userStore";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button, Input, Table } from "rizzui";

const tableHeadings = [
  "#",
  "Product Image",
  "Product Name",
  "Category",
  "Price",
  "Action",
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

const WishlistTable = () => {
  const router = useRouter();
  const localActive = useLocale();

  const { userData } = useAuthStore();
  const userId = String(userData?.user_id);

  const { data, isLoading } = useGetWishListQuery(userId);
  const wishlist = useMemo(() => data?.data ?? [], [data]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Initial state for total pages
  const itemsPerPage = 10;

  useEffect(() => {
    // Update totalPages whenever couponList changes
    setTotalPages(Math.ceil(wishlist.length / itemsPerPage) || 1);
  }, [wishlist]);

  // Pagination logic: Slice data for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = wishlist.slice(startIndex, startIndex + itemsPerPage);

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
        <h2 className="text-xl text-[#49454F] font-bold mb-4">Wishlists</h2>
        <Input
          placeholder="Search product"
          className="border-[#D0DBE9] w-[250px]"
          // onChange={(e) => onSearch(e.target.value)}
        />
      </SpaceBetween>

      {isLoading ? (
        <TableSkeleton />
      ) : wishlist?.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white p-6">
          <EmptyData message="Add your first wish list item" className="mt-6" />

          <p className="max-w-[500px] text-sm text-gray-500 mb-6 text-center">
            You currently do not have any saved products, browse products and
            add them to your wish list to view them here.
          </p>

          <Link href={`/${localActive}`}>
            <Button className="bg-red-600 text-white rounded-md">
              <span className="text-base-regular">Browse Products</span>
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <CustomTable
            TableHeadComponent={<TableHeadChildren />}
            currentPage={currentPage}
            totalPages={totalPages}
            paginationEvents={paginationEvents}
          >
            {currentPageData?.map((product: any, i: number) => (
              <Table.Row
                className="hover:cursor-pointer text-xs text-[#182433] h-[52px]"
                key={i}
              >
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell>
                  <div className="size-[50px] overflow-hidden bg-secondary rounded-md">
                    <Image
                      src={product.product_image}
                      alt="product-pic"
                      width={120}
                      height={120}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Table.Cell>
                <Table.Cell className="!text-sm">
                  {product.product_name}
                </Table.Cell>
                <Table.Cell className="!text-sm">
                  {product.product_category}
                </Table.Cell>
                <Table.Cell className="!text-sm">
                  {countryToCurrencyMap(product.currency!)}
                  {formatPrice(product.product_price)}
                </Table.Cell>
                <Table.Cell role="sr-only">
                  <Flex className="text-main">
                    <Link href={`/${localActive}/products/${product.slug}`}>
                      <EyeIcon className="cursor-pointer" />
                    </Link>
                    {/* <Link
                      href={`/${localActive}/products/${product.id}/edit`}
                    >
                      <PencilIcon className="cursor-pointer" />
                    </Link> */}
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

export default WishlistTable;
