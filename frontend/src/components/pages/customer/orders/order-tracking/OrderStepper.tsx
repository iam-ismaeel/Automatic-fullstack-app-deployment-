import React from "react";
import { cn } from "rizzui";
import {
  CheckCircle,
  Package,
  Truck,
  Handshake,
  Check,
  FileText,
} from "lucide-react";

export type OrderStatus =
  | "placed"
  | "confirmed"
  | "ready"
  | "delivery"
  | "delivered";

export interface Step {
  id: OrderStatus;
  label: string;
  icon: React.ReactNode;
  description?: string;
}

export interface OrderStepperProps {
  steps: Step[];
  currentStatus: OrderStatus;
  color?: string;
  progressColor?: string;
  completedColor?: string;
  pendingColor?: string;
  lineThickness?: number;
  iconSize?: number;
  className?: string;
  showLabels?: boolean;
  showIcons?: boolean;
  orientation?: "horizontal" | "vertical";
  onStepClick?: (step: Step) => void;
  renderCustomIcon?: (
    step: Step,
    isActive: boolean,
    isCompleted: boolean
  ) => React.ReactNode;
  renderCustomLabel?: (
    step: Step,
    isActive: boolean,
    isCompleted: boolean
  ) => React.ReactNode;
}

const defaultSteps: Step[] = [
  {
    id: "placed",
    label: "Order Placed",
    icon: <FileText />,
  },
  {
    id: "confirmed",
    label: "Confirmed",
    icon: <CheckCircle />,
  },
  {
    id: "ready",
    label: "Processing",
    icon: <Package />,
  },
  {
    id: "delivery",
    label: "Shipped",
    icon: <Truck />,
  },
  {
    id: "delivered",
    label: "Delivered",
    icon: <Handshake />,
  },
];

const OrderStepper: React.FC<OrderStepperProps> = ({
  steps = defaultSteps,
  currentStatus,
  color = "bg-subscription-red",
  progressColor = "bg-red-200",
  completedColor = "bg-subscription-red",
  pendingColor = "bg-red-100",
  lineThickness = 4,
  className,
  showLabels = true,
  showIcons = true,
  orientation = "horizontal",
  onStepClick,
  renderCustomIcon,
  renderCustomLabel,
}) => {
  const getStepState = (step: Step) => {
    const stepIndex = steps.findIndex((s) => s.id === step.id);
    const currentIndex = steps.findIndex((s) => s.id === currentStatus);

    // If the current status is "delivered", mark all steps as completed
    if (currentStatus === "delivered") {
      return "completed";
    }

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "active";
    return "pending";
  };

  const isVertical = window.innerWidth <= 548;

  if (isVertical) {
    return (
      <div className={cn("flex flex-col ml-4", className)}>
        {steps.map((step, index) => {
          const state = getStepState(step);
          const isCompleted = state === "completed";
          const isActive = state === "active";
          const isLast = index === steps.length - 1;

          return (
            <div
              key={step.id}
              className={cn(
                "flex items-start",
                onStepClick && "cursor-pointer"
              )}
              onClick={() => onStepClick?.(step)}
            >
              {/* Circle and Line Container */}
              <div className="flex flex-col items-center mr-2">
                {/* Circle */}
                <div
                  className={cn(
                    "flex items-center justify-center rounded-full transition-all",
                    isCompleted
                      ? completedColor
                      : isActive
                      ? color
                      : pendingColor,
                    "size-8 text-white"
                  )}
                >
                  {
                    isCompleted ? (
                      <Check className="text-white size-5" strokeWidth={3} />
                    ) : (
                      <div className="size-[26px] rounded-full bg-white" />
                    )
                    //  : (
                    //   showIcons &&
                    //   (renderCustomIcon ? (
                    //     renderCustomIcon(step, isActive, isCompleted)
                    //   ) : (
                    //     <span className="text-white">{step.icon}</span>
                    //   ))
                    // )
                  }
                </div>

                {/* Connecting line after each circle except the last */}
                {!isLast && (
                  <div
                    className={cn(
                      "transition-all duration-500 w-[3px] h-16",
                      index < steps.findIndex((s) => s.id === currentStatus)
                        ? completedColor
                        : index ===
                          steps.findIndex((s) => s.id === currentStatus)
                        ? progressColor
                        : pendingColor,
                      // If current status is delivered, all lines should be completed
                      currentStatus === "delivered" && completedColor
                    )}
                    // style={{
                    //   width: lineThickness,
                    // }}
                  />
                )}
              </div>

              {/* Icon and Label Container */}
              <div className="flex items-center">
                {/* Icon */}
                {showIcons && (
                  <div
                    className={cn(
                      "flex items-center justify-center size-9 text-center",
                      isActive && "animate-bounce-subtle"
                    )}
                  >
                    {renderCustomIcon ? (
                      renderCustomIcon(step, isActive, isCompleted)
                    ) : (
                      <span
                        className={cn(
                          isActive
                            ? "text-subscription-red"
                            : isCompleted
                            ? "text-subscription-red"
                            : "text-blue-300"
                        )}
                      >
                        {step.icon}
                      </span>
                    )}
                  </div>
                )}

                {/* Label */}
                {showLabels &&
                  (renderCustomLabel ? (
                    renderCustomLabel(step, isActive, isCompleted)
                  ) : (
                    <div className="flex flex-col">
                      <span
                        className={cn(
                          "font-medium transition-colors",
                          isActive
                            ? "text-subscription-dark-gray"
                            : isCompleted
                            ? "text-subscription-dark-gray"
                            : "text-subscription-gray"
                        )}
                      >
                        {step.label}
                      </span>
                      {step.description && (
                        <span className="text-sm text-subscription-light-gray mt-1">
                          {step.description}
                        </span>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Progress Indicator Row (Circles and Lines) */}
      <div className="relative max-w-[82.5%] xl:max-w-[83.5%] lg:max-w-[85%] slg:max-w-[86%] md:max-w-[84%] smd:max-w-[85.5%] sm:max-w-[84%] mx-auto flex items-center justify-center">
        {steps.map((step, index) => {
          const state = getStepState(step);
          const isCompleted = state === "completed";
          const isActive = state === "active";
          const isLast = index === steps.length - 1;

          return (
            <div
              key={`progress-${step.id}`}
              className={cn(
                "flex items-center",
                !isLast && "flex-1" // Only apply flex-1 if not the last item
              )}
              onClick={() => onStepClick?.(step)}
            >
              {/* Circle */}
              <div
                className={cn(
                  "flex items-center justify-center rounded-full transition-all duration-300 flex-shrink-0",
                  isCompleted
                    ? completedColor
                    : isActive
                    ? color
                    : "bg-white border-2 border-red-100",
                  "size-7 sm:size-6",
                  onStepClick && "cursor-pointer hover:scale-110"
                )}
              >
                {isCompleted && (
                  <Check
                    className="text-white size-5 md:size-4"
                    strokeWidth={3}
                  />
                )}
                {!isCompleted && isActive && (
                  <div className="size-6 sm:size-5 rounded-full bg-white" />
                )}
              </div>

              {/* Connecting line after each circle except the last */}
              {!isLast && (
                <div
                  className={cn(
                    "transition-all duration-500 flex-grow",
                    index < steps.findIndex((s) => s.id === currentStatus)
                      ? completedColor
                      : index === steps.findIndex((s) => s.id === currentStatus)
                      ? progressColor
                      : pendingColor,
                    // If current status is delivered, all lines should be completed
                    currentStatus === "delivered" && completedColor
                  )}
                  style={{
                    height: lineThickness,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Icons and Labels Row */}
      <div className="flex mt-4">
        {steps.map((step, index) => {
          const state = getStepState(step);
          const isCompleted = state === "completed";
          const isActive = state === "active";

          return (
            <div
              key={`content-${step.id}`}
              className="flex flex-1 flex-col items-center"
              onClick={() => onStepClick?.(step)}
            >
              {/* Icon */}
              {showIcons && (
                <div
                  className={cn(
                    "flex items-center justify-center w-12 h-12 text-center",
                    isActive && "animate-bounce-subtle"
                  )}
                >
                  {renderCustomIcon ? (
                    renderCustomIcon(step, isActive, isCompleted)
                  ) : (
                    <span
                      className={cn(
                        isActive
                          ? "text-subscription-red"
                          : isCompleted
                          ? "text-subscription-red"
                          : "text-blue-300"
                      )}
                    >
                      {step.icon}
                    </span>
                  )}
                </div>
              )}

              {/* Label */}
              {showLabels &&
                (renderCustomLabel ? (
                  renderCustomLabel(step, isActive, isCompleted)
                ) : (
                  <span
                    className={cn(
                      "text-sm font-medium text-center transition-colors mt-1",
                      isActive
                        ? "text-subscription-dark-gray"
                        : isCompleted
                        ? "text-subscription-dark-gray"
                        : "text-subscription-gray"
                    )}
                  >
                    {step.label}
                  </span>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStepper;
