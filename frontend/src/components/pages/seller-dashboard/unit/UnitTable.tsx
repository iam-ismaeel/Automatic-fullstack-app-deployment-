"use client";
import Flex from "@/components/common/Flex";
import { PencilIcon } from "@/components/svg/seller/icons";
import { useRouter } from "next/navigation";
import { Switch } from "rizzui";

const UnitTable = () => {
  const tableHeadings = ["SL", "Name", "Status", "Action"];

  const sampleData = [
    {
      sl: 1,
      name: "Kilogram",

      status: true,
    },
    {
      sl: 2,
      name: "Grams",

      status: false,
    },
    {
      sl: 3,
      name: "Pounds",

      status: true,
    },
  ];
  const router = useRouter();
  return (
    <div className="overflow-x-auto rounded-lg mt-6 p-6 bg-white">
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
                    switchClassName="bg-gray-400 "
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

export default UnitTable;
