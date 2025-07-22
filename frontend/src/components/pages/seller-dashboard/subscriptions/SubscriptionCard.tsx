"use client";
import React from "react";
import { Button, cn, Loader } from "rizzui";
import { Check } from "lucide-react";
import { IPlan } from "@/interfaces/seller";
import { countryToCurrencyMap } from "@/utils/currencymapper";
import { formatPrice } from "@/utils/formatPrice";
import useAuthStore from "@/zustand/authStore";

export interface PlanFeature {
  text: string;
  included: boolean;
}

interface SubscriptionCardProps {
  plan: IPlan;
  isSelected?: boolean;
  onClick?: () => void;
  actionButton?: React.ReactNode;
  showSelectButton?: boolean;
  isProcessing?: boolean;
  animationDelay?: string;
  isDowngradable?: boolean; // Add this prop
}

const parseDetails = (detailsHtml: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(detailsHtml, "text/html");

  // Extract header
  const header = doc.querySelector("h1")?.textContent || "";

  // Extract description (paragraphs before lists)
  const paragraphs = Array.from(doc.querySelectorAll("p"))
    .filter((p) => p.textContent?.trim() && !p.textContent.includes("<br>"))
    .map((p) => p.textContent)
    .join(" ");

  // Extract features (lists)
  const liElements = Array.from(doc.querySelectorAll("li"));
  const features = liElements.map((li) => ({
    text: li.textContent || "",
    included:
      li.textContent?.includes("List") ||
      (!li.textContent?.includes("❌") &&
        !li.textContent?.includes("Not included")),
  }));

  return { header, description: paragraphs, features };
};

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  plan,
  isSelected = false,
  onClick,
  actionButton,
  showSelectButton = false,
  isProcessing = false,
  animationDelay = "delay-100",
  isDowngradable = false, // Default to false
}) => {
  const { userData } = useAuthStore();
  const { header, description, features } = parseDetails(plan.details);
  const formattedPrice = `${countryToCurrencyMap(plan.currency)}${formatPrice(
    plan.cost
  )}`;

  return (
    <div
      className={cn(
        "card-base",
        animationDelay,
        isSelected && "border-4 border-subscription-green",
        !isSelected &&
          onClick &&
          "card-hover border-4 border-transparent hover:border-subscription-green/50",
        onClick && "cursor-pointer",
        !isDowngradable &&
          " border-opacity-50 hover:border-gray-400 hover:border-opacity-50"
      )}
      onClick={onClick}
    >
      <div className="space-y-5">
        <div>
          <span className="subscription-badge">{plan.title}</span>

          <div className="mt-4 flex items-end gap-2">
            <p className="text-subscription-dark-gray font-semibold text-2xl">
              {formattedPrice}
            </p>
            <p className="text-subscription-light-gray text-sm mb-0.5">
              {plan.period}
            </p>
          </div>
        </div>

        {/* Plan Header */}
        {header && (
          <h2 className="text-lg font-bold text-[#212529]">{header}</h2>
        )}

        {/* Plan Description */}
        {description && <p className="text-gray-800 text-sm">{description}</p>}

        {/* Features */}
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              {feature.included ? (
                <Check className="w-4 h-4 text-subscription-green mt-0.5 flex-shrink-0" />
              ) : (
                <div className="w-4 h-4 border border-subscription-light-gray rounded-full mt-0.5 flex-shrink-0" />
              )}
              <p
                className={cn(
                  "text-sm",
                  feature.included
                    ? "text-subscription-dark-gray"
                    : "text-subscription-light-gray"
                )}
              >
                {feature.text}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-4">
          {plan.id ===
            userData?.data?.user_subscription_plan?.subscription_plan_id &&
            !showSelectButton && (
              <div className="bg-subscription-green text-sm text-white text-center font-medium py-2 px-4 rounded-md w-full">
                Current Plan
              </div>
            )}

          {actionButton && actionButton}

          {showSelectButton &&
            plan.id !==
              userData?.data?.user_subscription_plan?.subscription_plan_id && (
              <Button
                disabled={isProcessing || !isDowngradable} // Disable if not downgradable
                isLoading={isProcessing}
                className={cn(
                  "bg-subscription-green dark:hover:bg-[#009b50] text-white w-full",
                  (isProcessing || !isDowngradable) &&
                    "opacity-50 bg-gray-400 dark:hover:bg-gray-400 b cursor-not-allowed"
                )}
              >
                Select Plan
              </Button>
            )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
