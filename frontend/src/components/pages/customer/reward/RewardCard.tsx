import { Button } from "rizzui";

type RewardProps = {
  title: string;
  points: number;
  availablePoints: number; // New prop for user's available points
};

const RewardCard = ({ title, points, availablePoints }: RewardProps) => {
  // Determine if the user has enough points for this reward
  const hasEnoughPoints = availablePoints >= points;

  return (
    <div className="bg-white p-4 rounded-lg border text-center">
      <div className="font-bold text-lg mb-2">{title}</div>
      <div
        className={`mb-4 ${hasEnoughPoints ? "text-gray-600" : "text-red-500"}`}
      >
        {points} points
      </div>

      {!hasEnoughPoints && (
        <div className="text-[10px] text-red-500 mb-2">
          You need {points - availablePoints} more points
        </div>
      )}

      <Button
        className={`px-4 py-2 rounded ${
          hasEnoughPoints
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!hasEnoughPoints}
        onClick={() => hasEnoughPoints && console.log(`Redeeming ${title}`)}
      >
        Redeem
      </Button>
    </div>
  );
};

export default RewardCard;
