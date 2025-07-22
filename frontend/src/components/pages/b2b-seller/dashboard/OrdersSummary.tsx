import EmptyData from "@/components/common/empty-data";
import Flex from "@/components/common/Flex";
import { DownloadIcon, EyeIcon } from "@/components/svg/seller/icons";

const OrdersSummary = ({ data }: { data?: any[] }) => {
  const tableHeadings = [
    "Order ID",
    "Qty",
    "Date",
    "Price",
    "Status",
    "Action",
  ];

  const getColor = (value: "pending" | "confirmed") => {
    if (value === "pending") return "#F59E0B";
    else return "#279F51";
  };

  interface OrderData {
    orderId: string;
    quantity: number;
    date: string;
    price: number;
    status: string;
    action: string;
  }

  const mockOrdersData: OrderData[] = [
    {
      orderId: "ORD-001",
      quantity: 5,
      date: "2023-06-15",
      price: 299.99,
      status: "Shipped",
      action: "View Details",
    },
    {
      orderId: "ORD-002",
      quantity: 2,
      date: "2023-06-14",
      price: 149.5,
      status: "Processing",
      action: "Cancel Order",
    },
    {
      orderId: "ORD-003",
      quantity: 1,
      date: "2023-06-13",
      price: 79.99,
      status: "Delivered",
      action: "Leave Review",
    },
    {
      orderId: "ORD-004",
      quantity: 3,
      date: "2023-06-12",
      price: 224.97,
      status: "Pending",
      action: "Pay Now",
    },
    {
      orderId: "ORD-005",
      quantity: 4,
      date: "2023-06-11",
      price: 399.96,
      status: "Shipped",
      action: "Track Package",
    },
  ];

  return (
    <div className="p-4 border overflow-x-auto rounded-md bg-white">
      {mockOrdersData?.length ? (
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
            {mockOrdersData.map((o, i) => (
              <tr className="border-b-secondary " key={i}>
                <td className="whitespace-nowrap">{o.orderId}</td>

                <td className="whitespace-nowrap">{o.quantity}</td>
                <td className="whitespace-nowrap">{o.date}</td>
                <td className="whitespace-nowrap">{o.price}</td>
                <td
                  style={{ color: getColor(o.status as any) }}
                  className="capitalize"
                >
                  <Flex>
                    <div
                      style={{ backgroundColor: getColor(o.status as any) }}
                      className="size-[8px] rounded-full"
                    ></div>
                    <p>{o.status}</p>
                  </Flex>
                </td>

                <td role="sr-only">
                  <Flex className="text-main">
                    <div className="size-[32px] border cursor-pointer flex justify-center items-center rounded-full">
                      <EyeIcon className="cursor-pointer text-[#6C757D]" />
                    </div>
                    <div className="size-[32px] border flex justify-center items-center  cursor-pointer rounded-full">
                      <DownloadIcon />
                    </div>
                  </Flex>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyData />
      )}
    </div>
  );
};

export default OrdersSummary;
