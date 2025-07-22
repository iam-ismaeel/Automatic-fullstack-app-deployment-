import { useRef, DragEvent, ChangeEvent } from "react";
import { UploadButtonIcon } from "../svg/seller/icons";
import { showerror } from "@/utils/showPopup";

export interface UploadGridProps {
  onSelectFile: (val: FileList) => void;
  allowMultiple?: boolean;
  accepts?: string;
  maxFileSize?: number;
}

const DocumentUploader = ({
  onSelectFile,
  allowMultiple,
  accepts,
  maxFileSize,
}: UploadGridProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  // const maxFileSize = ; // 1MB in bytes

  const validateFileSize = (files: FileList) => {
    const oversizedFiles = Array.from(files).filter(
      (file) => file.size > maxFileSize!
    );

    if (oversizedFiles.length > 0) {
      showerror("File size should not exceed 1MB");
      return false;
    }
    return true;
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (validateFileSize(files)) {
      onSelectFile(files);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && validateFileSize(files)) {
      onSelectFile(files);
    }
  };

  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border border-dashed px-8 min-h-[200px] rounded-[10px] flex flex-col gap-2 items-center justify-center"
      >
        <UploadButtonIcon />
        <p className="text-[16px] text-center">
          Drag file here or{" "}
          <span
            onClick={() => inputRef?.current?.click()}
            className="text-blue-500 font-semibold hover:cursor-pointer"
          >
            Click Upload
          </span>
        </p>
        <input
          ref={inputRef}
          onChange={handleChange}
          hidden
          type="file"
          multiple={allowMultiple}
          accept={accepts}
        />
      </div>
    </div>
  );
};

export default DocumentUploader;
