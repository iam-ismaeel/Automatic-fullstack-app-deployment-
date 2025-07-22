"use client";
import Flex from "@/components/common/Flex";
import { Fragment } from "react";

import { Button } from "rizzui";

const RFQTable = () => {
  const tableHeadings = [
    "Product Name",
    "Customer Name",
    "No. of items",
    "Quote Date",
    "Quote ID",
    "Action",
  ];

  const mockData = [
    {
      id: 1,
      thumbnail: "https://example.com/product1-thumb.jpg",
      productName: "Wireless Bluetooth Headphones",
      price: 89.99,
      discountPrice: 79.99,
      status: "approved",
    },
    {
      id: 2,
      thumbnail: "https://example.com/product2-thumb.jpg",
      productName: "Smart Home Security Camera",
      price: 129.99,
      discountPrice: 119.99,
      status: "pending",
    },
    {
      id: 3,
      thumbnail: "https://example.com/product3-thumb.jpg",
      productName: "Ergonomic Office Chair",
      price: 199.99,
      discountPrice: null,
      status: "confirmed",
    },
    {
      id: 4,
      thumbnail: "https://example.com/product4-thumb.jpg",
      productName: "4K Ultra HD Smart TV",
      price: 599.99,
      discountPrice: 549.99,
      status: "approved",
    },
    {
      id: 5,
      thumbnail: "https://example.com/product5-thumb.jpg",
      productName: "Stainless Steel Kitchen Knife Set",
      price: 79.99,
      discountPrice: 69.99,
      status: "pending",
    },
  ];

  return (
    <div className="overflow-x-auto grid grid-cols-1 w-full">
      <table className="table overflow-x-auto table-pin-rows">
        <thead>
          <tr className="border-b-secondary">
            {tableHeadings.map((head, i) => (
              <td
                className="text-[14px] text-[#8B909A] font-[400] py-4"
                key={i}
              >
                {head}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {mockData.map((product, i) => (
            <tr className="border-b-secondary " key={i}>
              <td>{product.productName}</td>
              <td className="whitespace-nowrap">Lorem Ipsum - {i + 1}</td>
              <td>{product.price.toFixed(0)}</td>
              <td className="whitespace-nowrap">{"22-04-2-24"}</td>
              <td>{product.id}</td>
              <td>
                <Flex>
                  {i % 2 === 1 ? (
                    <Fragment>
                      <Button
                        variant="flat"
                        className="text-main text-left underline"
                      >
                        Review Quote
                      </Button>
                      <Button
                        variant="flat"
                        className="text-[#0F60FF] text-left underline"
                      >
                        Confirm Payment
                      </Button>
                    </Fragment>
                  ) : (
                    <Button variant="flat" className="text-[#279F51] underline">
                      Submit Quote
                    </Button>
                  )}
                </Flex>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RFQTable;
