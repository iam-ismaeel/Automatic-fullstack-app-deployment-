"use client";
import Flex from "@/components/common/Flex";
import SpaceBetween from "@/components/common/SpaceBetween";
import { SearchIcon } from "@/components/svg";
import {
  EyeIcon,
  PencilIcon,
  PlusFilledIcon,
} from "@/components/svg/seller/icons";
import { useRouter } from "next/navigation";
import { Badge, Button, Input, Switch } from "rizzui";

const BrandTable = () => {
  const tableHeadings = ["SL", "Product Name", "Status", "Action"];

  const sampleData = [
    {
      sl: 1,
      name: "Nike",
      status: true,
    },
    {
      sl: 2,
      name: "Adidas",
      status: false,
    },
    {
      sl: 3,
      name: "Apple",
      status: true,
    },
    {
      sl: 4,
      name: "Samsung",
      status: true,
    },
    {
      sl: 5,
      name: "Microsoft",
      status: false,
    },
    {
      sl: 6,
      name: "Amazon",
      status: true,
    },
    {
      sl: 7,
      name: "Google",
      status: true,
    },
    {
      sl: 8,
      name: "Toyota",
      status: false,
    },
    {
      sl: 9,
      name: "Coca-Cola",
      status: true,
    },
    {
      sl: 10,
      name: "McDonald's",
      status: true,
    },
  ];
  const router = useRouter();
  return (
    <div className="overflow-x-auto rounded-lg mt-6 p-6 bg-white">
      <p className="text-[14px] text-[#334257] font-semibold">Brands</p>
      <div className="border rounded-lg mt-4">
        <table className="table">
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
            {sampleData.map((s, i) => (
              <tr className="border-b-secondary " key={i}>
                <td>{s.sl}</td>
                <td>{s.name}</td>
                <td>
                  <Switch
                    switchKnobClassName="bg-white"
                    switchClassName="bg-gray-400"
                    checked={s.status}
                  />
                </td>
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
  );
};

export default BrandTable;
