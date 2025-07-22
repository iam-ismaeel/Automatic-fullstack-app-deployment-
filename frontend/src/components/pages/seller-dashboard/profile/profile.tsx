"use client";

import { useProfileQuery } from "@/api/user";
import EmptyData from "@/components/common/empty-data";
import Flex from "@/components/common/Flex";
import Loader from "@/components/common/loader";
import SpaceBetween from "@/components/common/SpaceBetween";
import { Cart, User } from "@/components/svg";
import { PencilIcon } from "@/components/svg/seller/icons";
import { IUserData } from "@/interfaces/user";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Avatar, Button } from "rizzui";

const SellerProfile = () => {
  const { data, isLoading } = useProfileQuery();
  const userData = (data?.data as IUserData) || {};

  const router = useRouter();
  const localActive = useLocale();
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data ? (
            <div
              style={{
                boxShadow: "0px 5px 10px rgba(51, 66, 87, 0.05)",
              }}
              className="p-4 border  rounded-md bg-white"
            >
              <SpaceBetween className="!items-start">
                <Flex>
                  <Avatar
                    name={`${userData?.first_name} ${userData?.last_name}`}
                    src={`${userData?.image}`}
                    className="text-3xl text-white font-bold object-cover overflow-hidden"
                    rounded="sm"
                    customSize={120}
                  />
                  <div className="flex flex-col gap-2">
                    <p className="text-[24px] font-medium text-[#212529]">
                      {userData?.business_name || "Azany Seller"}
                    </p>
                    <Flex className="gap-4">
                      <p>⭐ 5</p>
                      <p className="text-[#DEE2E6]">|</p>
                      <p>2 Reviews</p>
                    </Flex>
                    <Button
                      variant="outline"
                      onClick={() =>
                        router.push(`/${localActive}/seller/${userData?.uuid}`)
                      }
                    >
                      View Live
                    </Button>
                  </div>
                </Flex>
                <Button
                  onClick={() =>
                    router.push(`/${localActive}/seller/profile/edit`)
                  }
                  className="bg-main gap-2 text-white "
                >
                  <PencilIcon />
                  Edit
                </Button>
              </SpaceBetween>
              <div className="grid slg:grid-cols-1 grid-cols-2 gap-6 mt-6">
                <div>
                  <Flex className="pb-2 border-b mb-4">
                    <Cart />
                    <p className="font-semibold ">Shop Information</p>
                  </Flex>
                  <SpaceBetween className="border-b pb-2 mb-4 text-[14px]">
                    <p>Name</p>
                    <p className="font-semibold">
                      {userData?.business_name || "Azany Seller"}
                    </p>
                  </SpaceBetween>
                  <SpaceBetween className="border-b pb-2 mb-4 text-[14px]">
                    <p>Total Products</p>
                    <p className="font-semibold">125</p>
                  </SpaceBetween>
                  <SpaceBetween className="border-b pb-2 mb-4 text-[14px]">
                    <p>Total Orders</p>
                    <p className="font-semibold">175</p>
                  </SpaceBetween>
                </div>
                <div>
                  <Flex className="pb-2 border-b mb-4">
                    <User />
                    <p className="font-semibold">User Information</p>
                  </Flex>
                  <SpaceBetween className="border-b pb-2 mb-4 text-[14px]">
                    <p>Full Name</p>
                    <p className="font-semibold">{`${userData.first_name} ${userData.last_name}`}</p>
                  </SpaceBetween>
                  <SpaceBetween className="border-b pb-2 mb-4 text-[14px]">
                    <p>Phone Number</p>
                    <p className="font-semibold">{userData.phone}</p>
                  </SpaceBetween>
                  <SpaceBetween className="border-b pb-2 mb-4 text-[14px]">
                    <p>Email</p>
                    <p className="font-semibold">{userData.email}</p>
                  </SpaceBetween>
                </div>
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

export default SellerProfile;
