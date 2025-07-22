import React from "react";
import Image from "next/image";
import { RewardPoints } from "@/interfaces/user";
import { Button } from "rizzui";
import { countryToCurrencyMap } from "@/utils/currencymapper";
import { useLocale } from "next-intl";

interface UserReward {
  id: number;
  user_id: number;
  action_id: number;
  points: number;
  value: number;
  currency: string;
  action: {
    id: number;
    name: string;
    icon: string;
    points: number;
  };
}

interface ActionCardProps {
  rewards: RewardPoints[];
  userRewards: UserReward[];
}

const ActionCard: React.FC<ActionCardProps> = ({ rewards, userRewards }) => {
  const localActive = useLocale();

  // Define the action handlers
  const actionHandlers: Record<string, () => void> = {
    "follow us on instagram": () =>
      window.open("https://instagram.com/your_account", "_blank"),
    "follow us on twitter": () =>
      window.open("https://twitter.com/your_account", "_blank"),
    "like our facebook page": () =>
      window.open("https://facebook.com/your_page", "_blank"),
    "refer a friend": () => window.open(`/${localActive}`, "_blank"),
    "purchase an item": () => window.open(`/${localActive}`, "_blank"),
    // Add more actions here as needed
  };

  const handleAction = (reward: RewardPoints) => {
    const handler = actionHandlers[reward.name.toLowerCase()];

    if (handler) {
      handler(); // Execute the action handler
      // Normally, you would make an API call here to confirm completion
      // and update the userRewards data on the server.
    } else {
      alert("This action requires manual verification.");
    }
  };

  return (
    <>
      {rewards?.map((reward) => {
        // Check if the reward is completed by matching action_id in userRewards
        const isCompleted = userRewards.some(
          (ur) => ur.action_id === reward.id
        );
        const userReward = userRewards.find((ur) => ur.action_id === reward.id); // Find matching user_reward
        const buttonClass = isCompleted
          ? "bg-white border border-[#E3E3E3] text-[#888888] cursor-not-allowed"
          : "bg-white border border-[#FF3333] text-[#FF3333] hover:bg-[#fff8f8] dark:hover:bg-[#fff8f8]";

        return (
          <div
            key={reward.id}
            className="bg-white py-7 px-5 rounded-lg border text-center flex flex-col justify-between items-center"
          >
            <div className="flex flex-col items-center">
              {reward.icon && (
                <div className="mb-3">
                  <Image
                    src={reward.icon}
                    alt={reward.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
              )}
              <div className="text-[#555555] font-bold mb-2">{reward.name}</div>

              <div className="flex gap-1 items-center">
                <div className="text-sm text-[#8B909A] mb-4">
                  {reward.points} points
                </div>
                {/* Display value if the reward is completed */}
                {isCompleted && userReward && (
                  <div className="text-sm text-[#8B909A] mb-4">
                    {" "}
                    {" = "}
                    {countryToCurrencyMap(userReward.currency)}
                    {userReward.value}
                  </div>
                )}
              </div>
            </div>

            <Button
              className={`px-5 py-2 rounded text-sm ${buttonClass}`}
              disabled={isCompleted}
              onClick={() => handleAction(reward)}
            >
              {isCompleted ? "Completed" : "Complete Action"}
            </Button>
          </div>
        );
      })}
    </>
  );
};

export default ActionCard;
