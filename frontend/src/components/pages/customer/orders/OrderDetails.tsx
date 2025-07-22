"use client";

import React, { useState } from "react";
import { Button, Loader, Table } from "rizzui";
import { OrderStatus } from "./order-tracking/OrderStepper";
import { showinfo, showsuccess } from "@/utils/showPopup";
import OrderTracking from "./order-tracking/OrderTracking";
import { CustomTable } from "@/components/common/custom-table";
import Image from "next/image";
import { formatPrice } from "@/utils/formatPrice";
import { countryToCurrencyMap } from "@/utils/currencymapper";
import { useParams } from "next/navigation";
import { useGetCustomerOrderDetailsQuery } from "@/api/customer";
import CenteredFlex from "@/components/common/CenteredFlex";
import { useUserStore } from "@/zustand/userStore";
import { renderStatusBadge } from "@/components/common/custom-badge";

const tableHeadings = [
  "#",
  "Product",
  "quantity",
  "Tracking Status",
  "Price",
  "Sub Total",
];

const TableHeadChildren = () => (
  <Table.Row>
    {tableHeadings.map((head, idx) => (
      <Table.Head
        key={idx + head}
        className="h-10 text-[12px] !text-[#212529] font-semibold whitespace-nowrap"
      >
        {head}
      </Table.Head>
    ))}
  </Table.Row>
);

const OrderDetails = () => {
  const { order_no } = useParams();

  const userStore = useUserStore();
  const userCurrency = userStore?.user.data?.default_currency;

  const { data, isLoading } = useGetCustomerOrderDetailsQuery(
    order_no as string
  );
  const order = data?.data;

  return (
    <div className="space-y-5 mb-8">
      <div className="flex justify-end">
        <Button className="bg-transparent dark:hover:bg-transparent text-guyana font-semibold">
          Leave a rating
        </Button>
      </div>

      {isLoading ? (
        <CenteredFlex>
          <Loader />
        </CenteredFlex>
      ) : (
        <>
          {order && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center smd:items-start justify-between smd:flex-col-reverse gap-4 bg-[#FDFAE7] border border-[#F7E99E] p-6 smd:p-5 smd:px-4 rounded">
                <div className="flex flex-col gap-1">
                  <p className="text-xl text-[#191C1F]">{order?.order_no}</p>
                  <p className="text-sm text-[#475156]">
                    Order Placed in {order?.order_date} at {order?.order_time}
                  </p>
                </div>

                <div className="text-[28px] text-[#0F60FF] font-semibold">
                  {countryToCurrencyMap(userCurrency!)}
                  {formatPrice(order?.total_amount)}
                </div>
              </div>

              <div className="bg-white rounded-xl py-6 smd:py-5 px-4 border shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <p className="text-sm text-[#475156]">
                    Order expected arrival{" "}
                    <span className="text-[#191C1F] font-medium">
                      {order?.order_date}
                    </span>
                  </p>
                </div>
                <OrderTracking orderStatus={order?.status} />
              </div>

              {/* <div className="mt-4 space-y-6">
                <p className="text-lg text-[#191C1F] font-medium">
                  Order Activity
                </p>

                <OrderActivity />
              </div> */}

              <div className="mt-4 space-y-3">
                <p className="text-lg text-[#191C1F] font-medium">
                  Product{" "}
                  <span className="text-[#5F6C72] font-normal">(2)</span>
                </p>

                <div className="bg-white rounded-md p-4 border shadow-md">
                  <CustomTable TableHeadComponent={<TableHeadChildren />}>
                    {order?.products.map((product, i) => (
                      <Table.Row
                        key={i}
                        className="hover:cursor-pointer text-xs text-[#182433] h-[52px]"
                      >
                        <Table.Cell className="!text-sm">{i + 1}</Table.Cell>
                        <Table.Cell className="!text-sm">
                          <div className="flex gap-5 items-center text-black whitespace-nowrap truncate">
                            <Image
                              src={product.image}
                              alt="product-pic"
                              width={50}
                              height={50}
                              className="size-12 object-cover rounded-md"
                            />
                            {product.name}
                          </div>
                        </Table.Cell>
                        <Table.Cell className="!text-sm">
                          {product.quantity}
                        </Table.Cell>
                        <Table.Cell className="!text-sm">
                          {renderStatusBadge[product.status]}
                        </Table.Cell>
                        <Table.Cell className="!text-sm">
                          {countryToCurrencyMap(userCurrency!)}
                          {formatPrice(product.price)}
                        </Table.Cell>
                        <Table.Cell className="!text-sm">
                          {countryToCurrencyMap(userCurrency!)}
                          {formatPrice(product.sub_total)}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </CustomTable>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 lg:grid-cols-2 smd:grid-cols-1 gap-8 text-[#191C1F]">
                <div className="flex flex-col gap-7 md:gap-5">
                  <p className="text-lg font-medium">Shipping Address</p>

                  <div className="text-sm space-y-3">
                    <div className="space-y-2">
                      <p className="font-medium">
                        {order.shipping_address.name}
                      </p>
                      <p className="text-[#5F6C72] max-w-[270px]">
                        {order.shipping_address.address},{" "}
                        {order.shipping_address.city},{" "}
                        {order.shipping_address.state},{" "}
                        {order.shipping_address.zip}
                      </p>
                    </div>

                    <p className="font-medium">
                      Phone Number:{" "}
                      <span className="text-[#5F6C72]">
                        {order.shipping_address.phone}
                      </span>
                    </p>
                    <p className="font-medium">
                      John Doe{" "}
                      <span className="text-[#5F6C72]">
                        {order.shipping_address.email}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-7 md:gap-5">
                  <p className="text-lg font-medium">Order Notes</p>

                  <p className="text-[#5F6C72]">Thank you!.</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrderDetails;
