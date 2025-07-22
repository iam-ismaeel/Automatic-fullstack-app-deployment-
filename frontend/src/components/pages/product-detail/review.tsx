import React from "react";
import StarRating from "@/components/common/star-rating";
import { Review as ReviewType } from "@/interfaces/products";
import { format, parseISO } from "date-fns";

const Review = ({ review }: { review: ReviewType }) => {
  const formattedDate = format(parseISO(review.date), "d MMMM, yyyy");
  // const formattedDate = review.date;
  return (
    <div className={`py-6 flex flex-col gap-y-3  review`}>
      <div className="flex items-center gap-x-4">
        <h6 className="text-extra-large-medium font-libre-baskerville">
          {review.user}
        </h6>
        <label className="text-small-regular text-[#707070]">
          {formattedDate}
        </label>
      </div>
      <div>
        <StarRating rating={review.rating || 0} size="rating-md" />
      </div>
      <p className="text-base-regular text-[#707070] leading-6">
        {review.review}
      </p>
    </div>
  );
};

export default Review;
