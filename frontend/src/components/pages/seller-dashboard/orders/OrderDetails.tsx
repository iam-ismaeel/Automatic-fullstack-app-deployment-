"use client";
import { useGetOrderDetailsQuery } from "@/api/product";
import { useUpdateOrderStatus } from "@/api/seller";
import CenteredFlex from "@/components/common/CenteredFlex";
import { renderStatusBadge } from "@/components/common/custom-badge";
import { CustomTable } from "@/components/common/custom-table";
import Loader from "@/components/common/loader";
import { countryToCurrencyMap } from "@/utils/currencymapper";
import { formatPrice } from "@/utils/formatPrice";
import { showerror, showinfo, showsuccess } from "@/utils/showPopup";
import useAuthStore from "@/zustand/authStore";
import { IUserStore, useUserStore } from "@/zustand/userStore";
import useStore from "@/zustand/useStore";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, Select, Switch, Table } from "rizzui";

const tableHeadings = ["#", "Product", "quantity", "Price", "Sub Total"];

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

const options = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

interface StatusOption {
  value: string;
  label: string;
}

const OrderDetails = () => {
  const { id } = useParams();
  const {
    userData: { user_id },
  } = useAuthStore();

  const [selectedStatus, setSelectedStatus] = useState<StatusOption | null>(
    null
  );
  const [isPaid, setIsPaid] = useState(false);

  const { userData } = useAuthStore();
  const userCurrency = userData?.data?.default_currency!;

  const { data, isLoading } = useGetOrderDetailsQuery(
    id as string,
    user_id as string
  );
  const order = data?.data;

  useEffect(() => {
    if (order) {
      // Preselect the order status
      const initialStatus = options.find((opt) => opt.value === order.status);
      setSelectedStatus(initialStatus || null);

      // Set switch value based on payment status
      setIsPaid(order.payment_status === "paid");
    }
  }, [order]);

  console.log(userCurrency);

  const { mutateAsync: updateOrderStatus, isPending: isUpdatePending } =
    useUpdateOrderStatus(parseInt(user_id as string), parseInt(id as string));

  const handleUpdateStatus = async () => {
    if (!selectedStatus) {
      showinfo("Please select a status.");
      return;
    }

    try {
      await updateOrderStatus({ status: selectedStatus.value });
      showsuccess("Order status updated successfully!");
    } catch (error) {
      showerror("Failed to update order status.");
    }
  };

  return (
    <div className="space-y-6">
      {isLoading ? (
        <CenteredFlex>
          <Loader />
        </CenteredFlex>
      ) : (
        <>
          {order && (
            <div className="grid grid-cols-3 xl:grid-cols-1 gap-6">
              <div className="col-span-2 xl:col-span-1 flex flex-col gap-10 bg-white border p-5 rounded-xl shadow-lg">
                <div className="flex justify-between md:flex-col gap-6">
                  <div className="flex flex-col gap-3 text-[#212529]">
                    <p className="text-sm font-bold">
                      Order Id: {order.order_no}
                    </p>

                    <p className="text-sm">
                      {order.order_date} {order.order_time}
                    </p>
                  </div>

                  <div className="flex flex-col gap-8 items-end text-end">
                    {/* <Button className="bg-[#BE1E2D] text-white gap-x-2">
                      <ReceiptText className="" />
                      Print Invoice
                    </Button> */}

                    <div className="flex flex-col gap-3 text-sm text-[#212529] mt-4">
                      <p>Order Status: {renderStatusBadge[order.status]}</p>
                      <p>
                        Payment Status:{" "}
                        {renderStatusBadge[order.payment_status]}
                      </p>
                      <p className="capitalize">
                        Payment Method:{" "}
                        <span className="font-bold">
                          {order.payment_method}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <CustomTable TableHeadComponent={<TableHeadChildren />}>
                  {order.products.map((product, i) => (
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

                <div className="flex flex-col items-end text-end text-sm text-[#212529]">
                  <div className="max-w-[] flex flex-col gap-5">
                    {/* <div className="flex items-center justify-between gap-4">
                      <p>Product Price:</p>
                      <p>
                        {countryToCurrencyMap(userCurrency!)}
                        {formatPrice(order.product.price)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <p>Sub Total:</p>
                      <p>
                        {countryToCurrencyMap(userCurrency!)}
                        {formatPrice(order.product.sub_total)}
                      </p>
                    </div> */}
                    <div className="flex items-center justify-between gap-4 font-bold">
                      <p>Grand Total:</p>
                      <p>
                        {countryToCurrencyMap(userCurrency!)}
                        {formatPrice(order.total_amount)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6 xl:flex-row xl:flex-wrap">
                <div className="xl:max-w-[320px] sm:max-w-full w-full flex flex-col gap-5 bg-white border p-5 rounded-xl shadow-xl">
                  <h2 className="text-sm text-[#334257] font-semibold">
                    Order & Shipping Info
                  </h2>

                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-[#212529]">
                      Change Order Status
                    </p>

                    <div className="space-y-3">
                      <Select
                        placeholder="Select Status"
                        options={options}
                        value={selectedStatus}
                        onChange={setSelectedStatus}
                        dropdownClassName="bg-white"
                        selectClassName="h-[50px] border border-[#DEE2E6] px-3 py-1 rounded-md ring-0 hover:border-[#DEE2E6] focus:border-[#DEE2E6] focus:ring-0"
                        optionClassName="hover:bg-gray-100"
                      />

                      <div className="flex justify-between items-center gap-5 text-sm border border-[#DEE2E6] px-3 py-1 rounded-md">
                        <p>Payment Status</p>

                        <div className="flex items-center gap-2">
                          <span>Paid</span>
                          <Switch
                            switchKnobClassName="bg-white"
                            switchClassName="bg-gray-400"
                            checked={isPaid} // Ensure it reflects the payment status
                            onChange={() => setIsPaid((prev) => !prev)} // Optional: Allow toggling
                          />
                        </div>
                      </div>

                      <Button
                        className="bg-[#BE1E2D] mt-2 text-white"
                        disabled={isUpdatePending}
                        isLoading={isUpdatePending}
                        onClick={handleUpdateStatus}
                      >
                        Update Status
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="xl:max-w-[320px] sm:max-w-full w-full flex flex-col gap-5 bg-white border p-5 rounded-xl shadow-lg">
                  <h2 className="text-sm text-[#334257] font-semibold">
                    Shipping Address
                  </h2>

                  <div className="flex flex-col gap-3">
                    <p className="flex gap-1 items-center text-sm text-[#212529]">
                      Name:
                      <span className="font-medium">
                        {order.shipping_address.name}
                      </span>
                    </p>
                    <p className="flex gap-1 items-center text-sm text-[#212529]">
                      Phone:
                      <span className="font-medium">
                        {order.shipping_address.phone}
                      </span>
                    </p>
                    <p className="flex gap-1 items-center text-sm text-[#212529]">
                      Address:
                      <span className="font-medium">
                        {order.shipping_address.address}
                      </span>
                    </p>
                    <p className="flex gap-1 items-center text-sm text-[#212529]">
                      City:
                      <span className="font-medium">
                        {order.shipping_address.city}
                      </span>
                    </p>
                    <p className="flex gap-1 items-center text-sm text-[#212529]">
                      Post/Zip Code:
                      <span className="font-medium">
                        {order.shipping_address.zip}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="xl:max-w-[320px] sm:max-w-full w-full flex flex-col gap-5 bg-white border p-5 rounded-xl shadow-lg">
                  <h2 className="text-sm text-[#334257] font-semibold">
                    Customer Info
                  </h2>

                  <div className="flex flex-col gap-3">
                    <p className="flex gap-1 items-center text-sm text-[#212529]">
                      Name:
                      <span className="font-medium">{order.customer.name}</span>
                    </p>
                    <p className="flex gap-1 items-center text-sm text-[#212529]">
                      Email:
                      <span className="font-medium">
                        {order.customer.phone}
                      </span>
                    </p>
                    <p className="flex gap-1 items-center text-sm text-[#212529]">
                      Phone:
                      <span className="font-medium">
                        {order.customer.email}
                      </span>
                    </p>
                  </div>
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
