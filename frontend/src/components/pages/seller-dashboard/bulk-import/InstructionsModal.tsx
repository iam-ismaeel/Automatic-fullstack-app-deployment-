"use client";

import { useGetProductTemplateQuery } from "@/api/product";
import CustomDialog from "@/components/common/custom-dialog";
import { DownloadNewIcon } from "@/components/svg/seller/icons";
import { showerror } from "@/utils/showPopup";
import axios from "axios";
import React from "react";
import { Button } from "rizzui";
import { toast } from "sonner";

export const InstructionsModal = ({
  isOpen,
  onClose,
  currentStep,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentStep: number;
}) => {
  const { refetch, isLoading } = useGetProductTemplateQuery();

  const handleDownload = (path: string) => {
    const a = document.createElement("a");
    a.href = path;
    a.download = "template.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(path);
  };

  const comp: Record<number, React.JSX.Element> = {
    1: (
      <div>
        <p className="mb-4 text-[#231F20]">
          Please download the format file and fill it with the appropriate data.{" "}
          <br />
          <br />
          To understand how to fill the data correctly, you can download the
          example file as a guide.
          <br />
          <br />
          You need to upload the Excel file.
        </p>
        <Button
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
                    showerror("Failed to download template");
                  }
                } else {
                  showerror("No download link available");
                }
              })
              .catch(() => showerror("Failed to download template"));
          }}
          isLoading={isLoading}
          className="text-white gap-2 bg-main"
        >
          <DownloadNewIcon />
          Download Template
        </Button>
      </div>
    ),
    2: (
      <div>
        <p className="mb-4 tetx-[#231F20]">
          Fill in the data according to the format.
          <br />
          <br />
          Ensure the thumbnail image is properly uploaded and the image name
          follows the correct format. The accepted image formats are jpg, jpeg,
          png, and gif.
          <br />
          <br />
          Adding a category is required and category is one. make sure the
          category name is correct.
          <br />
          <br />
          You have the option to add multiple sub categories. Make sure each sub
          category name is accurate and separate the names with commas.
          <br />
          <br />
          Adding a brand to the product entry is optional. If you include one,
          ensure you enter a single brand name accurately. The brand name must
          be correct to maintain accuracy in the data entry process.
          <br />
          <br />
          You can add multiple colours. Ensure each colour name is correct and
          separate them with commas.
          <br />
          <br />
          You can add multiple sizes. Ensure each size name is correct and
          separate them with commas.
          <br />
          <br />
          Price is required and must be a number.
          <br />
          <br />
          Discount price is optional and must be less than the original price.
        </p>
      </div>
    ),
    3: (
      <p className="tetx-[#231F20]">
        In the Excel file upload section first select the upload option.
        <br />
        <br />
        Upload your file in .xlsx format.
        <br />
        <br />
        If you have thumbnails, click the &apos;Select Gallery Folder&apos;
        button. Next, choose the folder containing product thumbnails from the
        Excel file you have selected. Finally, click the &apos;Confirm and
        Import&apos; button.
        <br />
        <br />
        If you do not have thumbnails, click on the &apos;Import Without
        Gallery&apos; button.
        <br />
        <br />
      </p>
    ),
  };
  return (
    <CustomDialog isOpen={isOpen} onClose={onClose}>
      <p className="text-[20px] font-semibold">Instructions</p>
      {comp[currentStep]}
    </CustomDialog>
  );
};
