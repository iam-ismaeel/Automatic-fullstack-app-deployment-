import React from "react";
import { LinkIcon } from "@/components/svg";
import Link from "next/link";

const data = [
  {
    name: "Agri-Ecom",
    link: "#agri-ecom",
  },
  {
    name: "Azany Pay",
    link: "#azanyPay",
  },
  {
    name: "Reward System",
    link: "#rewardSystem",
  },
  {
    name: "Multi Currency",
    link: "#multiCurrency",
  },
];

const ServicesCard = () => {
  return (
    <div className="bg-white flex-1 rounded-[10px] lg:col-span-3">
      <div className="border-b flex justify-between items-center py-6 px-6">
        <h6 className="text-heading-5-medium">Other Products</h6>
        <div className="flex items-center gap-x-2 ">
          <LinkIcon />
          <label className="text-primary">Links</label>
        </div>
      </div>
      {data.map((item, index) => (
        <div
          key={index}
          className="px-6 py-9 flex justify-between items-center border-b"
        >
          <label className="text-large-medium">{item.name}</label>
          <Link
            href={item.link}
            className="underline underline-offset-4 decoration-primary text-main"
          >
            View
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ServicesCard;
