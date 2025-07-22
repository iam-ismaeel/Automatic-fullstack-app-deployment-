import SpaceBetween from "@/components/common/SpaceBetween";
import { useDisclosure } from "@/hooks/useDisclosure";
import React, { useState } from "react";
import { Switch } from "rizzui";
type ModalModes = "2fa" | "pin" | "";
const Update2fa = () => {
  const [modalMode, setModalMode] = useState<"2fa" | "pin" | "">("");
  const { isOpen, toggleOpenState } = useDisclosure();
  const securityOptions = [
    {
      title: "Set 2 Factor Authentification",

      value: "2fa",
    },
  ];
  return (
    <div className="text-[#212121] mt-6">
      <p className="text-[18px] text-[#333333] mb-8">
        Set new security question
      </p>

      <div className="mt-4 flex flex-col">
        {securityOptions.map((e) => (
          <SpaceBetween className="gap-8 py-8 border-b" key={e.value}>
            <p className="text-[#212121] mb-2">{e.title}</p>

            <Switch
              switchKnobClassName="bg-white"
              switchClassName="bg-gray-400"
              onChange={() => {
                setModalMode(e.value as ModalModes);
                toggleOpenState();
              }}
            />
          </SpaceBetween>
        ))}
      </div>
    </div>
  );
};

export default Update2fa;
