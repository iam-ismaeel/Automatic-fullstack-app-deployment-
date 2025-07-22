"use client";
import { useGetCountryQuery } from "@/api/country";
import { useGetPlanByCountryQuery } from "@/api/seller";
import { usePayForSubscriptionMutation } from "@/api/seller";
import EmptyData from "@/components/common/empty-data";
import CustomCountrySelector from "@/components/pages/seller-dashboard/subscriptions/custom-country-selector";
import CustomLoader from "@/components/pages/seller-dashboard/subscriptions/custom-loader";
import SubscriptionHeader from "@/components/pages/seller-dashboard/subscriptions/SubscriptionHeader";
import SubscriptionHistory from "@/components/pages/seller-dashboard/subscriptions/SubscriptionHistory";
import SubscriptionCard from "@/components/pages/seller-dashboard/subscriptions/SubscriptionCard";
import { ICountry, IPlan } from "@/interfaces/seller";
import { countryToCurrencyMap } from "@/utils/currencymapper";
import { formatPrice } from "@/utils/formatPrice";
import useAuthStore from "@/zustand/authStore";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { toast } from "sonner";
import { getAvailablePaymentMethods } from "@/utils";
import InputPaymentDetailsModal from "@/components/common/InputPaymentDetailsModal";

const SubscriptionPage = () => {
  const { mutateAsync, isPending } = usePayForSubscriptionMutation();

  const { userData } = useAuthStore();
  // Get user's country ID from userData
  const userCountryId = userData?.data?.country_id;

  const PATH_NAME = usePathname();
  const [viewMode, setViewMode] = useState<"subscribed" | "change">(
    "subscribed"
  );
  const [selectedCountry, setSelectedCountry] = useState<ICountry>();
  const [processingPlanId, setProcessingPlanId] = useState<number | null>(null);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [pendingPaymentPlan, setPendingPaymentPlan] = useState<IPlan | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const { data: countryData, isPending: loadingCountry } = useGetCountryQuery();
  const countryList = countryData?.data ?? [];

  const initialCountry = countryList?.find(
    (c) => c.id === parseInt(userCountryId!)
  );

  const { data: countryPlan, isPending: fetchingPlans } =
    useGetPlanByCountryQuery(
      selectedCountry?.country_id ? `${selectedCountry.country_id}` : undefined
    );

  const countryPlansList = countryPlan?.data ?? [];
  const currentPlanId =
    userData?.data?.user_subscription_plan?.subscription_plan_id;

  // Find the current user's plan
  const currentPlan = countryPlansList.find(
    (plan) => plan.id === currentPlanId
  );

  // Check if the current plan is a premium plan (assuming it's the last/highest tier plan)
  const isPremiumPlan =
    currentPlan === countryPlansList[countryPlansList.length - 1];

  useEffect(() => {
    if (!selectedCountry && initialCountry) {
      setSelectedCountry(initialCountry);
    }
  }, [initialCountry, selectedCountry]);

  // Determine if a plan is downgradable
  const isDowngradable = (plan: IPlan) => {
    if (!currentPlanId) return true; // If no current plan, all plans are selectable
    const currentPlanIndex = countryPlansList.findIndex(
      (p) => p.id === currentPlanId
    );
    const planIndex = countryPlansList.findIndex((p) => p.id === plan.id);
    return planIndex >= currentPlanIndex; // Allow only plans that are equal or higher
  };

  const handleChangePlan = async (plan: IPlan) => {
    if (plan.id === currentPlanId) return;

    // Get available payment methods for the user's country
    const availablePaymentMethods = getAvailablePaymentMethods(userCountryId!);

    // Check if payment methods are available
    if (availablePaymentMethods.length === 0) {
      toast.error("No payment methods available for your country");
      return;
    }

    // If Paystack is available, directly use the mutation
    if (availablePaymentMethods.includes("paystack")) {
      try {
        setProcessingPlanId(plan.id);
        const response = await mutateAsync({
          amount: plan.cost,
          type: "paystack", // Specify paystack as the payment method
          email: userData?.data?.email as string,
          redirect_url: process.env.NEXT_PUBLIC_APP_URL + PATH_NAME,
          subscription_plan_id: plan.id,
          user_id: userData?.data?.id as number,
        });
        window.open(response?.url);
      } catch (error: any) {
        toast.error(`${error.message}`);
      } finally {
        setProcessingPlanId(null);
      }
    }
    // If Authorize is available, show the payment modal
    else if (availablePaymentMethods.includes("authorize")) {
      setPendingPaymentPlan(plan);
      setPaymentModalOpen(true);
    }
  };

  // Handle the payment after entering card details
  const handlePay = async (cardDetails: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  }) => {
    if (!pendingPaymentPlan) return;

    try {
      setLoading(true);
      const response = await mutateAsync({
        amount: pendingPaymentPlan.cost,
        type: "authorize", // Specify authorize as the payment method
        email: userData?.data?.email as string,
        subscription_plan_id: pendingPaymentPlan.id,
        user_id: userData?.data?.id as number,
        // Include card details for authorize payments
        card_number: cardDetails.cardNumber,
        expiration_date: cardDetails.expiryDate,
        card_code: cardDetails.cvv,
      });

      // Handle successful payment
      toast.success("Payment processed successfully");
      setPaymentModalOpen(false);
      setPendingPaymentPlan(null);

      // Redirect if needed
      if (response?.url) {
        window.open(response.url);
      }
    } catch (error: any) {
      toast.error(`Payment failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SubscriptionHeader viewMode={viewMode} onChangeMode={setViewMode}>
        <CustomCountrySelector
          selectedCountry={selectedCountry}
          countries={countryList}
          onSelectCountry={(country) => setSelectedCountry(country)}
          isLoading={loadingCountry}
        />
      </SubscriptionHeader>

      {fetchingPlans ? (
        <CustomLoader loadingText="Loading subscription plans" />
      ) : countryPlansList?.length ? (
        <Fragment>
          <div className="grid grid-cols-3 lg:grid-cols-2 smd:grid-cols-1 gap-4">
            {countryPlansList?.map((plan, index) => (
              <SubscriptionCard
                key={plan.id}
                plan={plan}
                isSelected={
                  viewMode === "subscribed" && plan.id === currentPlanId
                }
                onClick={
                  viewMode === "change"
                    ? () => handleChangePlan(plan)
                    : undefined
                }
                showSelectButton={viewMode === "change"}
                isProcessing={processingPlanId === plan.id}
                animationDelay={`delay-${index * 100}`}
                isDowngradable={isDowngradable(plan)}
              />
            ))}
          </div>

          {viewMode === "subscribed" && !isPremiumPlan && (
            <p className="max-w-[1000px] mx-auto text-center text-[#787E88] font-medium mt-8">
              &quot;Upgrade your plan to unlock advanced tools, enhanced
              visibility, and exclusive marketing opportunities that drive
              growth. Enjoy priority support, deeper analytics, and increased
              product listings, all designed to streamline your operations and
              boost sales. Take your business to the next level with our premium
              plans today!&quot;
            </p>
          )}
        </Fragment>
      ) : (
        <EmptyData message="No subscription plan available for selected country" />
      )}
      {viewMode === "subscribed" && <SubscriptionHistory />}

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <InputPaymentDetailsModal
          onClose={() => setPaymentModalOpen(false)}
          onPay={handlePay}
          loading={loading}
        />
      )}
    </div>
  );
};

export default SubscriptionPage;
