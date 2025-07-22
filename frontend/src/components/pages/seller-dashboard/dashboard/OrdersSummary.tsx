import { renderStatusBadge } from "@/components/common/custom-badge";
import EmptyData from "@/components/common/empty-data";
import Flex from "@/components/common/Flex";
import { DownloadIcon, EyeIcon } from "@/components/svg/seller/icons";
import { formatDate } from "date-fns";

const OrdersSummary = ({ data }: { data: any[] }) => {
  const tableHeadings = [
    "Order ID",
    "Qty",
    "Date",
    "Price",
    "Status",
    "Action",
  ];

  return (
    <div className="p-4 border overflow-x-auto rounded-md bg-white">
      {data?.length ? (
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
            {data.map((o, i) => (
              <tr className="border-b-secondary " key={i}>
                <td>{o.order_no}</td>

                <td>{o.quantity}</td>
                <td>{formatDate(o.order_date, "yyyy-MM-dd")}</td>
                <td>{o.total_amount}</td>
                <td>{renderStatusBadge[o.status as string]}</td>

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
