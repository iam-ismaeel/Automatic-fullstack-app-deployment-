"use client";
import { useGetSubCategoriesQuery } from "@/api/product";
import EmptyData from "@/components/common/empty-data";
import Flex from "@/components/common/Flex";
import Loader from "@/components/common/loader";
import { PencilIcon } from "@/components/svg/seller/icons";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Badge, Switch } from "rizzui";

const SubCategoryTable = () => {
  const tableHeadings = [
    "SL",
    "Thumbnail",
    "Category",
    "Name",
    // "Status",
    "Action",
  ];

  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("category");
  const { data, isPending } = useGetSubCategoriesQuery(id as string);
  const subcategoryData = data?.data;
  return (
    <>
      {isPending ? (
        <Loader />
      ) : subcategoryData?.length ? (
        <div className="overflow-x-auto rounded-lg mt-6 p-6 bg-white">
          <p className="text-[14px] text-[#334257] font-semibold">
            Sub-categories
          </p>
          <div className="border overflow-x-auto grid grid-cols-1 rounded-lg mt-4">
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
                {subcategoryData?.map((s, i) => (
                  <tr className="border-b-secondary " key={i}>
                    <td>{i + 1}</td>

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
                    <td>
                      <Badge
                        className="bg-blue-600 whitespace-nowrap text-white"
                        variant="solid"
                      >
                        {categoryName ?? ""}
                      </Badge>
                    </td>
                    <td>{s.name}</td>

                    {/* <td>
                  <Switch
                    switchKnobClassName="bg-white"
                    switchClassName="bg-gray-400 peer-checked/switch:bg-main"
                    checked={s.status}
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
        </div>
      ) : (
        <EmptyData
          description={`No sub-category for this category (${categoryName}) yet`}
        />
      )}
    </>
    // )
  );
};

export default SubCategoryTable;
