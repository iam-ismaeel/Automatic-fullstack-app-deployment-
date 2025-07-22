import { CheckCheck, MapPin, Target, User2 } from "lucide-react";
import React from "react";

const OrderActivity = () => {
  return (
    <div className="max-w-[900px] flex flex-col gap-3">
      <div className="p-4 bg-white rounded flex gap-3 border">
        <div className="flex justify-center items-center p-3 bg-[#EAF7E9] border border-[#D5F0D3] rounded-sm">
          <CheckCheck className="text-[#279F51]" />
        </div>
        <div className="flex flex-col justify-between">
          <p className="text-sm text-[#191C1F]">
            Your order has been delivered Successfully. Thank you for shopping
            with Azany!
          </p>

          <span className="text-sm text-[#77878F]">
            23 Jan, 2024 at 7:32 PM
          </span>
        </div>
      </div>

      <div className="p-4 bg-white rounded flex gap-4 border">
        <div className="flex justify-center items-center p-3 bg-[#EAF6FE] border border-[#D5EDFD] rounded-sm">
          <User2 className="text-[#0F60FF]" />
        </div>
        <div className="flex flex-col justify-between">
          <p className="text-sm text-[#191C1F]">
            Our delivery man (Jason Statham) Has picked-up your order for
            delvery.
          </p>

          <span className="text-sm text-[#77878F]">
            23 Jan, 2024 at 7:32 PM
          </span>
        </div>
      </div>

      <div className="p-4 bg-white rounded flex gap-4 border">
        <div className="flex justify-center items-center p-3 bg-[#EAF6FE] border border-[#D5EDFD] rounded-sm">
          <MapPin className="text-[#0F60FF]" />
        </div>
        <div className="flex flex-col justify-between">
          <p className="text-sm text-[#191C1F]">
            Your order has reached Azany hub.
          </p>

          <span className="text-sm text-[#77878F]">
            22 Jan, 2024 at 8:00 AM
          </span>
        </div>
      </div>

      <div className="p-4 bg-white rounded flex gap-4 border">
        <div className="flex justify-center items-center p-3 bg-[#EAF7E9] border border-[#D5F0D3] rounded-sm">
          <User2 className="text-[#279F51]" />
        </div>
        <div className="flex flex-col justify-between">
          <p className="text-sm text-[#191C1F]">
            Your order is successfully verified.
          </p>

          <span className="text-sm text-[#77878F]">
            20 Jan, 2024 at 7:32 PM
          </span>
        </div>
      </div>

      <div className="p-4 bg-white rounded flex gap-4 border">
        <div className="flex justify-center items-center p-3 bg-[#EAF6FE] border border-[#D5EDFD] rounded-sm">
          <User2 className="text-[#0F60FF]" />
        </div>
        <div className="flex flex-col justify-between">
          <p className="text-sm text-[#191C1F]">
            Your order has been confirmed.
          </p>

          <span className="text-sm text-[#77878F]">
            19 Jan, 2024 at 2:61 PM
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderActivity;
