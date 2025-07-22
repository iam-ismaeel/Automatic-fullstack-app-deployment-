"use client";

import { useSellerProductsQuery } from "@/api/product";
import { Breadcrumb } from "@/components/common/breadcrumb";
import Loader from "@/components/common/loader";
import ProductFilter from "@/components/pages/seller-dashboard/products/ProductFilter";
import ProductTable from "@/components/pages/seller-dashboard/products/ProductTable";
import { IProduct } from "@/interfaces/products";
import { Pagination } from "@/interfaces/table";
import useAuthStore from "@/zustand/authStore";
import { useEffect, useState } from "react";

const breadcrumbItems = [{ label: "Product List" }];

const ProductPage = () => {
  const { userData } = useAuthStore();
  const [queryParams, setQueryParams] = useState({}); // Initialize as empty object instead of undefined
  const [searchVal, setSearchval] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Create a combined query object that includes both filter params and page
  const combinedParams = {
    ...queryParams,
    page: currentPage,
  };

  const { data, isLoading, refetch } = useSellerProductsQuery({
    userId: userData?.user_id as string,
    params: combinedParams, // Pass the combined params instead of just queryParams
  });

  const productsData = data?.data;

  const filteredProducts = searchVal
    ? productsData?.filter((p) =>
        p.name.toLowerCase().includes(searchVal.toLowerCase())
      )
    : productsData;

  const pagination_data = data?.pagination as Pagination;

  useEffect(() => {
    refetch();
  }, [queryParams, currentPage, refetch]); // Added currentPage to dependencies

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
    <div className="w-full ">
      <p className="mb-8">
        <Breadcrumb items={breadcrumbItems} />
      </p>

      <ProductFilter
        onReset={(val) => setQueryParams(val)}
        onFilter={(val) => setQueryParams(val)}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <ProductTable
          onSearch={(val) => setSearchval(val)}
          productData={filteredProducts as IProduct[]}
          isLoading={isLoading}
          pagination={pagination_data}
          paginationEvents={paginationEvents}
        />
      )}
    </div>
  );
};

export default ProductPage;
