import Flex from "@/components/common/Flex";
import { PencilIcon } from "@/components/svg/seller/icons";
import React, { useState } from "react";
import { Button, Input } from "rizzui";

const AccountInformation = ({ onEdit }: { onEdit: () => void }) => {
  const [viewState, setViewState] = useState<boolean>(false);
  return (
    <div className="mt-10">
      <Flex className="flex-wrap mb-8">
        <p className="text-[#0C0C0C] text-[22px] font-bold">
          Account Information
        </p>
        <Button
          onClick={onEdit}
          variant="flat"
          className="gap-2 !py-0 h-fit text-[#0F60FF]"
        >
          <PencilIcon />
          <p>Edit</p>
        </Button>
      </Flex>
      <div className="flex flex-col text-[#0C0C0C] gap-4">
        <p>Name: John</p>
        <p>Surname: Doe</p>
        <p>Login/e-mail: johndoe@gmail.com</p>
        <p>Phone: +48 876 989 667</p>
        <p>
          Password:{" "}
          <span
            onClick={() => {
              setViewState(true);
            }}
            className="text-[#0E5DC1] hover:cursor-pointer underline hover:opacity-85"
          >
            Change password
          </span>
        </p>
      </div>

      {viewState && (
        <div className="mt-6">
          <form>
            <div className="flex flex-col gap-4">
              <Input
                inputClassName="bg-white !py-[22px] border-[#EAECEE]"
                label="Old password"
                labelClassName="text-[#434447] font-[400] text-[14px]"
              />
              <Input
                inputClassName="bg-white !py-[22px] border-[#EAECEE]"
                label="New password"
                labelClassName="text-[#434447] font-[400] text-[14px]"
              />
              <Input
                inputClassName="bg-white !py-[22px] border-[#EAECEE]"
                label="Repeat new password"
                labelClassName="text-[#434447] font-[400] text-[14px]"
              />
              <Flex>
                <Button className="bg-main text-white">Change password</Button>
                <Button
                  onClick={() => setViewState(false)}
                  className="text-main"
                  variant="flat"
                >
                  Cancel
                </Button>
              </Flex>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AccountInformation;
