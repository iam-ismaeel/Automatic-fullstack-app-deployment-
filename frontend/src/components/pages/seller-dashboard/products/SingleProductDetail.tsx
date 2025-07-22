"use client";

import { useGetSingleProductQuery } from "@/api/product";
import { renderStatusBadge } from "@/components/common/custom-badge";
import EmptyData from "@/components/common/empty-data";
import Flex from "@/components/common/Flex";
import Loader from "@/components/common/loader";
import SpaceBetween from "@/components/common/SpaceBetween";
import { PencilIcon } from "@/components/svg/seller/icons";
import useAuthStore from "@/zustand/authStore";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "rizzui";

const SingleProductDetail = () => {
  const { id } = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const localActive = useLocale();
  const {
    userData: { user_id },
  } = useAuthStore();
  const { data, isLoading } = useGetSingleProductQuery(
    id as string,
    user_id as string
  );
  const productDetail = data?.data;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {productDetail ? (
            <div
              style={{
                boxShadow: "0px 5px 10px rgba(51, 66, 87, 0.05)",
              }}
              className="p-4 border  rounded-md bg-white"
            >
              <div className="flex lg:flex-col justify-between items-start gap-y-4 gap-x-16">
                <Flex className="smd:flex-col gap-4 !items-start">
                  <div className="!size-[150px] flex justify-center items-center rounded-md border">
                    <Image
                      alt="seller-picture"
                      src={productDetail.front_image}
                      width={200}
                      height={200}
                      className="size-[110px] object-cover"
                    />
                  </div>

                  <div className="flex w-fit flex-col gap-2">
                    <p className="text-[24px] font-medium text-[#212529]">
                      {productDetail.name}
                    </p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: productDetail.description,
                      }}
                      className="text-[#212529] text-[14px]"
                    ></div>
                    <Flex>
                      <Button
                        variant="outline"
                        onClick={() =>
                          router.push(
                            `/${localActive}/product/${productDetail.slug}`
                          )
                        }
                      >
                        View Live
                      </Button>
                      <Button
                        onClick={() => {
                          router.push(`${pathname}/edit`);
                        }}
                        className="bg-main gap-2 text-white "
                      >
                        <PencilIcon />
                        Edit
                      </Button>
                    </Flex>
                  </div>
                </Flex>

                <div>
                  <Flex className="xsm:!gap-2 gap-4 border px-4 py-2 rounded-md">
                    <p className="whitespace-nowrap">
                      {productDetail.order_count} Orders
                    </p>
                    <p className="flex items-center gap-1">
                      ⭐{" "}
                      <span className="pt-[1px]">{productDetail.rating}</span>
                    </p>
                    <p></p>
                    <p className="whitespace-nowrap">
                      {productDetail.review_count} Reviews
                    </p>
                  </Flex>
                  <Flex className="mt-4">
                    <p>Status:</p>
                    {renderStatusBadge[productDetail.status]}
                  </Flex>
                </div>
              </div>

              <div className="grid slg:grid-cols-1 lg:grid-cols-2 grid-cols-3 gap-8 mt-6">
                <div>
                  <p className="font-semibold pb-2 border-b mb-4">
                    General Information
                  </p>

                  <SpaceBetween className="border-b pb-2 mb-4 text-[14px]">
                    <p>Brand</p>
                    <p className="font-semibold">{productDetail.brand}</p>
                  </SpaceBetween>
                  <SpaceBetween className="border-b pb-2 mb-4 text-[14px]">
                    <p>Category</p>
                    <p className="font-semibold">
                      {productDetail.category.category_name}
                    </p>
                  </SpaceBetween>
                  <SpaceBetween className="border-b pb-2 mb-4 text-[14px]">
                    <p>Colors</p>
                    <p className="font-semibold">{productDetail.color}</p>
                  </SpaceBetween>
                </div>
                <div>
                  <p className="font-semibold pb-2 border-b mb-4">
                    Price Information
                  </p>

                  <SpaceBetween className="border-b pb-2 mb-4 text-[14px]">
                    <p>Price</p>
                    <p className="font-semibold">
                      {productDetail.currency}
                      {productDetail.price}
                    </p>
                  </SpaceBetween>
                  <SpaceBetween className="border-b pb-2 mb-4 text-[14px]">
                    <p>Discount Price</p>
                    <p className="font-semibold">
                      {productDetail.currency}
                      {productDetail.discount_price}
                    </p>
                  </SpaceBetween>
                </div>
                {/* <div>
              <p className="font-semibold pb-2 border-b mb-4">Tags</p>

              <SpaceBetween className="border-b pb-2 mb-4 text-[14px]">
                <p>Secret Covered in Sand Comic book pdf , comic , book</p>
              </SpaceBetween>
            </div> */}
              </div>

              <div className="mt-8">
                <p className="font-semibold mb-4">Description</p>

                <div
                  dangerouslySetInnerHTML={{
                    __html: productDetail.description,
                  }}
                  className="tetx-[#212529] text-[14px]"
                ></div>
              </div>
            </div>
          ) : (
            <EmptyData />
          )}
        </>
      )}
    </>
  );
};

export default SingleProductDetail;
