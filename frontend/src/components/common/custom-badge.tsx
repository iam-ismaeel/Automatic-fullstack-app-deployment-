import { Badge } from "rizzui";

type IStatus =
  | "pending"
  | "completed"
  | "paid"
  | "unpaid"
  | "confirmed"
  | "active"
  | "inactive"
  | "approved"
  | string;

interface ICustomBadge {
  bgColor: string;
  textColor: string;
  text: string;
}

const CustomBadge = ({ bgColor, textColor, text }: ICustomBadge) => (
  <Badge
    size="sm"
    className={`${bgColor} ${textColor} whitespace-nowrap px-[10px] py-[2px]`}
  >
    <span className={`text-xs font-semibold capitalize`}>{text}</span>
  </Badge>
);

export const renderStatusBadge: Record<IStatus, JSX.Element> = {
  pending: (
    <CustomBadge
      bgColor="bg-[#FEF9C3]"
      textColor="text-[#A16207]"
      text="Pending"
    />
  ),
  confirmed: (
    <CustomBadge
      bgColor="bg-[#279F5129]"
      textColor="text-[#279F51]"
      text="Confirmed"
    />
  ),
  processing: (
    <CustomBadge
      bgColor="bg-[#EFF6FF]"
      textColor="text-[#2563EB]"
      text="Processing"
    />
  ),
  shipped: (
    <CustomBadge
      bgColor="bg-[#F5F3FF]"
      textColor="text-[#6D28D9]"
      text="Shipped"
    />
  ),
  delivered: (
    <CustomBadge
      bgColor="bg-[#DCFCE7]"
      textColor="text-[#15803D]"
      text="Delivered"
    />
  ),
  cancelled: (
    <CustomBadge
      bgColor="bg-[#FEE2E2]"
      textColor="text-[#DC2626]"
      text="Cancelled"
    />
  ),
  canceled: (
    <CustomBadge
      bgColor="bg-[#FEE2E2]"
      textColor="text-[#DC2626]"
      text="Canceled"
    />
  ),
  completed: (
    <CustomBadge
      bgColor="bg-[#DCFCE7]"
      textColor="text-[#15803D]"
      text="Completed"
    />
  ),
  paid: (
    <CustomBadge
      bgColor="bg-[#D1FAE5]"
      textColor="text-[#047857]"
      text="Paid"
    />
  ),
  unpaid: (
    <CustomBadge
      bgColor="bg-[#F3F4F6]"
      textColor="text-[#374151]"
      text="Unpaid"
    />
  ),
  active: (
    <CustomBadge
      bgColor="bg-[#DBEAFE]"
      textColor="text-[#1D4ED8]"
      text="Active"
    />
  ),
  inactive: (
    <CustomBadge
      bgColor="bg-[#FEF2F2]"
      textColor="text-[#B91C1C]"
      text="Inactive"
    />
  ),
  approved: (
    <CustomBadge
      bgColor="bg-[#E0F2FE]"
      textColor="text-[#0369A1]"
      text="Approved"
    />
  ),
  default: (
    <CustomBadge
      bgColor="bg-[#DCFCE7]"
      textColor="text-[#15803D]"
      text="Default"
    />
  ),
};
