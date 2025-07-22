"use client";

import {
  useGetBrandsQuery,
  useGetCategoriesQuery,
  useGetColorsQuery,
} from "@/api/product";
import Flex from "@/components/common/Flex";
import SearchableDropDown from "@/components/common/searchable-dropdown";
import { useSearch } from "@/hooks/useSearch";
import { ICategory } from "@/interfaces/products";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "rizzui";

const ProductFilter = ({
  onFilter,
  onReset,
}: {
  onFilter: (val: any) => void;
  onReset: (val: any) => void;
}) => {
  const { data, isLoading: fetchingCategories } = useGetCategoriesQuery();
  const { data: brandsData, isLoading: fetchingBrands } = useGetBrandsQuery();
  const { data: colorsData, isLoading: fetchingColors } = useGetColorsQuery();

  const categories = data?.data ?? [];
  const brandsOptions = brandsData?.data ?? [];
  const colorOptions = colorsData?.data ?? [];
  const InitialQuery = {
    category: null,
    brand: null,
    color: null,
    search: "",
  };
  const { queryParams, handleSearch, resetParams, updateQueryParam } =
    useSearch(InitialQuery);

  const [resetKey, setResetKey] = useState("0"); // Add this state

  const handleReset = () => {
    resetParams();
    setResetKey((prev) => (parseInt(prev) + 1).toString()); // Update resetKey
    // router.refresh();
    onReset(InitialQuery);
  };

  return (
    <div
      style={{
        boxShadow: "0px 5px 10px rgba(51, 66, 87, 0.05)",
      }}
      className="p-6 rounded-[12px] bg-white"
    >
      <p className="font-semibold text-[#334257] text-[14px] mb-4">
        Filter Products
      </p>
      <div className="smd:px-0 px-4 grid smd:grid-cols-1 lg:grid-cols-2 grid-cols-3 gap-4">
        <div>
          <p className="text-[14px] mb-1 font-medium">Category</p>
          <SearchableDropDown
            handleSelection={(val) => updateQueryParam("category", val.id)}
            data={categories as ICategory[]}
            loading={fetchingCategories}
            className={"border-slate-500 "}
            clearSelection={true}
            placeholder="Select category"
            resetKey={resetKey}
          />
        </div>
        <div>
          <p className="text-[14px] mb-1 font-medium">Brand</p>
          <SearchableDropDown
            handleSelection={(val) => updateQueryParam("brand", val.id)}
            data={brandsOptions as ICategory[]}
            loading={fetchingBrands}
            className={"border-slate-500 "}
            clearSelection={true}
            placeholder="Select brand"
            resetKey={resetKey}
          />
        </div>
        <div>
          <p className="text-[14px] mb-1 font-medium">Color</p>
          <SearchableDropDown
            handleSelection={(val) => updateQueryParam("color", val.id)}
            data={colorOptions as ICategory[]}
            loading={fetchingColors}
            className={"border-slate-500 "}
            clearSelection={true}
            placeholder="Select color"
            resetKey={resetKey}
          />
        </div>
      </div>
      <Flex className="justify-end sm:px-0 px-4 pt-6">
        <Button onClick={handleReset} variant="outline">
          Reset
        </Button>
        <Button
          onClick={() => onFilter(queryParams)}
          className="text-white bg-main"
          variant="solid"
        >
          Filter Data
        </Button>
      </Flex>
    </div>
  );
};

export default ProductFilter;
