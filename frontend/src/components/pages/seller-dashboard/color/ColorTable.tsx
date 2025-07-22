"use client";
import Flex from "@/components/common/Flex";
import { PencilIcon } from "@/components/svg/seller/icons";
import { useRouter } from "next/navigation";
import { Switch } from "rizzui";

const ColorTable = () => {
  const tableHeadings = ["SL", "Name", "Color", "Status", "Action"];

  const sampleData = [
    {
      sl: 1,
      name: "Red",
      color: "#FF0000",
      status: true,
    },
    {
      sl: 2,
      name: "Blue",
      color: "#0000FF",
      status: false,
    },
    {
      sl: 3,
      name: "Green",
      color: "#00FF00",
      status: true,
    },
    {
      sl: 4,
      name: "Yellow",
      color: "#FFFF00",
      status: true,
    },
    {
      sl: 5,
      name: "Purple",
      color: "#800080",
      status: false,
    },
    {
      sl: 6,
      name: "Orange",
      color: "#FFA500",
      status: true,
    },
    {
      sl: 7,
      name: "Pink",
      color: "#FFC0CB",
      status: true,
    },
    {
      sl: 8,
      name: "Brown",
      color: "#A52A2A",
      status: false,
    },
    {
      sl: 9,
      name: "Gray",
      color: "#808080",
      status: true,
    },
    {
      sl: 10,
      name: "Cyan",
      color: "#00FFFF",
      status: true,
    },
  ];
  const router = useRouter();
  return (
    <div className="rounded-lg mt-6 p-6 bg-white">
      <div className="border rounded-lg mt-4">
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
            {sampleData.map((s, i) => (
              <tr className="border-b-secondary " key={i}>
                <td>{s.sl}</td>

                <td>{s.name}</td>
                <td>
                  <div
                    style={{ backgroundColor: s.color }}
                    className="w-[60px] h-[30px] rounded-md"
                  ></div>
                </td>

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

export default ColorTable;
