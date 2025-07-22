import Image from "next/image";
import productplaceholder from "../../../../public/img/product-placeholder.png";
import { useGetSellerCategoryQuery } from "@/api/seller";
import EmptyData from "@/components/common/empty-data";
import Skeleton from "react-loading-skeleton";

interface CategoryType {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export default function Categories({
  categories,
  isLoading,
}: {
  categories: CategoryType[];
  isLoading: boolean;
}) {
  console.log(categories, "NETWORDKAINFS");
  return (
    <div className="grid grid-cols-2 p-10 gap-10 md:grid-cols-1">
      {isLoading ? (
        ["_", "_", "_", "_"].map((v, i) => (
          <Skeleton key={i} width={"100%"} height={370} />
        ))
      ) : !categories?.length ? (
        <div className="col-span-10">
          <EmptyData />
        </div>
      ) : (
        categories?.map((category, i) => (
          <Category key={i} category={category} />
        ))
      )}
    </div>
  );
}

function Category({ category }: { category: CategoryType }) {
  return (
    <div className="border border-[#F1F5F9] rounded-[32px] p-10 w-fit justify-self-center ">
      <Image
        src={category.image || productplaceholder}
        alt="category"
        height={190}
        width={310}
        className="w-[310px] h-[190px] object-contain"
      />
      <p className="text-center text-[32px] font-medium text-[#475569]">
        {category.name}
      </p>
    </div>
  );
}
