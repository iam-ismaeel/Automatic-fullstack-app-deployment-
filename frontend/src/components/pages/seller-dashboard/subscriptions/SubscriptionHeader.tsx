import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button, cn } from "rizzui";
import { Breadcrumb } from "@/components/common/breadcrumb";

interface SubscriptionHeaderProps {
  children: React.ReactNode;
  viewMode: "subscribed" | "change";
  onChangeMode: (mode: "subscribed" | "change") => void;
}

const breadcrumbItems = [{ label: "Manage your subscription" }];

const SubscriptionHeader: React.FC<SubscriptionHeaderProps> = ({
  children,
  viewMode,
  onChangeMode,
}) => {
  return (
    <div className="space-y-4 mb-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex items-center justify-between">
        {children}

        {viewMode === "subscribed" ? (
          <Button
            onClick={() => onChangeMode("change")}
            className="bg-[#BE1E2D] text-white"
          >
            Change Plan
          </Button>
        ) : (
          <Button
            onClick={() => onChangeMode("subscribed")}
            className="bg-[#BE1E2D] px-12 text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Current Plan
          </Button>
        )}
      </div>
    </div>
  );
};

export default SubscriptionHeader;
