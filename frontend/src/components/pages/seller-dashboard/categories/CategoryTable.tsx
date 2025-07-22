"use client";
import { useGetCategoriesQuery } from "@/api/product";
import EmptyData from "@/components/common/empty-data";
import Flex from "@/components/common/Flex";
import Loader from "@/components/common/loader";
import { PencilIcon } from "@/components/svg/seller/icons";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const CategoryTable = () => {
  const tableHeadings = ["SL", "Thumbnail", "Name", "Action"];
  const router = useRouter();
  const pathname = usePathname();
  const { data, isPending } = useGetCategoriesQuery();
  const categoryData = data?.data || [];
  return (
    <div className="rounded-lg mt-6 p-6 bg-white">
      <p className="text-[14px] text-[#334257] font-semibold">
        Categories List
      </p>
      {isPending ? (
        <Loader />
      ) : categoryData?.length ? (
        <div className="border grid grid-cols-1 overflow-x-auto rounded-lg mt-4">
          <table className="table table-pin-rows">
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
              {categoryData.map((s, i) => (
                <tr
                  onClick={() =>
                    router.push(`${pathname}/${s.id}?category=${s.name}`)
                  }
                  className="border-b-secondary hover:bg-gray-100 hover:cursor-pointer"
                  key={i}
                >
                  <td>{s.id}</td>
                  <td>
                    <div className="size-[50px] overflow-hidden rounded-md">
                      <Image
                        width={150}
                        height={150}
                        className="w-fit object-cover"
                        alt="category-image"
                        src={s.image}
                      />
                    </div>
                  </td>
                  <td>{s.name}</td>

                  {/* <td>
                  <Switch
                    switchKnobClassName="bg-white"
                    switchClassName="bg-gray-400"
                    checked={s?.status}
                  />
                </td> */}
                  <td role="sr-only">
                    <Flex className="text-main">
                      <span>
                        <PencilIcon className="cursor-pointer" />
                      </span>
                    </Flex>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyData />
      )}
    </div>
  );
};

export default CategoryTable;
