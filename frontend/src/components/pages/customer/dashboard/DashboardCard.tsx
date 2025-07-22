import Link from "next/link";

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  percentageChange: string;
  isPositive: boolean; // Indicates if the percentage change is positive or negative
  linkText?: string;
  linkHref?: string;
}

export default function DashboardCard({
  icon,
  title,
  value,
  percentageChange,
  isPositive,
  linkText,
  linkHref,
}: DashboardCardProps) {
  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex justify-between items-center">
        <div className="text-gray-500">{icon}</div>
        <div className="text-sm text-gray-400">Last 30 days</div>
      </div>
      <div className="mt-2 ">
        <p className="text-sm text-gray-500">{title}</p>
        <div className="flex items-end mt-1">
          <span className="text-2xl font-semibold text-gray-900">{value}</span>
          <span
            className={`ml-2 text-xs font-semibold ${
              isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {isPositive ? "↑" : "↓"} {percentageChange}
          </span>
        </div>
        {linkHref && (
          <div className=" text-end">
            <Link
              href={linkHref}
              className="text-sm text-red-500 hover:underline"
            >
              {linkText}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
