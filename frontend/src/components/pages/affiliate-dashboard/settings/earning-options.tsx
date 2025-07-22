import SpaceBetween from "@/components/common/SpaceBetween";
import { useState } from "react";
import { Radio } from "rizzui";

const EarningOptions = () => {
  const [value, setValue] = useState("");
  const earningList = [
    {
      title: "Monthly payment",
      desc: "The cash value of your earnings would be sent directly to your registered bank account",
      value: "monthly",
    },
    {
      title: "Commission",
      desc: "The commission will be calculated based on the transaction that occurs on the vendors account",
      value: "commission",
    },
    {
      title: "Azany Virtual Card",
      desc: "The cash value will be sent to your  Azany Virtual card",
      value: "azany-virtual",
    },
  ];
  return (
    <div className="text-[#212121] mt-6">
      <p className="text-[18px] text-[#333333] mb-8">
        You can choose how you want to be paid on this platform
      </p>

      <div className="mt-4 flex flex-col">
        {earningList.map((e) => (
          <SpaceBetween className="gap-8 py-8 border-b" key={e.value}>
            <div>
              <p className="text-[#212121] mb-2">{e.title}</p>
              <p className="text-[#828282]">{e.desc}</p>
            </div>
            <Radio
              onClick={() => setValue(e.value)}
              checked={value === e.value}
              size="sm"
              variant="outline"
            />
          </SpaceBetween>
        ))}
      </div>
    </div>
  );
};

export default EarningOptions;
