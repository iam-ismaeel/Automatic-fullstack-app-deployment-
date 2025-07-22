"use client";
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
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input, Table } from "rizzui";

const tableHeadings = [
  "#",
  "Thumbnail",
  "Product Name",
  "Price",
  "Discount Price",
  "Status",
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

const ProductTable = ({
  productData,
  onSearch = () => {},
  isLoading,
  pagination,
  paginationEvents,
}: {
  productData: IProduct[];
  onSearch?: (val: string) => void;
  isLoading: boolean;
  pagination: Pagination;
  paginationEvents: {
    onClickNumber: (page: number) => void;
    onNext: () => void;
    onPrevious: () => void;
  };
}) => {
  const router = useRouter();
  const localActive = useLocale();

  const { userData } = useAuthStore();
  const userCurrency = userData?.data?.default_currency!;

  return (
    <div className="flex flex-col gap-6 rounded-lg border mt-6 bg-white p-6">
      <SpaceBetween className="flex-wrap">
        <Input
          placeholder="Search product"
          className="border-[#D0DBE9]"
          suffix={
            <Button className="bg-main gap-2 text-white translate-x-4">
              <SearchIcon />
              Search
            </Button>
          }
          onChange={(e) => onSearch(e.target.value)}
        />
        <Button
          onClick={() => {
            router.push("products/add");
          }}
          className="bg-main gap-2 text-white "
        >
          <PlusFilledIcon />
          Create New
        </Button>
      </SpaceBetween>

      {isLoading ? (
        <TableSkeleton />
      ) : productData?.length === 0 ? (
        <EmptyData />
      ) : (
        <>
          <CustomTable
            TableHeadComponent={<TableHeadChildren />}
            currentPage={pagination.current_page}
            totalPages={pagination.last_page}
            paginationEvents={paginationEvents}
          >
            {productData?.map((product, i) => (
              <Table.Row
                className="hover:cursor-pointer text-xs text-[#182433] h-[52px]"
                key={i}
              >
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell>
                  <div className="size-[50px] overflow-hidden bg-secondary rounded-md">
                    <Image
                      src={product.front_image}
                      alt="product-pic"
                      width={120}
                      height={120}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Table.Cell>
                <Table.Cell className="!text-sm">{product.name}</Table.Cell>
                <Table.Cell className="!text-sm">
                  {countryToCurrencyMap(userCurrency!)}
                  {formatPrice(product.price)}
                </Table.Cell>
                <Table.Cell className="!text-sm">
                  {countryToCurrencyMap(userCurrency!)}
                  {formatPrice(product.discount_price || 0)}
                </Table.Cell>
                <Table.Cell className="!text-sm">
                  {renderStatusBadge[product.status]}
                </Table.Cell>
                <Table.Cell role="sr-only">
                  <Flex className="text-main">
                    <Link
                      href={`/${localActive}/seller/products/${product.id}`}
                    >
                      <EyeIcon className="cursor-pointer" />
                    </Link>
                    <Link
                      href={`/${localActive}/seller/products/${product.id}/edit`}
                    >
                      <PencilIcon className="cursor-pointer" />
                    </Link>
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

export default ProductTable;
