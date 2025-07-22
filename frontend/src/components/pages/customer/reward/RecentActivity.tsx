import { Clock } from "lucide-react";
import { cn } from "rizzui";

type ActivityProps = {
  description: string;
  points: number;
  status: "pending" | "completed";
  isModal: boolean;
};

const RecentActivity = ({
  description,
  points,
  status,
  isModal,
}: ActivityProps) => (
  <div className="flex justify-between items-center p-3 bg-white border-b">
    <div className="flex items-center">
      <div
        className={`p-2 rounded-full ${
          status === "completed"
            ? "bg-green-100 text-green-600"
            : "bg-yellow-100 text-yellow-600"
        } mr-4`}
      >
        <Clock />
      </div>

      <div>
        <div className={` ${isModal ? "text-black text-sm" : "text-gray-700"}`}>
          {description}
        </div>
        <div
          className={cn(
            "text-sm",
            status === "completed" ? "text-green-600" : "text-yellow-600",
            isModal && "text-xs"
          )}
        >
          {status}
        </div>
      </div>
    </div>

    <div
      className={cn(
        "text-sm font-medium",
        status === "completed" ? "text-green-600" : "text-yellow-600",
        isModal && "text-xs"
      )}
    >
      +{points} Points
    </div>
  </div>
);
export default RecentActivity;
