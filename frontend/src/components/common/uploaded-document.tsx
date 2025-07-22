import React from "react";
import SpaceBetween from "./SpaceBetween";
import { DeleteIcon, DocumentIcon } from "../svg/seller/icons";
import Flex from "./Flex";
import { Button } from "rizzui";

const UploadedDocument = ({
  onDelete,
  file,
  className,
}: {
  onDelete?: () => void;
  file: File;
  className?: string;
}) => {
  const fileSize = file?.size ? (file.size / 1000).toFixed(2) : 0;
  return (
    <div
      className={`bg-white min-w-[250px] border rounded-lg px-6 py-2 ${className}`}
    >
      <SpaceBetween className="gap-10">
        <Flex>
          <DocumentIcon />
          <div>
            <p className="font-semibold break-all">{file?.name}</p>
            <p className="text-[#989692] text-[13px]">{fileSize}kb</p>
          </div>
        </Flex>
        <Button onClick={onDelete} className="text-main px-0" variant="flat">
          <DeleteIcon />
        </Button>
      </SpaceBetween>
    </div>
  );
};

export default UploadedDocument;
