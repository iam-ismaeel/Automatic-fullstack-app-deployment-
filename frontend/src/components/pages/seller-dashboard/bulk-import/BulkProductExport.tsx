"use client";

import {
  useExportProductsQuery,
  useGetProductTemplateQuery,
} from "@/api/product";
import SpaceBetween from "@/components/common/SpaceBetween";
import { showerror } from "@/utils/showPopup";
import useAuthStore from "@/zustand/authStore";
import axios from "axios";
import Image from "next/image";
import { Button } from "rizzui";

const BulkProductExport = () => {
  const {
    userData: { user_id },
  } = useAuthStore();
  const { refetch, isLoading } = useExportProductsQuery(user_id as string);

  const handleDownload = (path: string) => {
    const a = document.createElement("a");
    a.href = path;
    a.download = "template.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(path);
  };

  const instructions = [
    {
      label: "Step 1",
      desc: "Select Data Type",
      instruction:
        "Choose the data type to determine the order in which your data will be sorted when downloading. This allows you to customize the export based on your specific needs.",
      options: [
        "Alphabetical Order: Sorts products by name.",
        "Category: Groups products by their category.",
        "Price: Orders products by their price, from low to high or high to low.",
        "Date Added: Sorts products by the date they were added to the inventory, from newest to oldest or oldest to newest.",
        "Stock Quantity: Arranges products based on the number of items in stock.",
      ],
      icon: "/img/export-step-1.png",
    },
    {
      label: "Step 2",
      desc: "Select Data Range by All and Export",
      instruction: (
        <span>
          Select the range of data you want to include in your export. You can
          choose to export all products or apply specific filters to narrow down
          the selection. Once you&apos;ve made your choices, download the file,
          which will be in .xlsx format. <br /> <br /> If you want to start over
          and discard any changes, click &quot;Reset&quot; to revert to the
          default order and settings
        </span>
      ),
      options: [
        "All Products: Export the entire product inventory.",
        "Filtered Range: Apply filters based on the chosen data type (e.g., a specific category, price range, or stock level).",
        "Click 'Export' to download your customized .xlsx file.",
      ],
      icon: "/img/export-step-2.png",
    },
  ];
  return (
    <div className="mb-20">
      <div
        style={{
          boxShadow: "0px 5px 10px rgba(51, 66, 87, 0.05)",
        }}
        className="p-4 border rounded-md bg-white"
      >
        <div className="grid lg:grid-cols-1 gap-16 xl:grid-cols-2">
          {instructions.map((i, index) => (
            <div key={index}>
              <SpaceBetween>
                <div className="items-start">
                  <p className="text-[20px] font-semibold">{i.label}</p>
                  <p className="text-[14px] font-[400]">{i.desc}</p>
                </div>
                <Image
                  src={i.icon}
                  alt="icon"
                  width={200}
                  height={200}
                  className="size-[50px] rounded-lg"
                />
              </SpaceBetween>
              <div className="my-4">
                <p className="text-[20px] font-semibold">Instructions</p>
                <p>{i.instruction}</p>
              </div>
              <div className="mb-4">
                <p className="text-[20px] font-semibold">Options:</p>
                <ul className="px-4">
                  {i.options.map((opt, i) => (
                    <li className="list-disc" key={opt + i}>
                      {opt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="py-4 md:ml-0 ml-8 bg-white pr-8 border-t absolute bottom-0 left-0 right-0 flex justify-end gap-4 items-center">
        <Button
          isLoading={isLoading}
          onClick={async () => {
            await refetch()
              .then(async (data) => {
                const link = data?.data?.data;
                if (link) {
                  try {
                    const response = await axios.get(link, {
                      responseType: "blob",
                    });
                    const blob = new Blob([response.data], {
                      type: response.headers["content-type"],
                    });
                    const url = URL.createObjectURL(blob);
                    handleDownload(url);
                  } catch (error) {
                    showerror("Failed to export products");
                  }
                } else {
                  showerror("No download link available");
                }
              })
              .catch(() => showerror("Failed to export products"));
          }}
          type="submit"
          size="lg"
          className="bg-main px-8 text-white"
        >
          {"Export"}
        </Button>
      </div>
    </div>
  );
};

export default BulkProductExport;
