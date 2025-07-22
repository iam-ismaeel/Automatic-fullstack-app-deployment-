"use client";

import Flex from "@/components/common/Flex";
import SpaceBetween from "@/components/common/SpaceBetween";
import { ChevronArrowIcon, InfoIcon } from "@/components/svg/seller/icons";
import { useDisclosure } from "@/hooks/useDisclosure";
import Image from "next/image";
import { useState } from "react";
import { Accordion, Button, cn } from "rizzui";
import { InstructionsModal } from "./InstructionsModal";
import DocumentUploader from "@/components/common/document-uploader";
import UploadedDocument from "@/components/common/uploaded-document";
import { useImportProductMutation } from "@/api/product";
import { toast } from "sonner";
import useAuthStore from "@/zustand/authStore";
import { showsuccess } from "@/utils/showPopup";

const BulkProductImport = () => {
  const instructions = [
    {
      label: "Step 1",
      desc: "Download Excel File",
      icon: "/img/seller-step-1.png",
    },
    {
      label: "Step 2",
      desc: "Match Spread sheet data according to instruction",
      icon: "/img/seller-step-2.png",
    },
    {
      label: "Step 3",
      desc: "Validate data and complete import",
      icon: "/img/seller-step-3.png",
    },
  ];

  const [instructionStep, setInstructionStep] = useState<number>(1);
  const { isOpen, toggleOpenState, onClose } = useDisclosure();
  const [files, setFiles] = useState<FileList | null>(null);

  const { mutateAsync, isPending } = useImportProductMutation();
  const {
    userData: { user_id },
  } = useAuthStore();

  const onImport = async () => {
    const formdata = new FormData();
    formdata.append("file", files![0]);
    formdata.append("user_id", user_id as string);

    await mutateAsync(formdata).then(() => {
      showsuccess("Product imported successfully.");
      setFiles(null);
    });
  };

  return (
    <div>
      <div
        style={{
          boxShadow: "0px 5px 10px rgba(51, 66, 87, 0.05)",
        }}
        className="p-4 border rounded-md bg-white"
      >
        <Accordion>
          <Accordion.Header>
            {/* @ts-ignore */}
            {({ open }) => (
              <div className="flex w-full cursor-pointer items-center justify-between py-5 text-xl font-semibold">
                <Flex>
                  <InfoIcon />
                  <p className="text-[#052C65]">Get Instructions</p>
                </Flex>
                <ChevronArrowIcon
                  className={cn(
                    "h-5 w-5 -rotate-90 transform transition-transform duration-300",
                    open && "-rotate-0"
                  )}
                />
              </div>
            )}
          </Accordion.Header>
          <Accordion.Body className="mb-7">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 slg:grid-cols-1 lg:grid-cols-2 grid-cols-3 gap-6">
              {instructions.map((i, index) => (
                <div
                  key={index}
                  className="p-4 flex flex-col gap-6 justify-between rounded-md border"
                >
                  <SpaceBetween>
                    <div className="items-start">
                      <p className="text-[20px] font-semibold">{i.label}</p>
                      <p className="tetx-[14px] font-[400]">{i.desc}</p>
                    </div>
                    <Image
                      src={i.icon}
                      alt="icon"
                      width={200}
                      height={200}
                      className="size-[50px] rounded-lg"
                    />
                  </SpaceBetween>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setInstructionStep(index + 1);
                      toggleOpenState();
                    }}
                  >
                    View Instruction
                  </Button>
                </div>
              ))}
            </div>
          </Accordion.Body>
        </Accordion>
      </div>
      <div
        style={{
          boxShadow: "0px 5px 10px rgba(51, 66, 87, 0.05)",
        }}
        className="mt-6 p-4 border rounded-md bg-white"
      >
        <p className="text-[20px] mb-2">Select Excel(xlsx) File to Import</p>

        {!files?.length ? (
          <DocumentUploader
            onSelectFile={(f) => {
              console.log(f);
              setFiles(f as any);
            }}
          />
        ) : (
          <Flex className="flex-wrap">
            <UploadedDocument
              className="w-fit"
              file={files![0] as File}
              onDelete={() => setFiles(null)}
            />
            <Button
              disabled={!files.length}
              onClick={onImport}
              isLoading={isPending}
              className="bg-main grow text-white"
            >
              Upload
            </Button>
          </Flex>
        )}
      </div>
      <InstructionsModal
        currentStep={instructionStep}
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  );
};

export default BulkProductImport;
