import React from "react";
import OrderStepper, { OrderStatus, Step } from "./OrderStepper";
import {
  FileText,
  CheckCircle,
  Package,
  Truck,
  Handshake,
  X,
} from "lucide-react";

export interface OrderTrackingProps {
  orderStatus?: string; // The status from your API
  className?: string;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({
  orderStatus = "pending",
  className,
}) => {
  // Updated to include 5 steps with a "confirmed" step
  const steps: Step[] = [
    {
      id: "placed",
      label: "Order Placed",
      icon: <FileText className="h-6 w-6" />,
    },
    {
      id: "confirmed",
      label: "Confirmed",
      icon: <CheckCircle className="h-6 w-6" />,
    },
    {
      id: "ready",
      label: "Processing",
      icon: <Package className="h-6 w-6" />,
    },
    {
      id: "delivery",
      label: "Shipped",
      icon: <Truck className="h-6 w-6" />,
    },
    {
      id: "delivered",
      label: "Delivered",
      icon: <Handshake className="h-6 w-6" />,
    },
  ];

  // Map API status to stepper status with the new "confirmed" step
  const getStepperStatus = (status: string): OrderStatus => {
    switch (status.toLowerCase()) {
      case "pending":
        return "placed";
      case "confirmed":
        return "confirmed";
      case "processing":
        return "ready";
      case "shipped":
        return "delivery";
      case "delivered":
        return "delivered";
      case "canceled":
        return "placed"; // For canceled orders, we'll show them at the first step
      default:
        return "placed";
    }
  };

  // Get the current stepper status based on the API status
  const currentStatus = getStepperStatus(orderStatus);

  // Handle special case for canceled orders
  const isCanceled = orderStatus.toLowerCase() === "cancelled";

  return (
    <div className={className}>
      {isCanceled ? (
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-2">
            <X className="h-6 w-6 text-red-500" />
          </div>
          <p className="text-red-500 font-medium">Order Canceled</p>
          <p className="text-sm text-gray-500 mt-1">
            This order has been canceled
          </p>
        </div>
      ) : (
        <OrderStepper
          steps={steps}
          currentStatus={currentStatus}
          color="bg-subscription-red"
        />
      )}
    </div>
  );
};

export default OrderTracking;
