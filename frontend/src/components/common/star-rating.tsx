import React, { Dispatch, SetStateAction, useState } from "react";

const StarRating = ({ rating, size }: { rating?: number; size?: string }) => {
  rating = Math.ceil(rating || 0);
  const totalStars = 5;

  return (
    <div className={`rating ${size}`}>
      {[...Array(totalStars)].map((_, index) => (
        <input
          key={index}
          type="radio"
          name="rating-1"
          className={`mask mask-star ${
            rating > index
              ? " bg-orange-400 text-orange-400"
              : " bg-orange-100 text-orange-100"
          }`}
          defaultChecked={index <= rating}
          disabled
        />
      ))}
    </div>
  );
};

export const StarRatingInput = ({
  onchangerating,
}: {
  onchangerating: Dispatch<SetStateAction<number>>;
}) => {
  const totalStars = 5;
  const [rating, setRating] = useState(0);

  return (
    <div className="rating">
      {[...Array(5)].map((_, index) => (
        <input
          key={index}
          type="radio"
          name="rating-1"
          className={`mask mask-star ${
            rating >= index
              ? " bg-orange-500 text-orange-500"
              : " bg-orange-300 text-orange-300 "
          }`}
          onChange={() => {
            setRating(index);
            onchangerating(index + 1);
          }}
        />
      ))}
    </div>
  );
};

export default StarRating;
