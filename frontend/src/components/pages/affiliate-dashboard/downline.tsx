import React from "react";
import Image from "next/image";

const downlineData = [
  {
    id: 1,
    name: "Hart Hagerty",
    email: "hart.hagerty@example.com",
    amount: "₦500",
    time: "58s ago",
    date: "20th July, 2021",
    avatar: "/img/avatar2.jpeg",
  },
  {
    id: 2,
    name: "Kathy Chan",
    email: "kathy.chan@example.com",
    amount: "₦750",
    time: "2m ago",
    date: "21st July, 2021",
    avatar: "/img/avatar3.jpeg",
  },
  {
    id: 3,
    name: "Stella Johnson",
    email: "stella.johnson@example.com",
    amount: "₦1000",
    time: "5m ago",
    date: "22nd July, 2021",
    avatar: "/img/avatar4.jpeg",
  },
  {
    id: 4,
    name: "Samuel Green",
    email: "samuel.green@example.com",
    amount: "₦1250",
    time: "10m ago",
    date: "23rd July, 2021",
    avatar: "/img/avatar1.jpeg",
  },
  {
    id: 5,
    name: "Rachel Brown",
    email: "rachel.brown@example.com",
    amount: "₦1500",
    time: "15m ago",
    date: "24th July, 2021",
    avatar: "/img/avatar2.jpeg",
  },
];

const Downline = () => {
  return (
    <div className="overflow-scroll">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="border-b border-b-primary">
            <th className="text-base-medium">Name</th>
            <th className="text-base-medium">Amount</th>
            <th className="text-base-medium min-w-[120px]">Time</th>
            <th className="text-base-medium text-right min-w-[150px]">Date</th>
          </tr>
        </thead>
        <tbody>
          {downlineData.map((downline) => (
            <tr className="border-b-secondary" key={downline.id}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <Image
                        src={downline.avatar}
                        alt="Avatar Tailwind CSS Component"
                        fill
                        className="rounded-full"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{downline.name}</div>
                    <div className="text-sm opacity-50">{downline.email}</div>
                  </div>
                </div>
              </td>
              <td>
                <label className="text-[#242424]">{downline.amount}</label>
              </td>
              <td>
                <label className="text-[#242424]">{downline.time}</label>
              </td>
              <td>
                <label className="text-[#242424] flex justify-end">
                  {downline.date}
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Downline;
