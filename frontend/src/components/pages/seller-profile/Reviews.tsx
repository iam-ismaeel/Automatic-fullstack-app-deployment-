"use client";
import { useGetSellerReviewQuery } from "@/api/seller";
import EmptyData from "@/components/common/empty-data";
import StarRating from "@/components/common/star-rating";
import { ProductReview, ReviewType } from "@/interfaces/seller";
import Skeleton from "react-loading-skeleton";
import { format, parseISO } from "date-fns";
import { useEffect } from "react";

export default function Reviews({
  reviews,
  isLoading,
}: {
  reviews: ProductReview;
  isLoading: boolean;
}) {
  return (
    <div className="p-5 pb-10">
      <div className="grid grid-cols-2 gap-7 max-w-[1200px] mx-auto mb-16 ">
        {isLoading ? (
          ["_", "_", "_", "_"].map((v, i) => (
            <Skeleton key={i} width={"100%"} height={370} />
          ))
        ) : !reviews?.reviews.length ? (
          <div className="col-span-10">
            <EmptyData />
          </div>
        ) : (
          reviews?.reviews?.map((review, i) => (
            <>
              <Review review={review} key={i} />
              <Rating reviews={reviews} />
            </>
          ))
        )}
      </div>
    </div>
  );
}

function Review({ review }: { review: ReviewType }) {
  const formattedDate = format(parseISO(review.created_at), "d MMMM, yyyy");
  return (
    <div className="border border-[#0000001A] rounded-[20px] p-[30px] ">
      <div className="flex items-center justify-between mb-2">
        <StarRating rating={review.rating} size="3" />
        <div>...</div>
      </div>
      <h4 className="mb-3">
        {review.user.first_name} {review.user.last_name}
      </h4>
      <p className="mb-6 text-[#00000099]">{review.review}</p>
      <span className="text-[#00000099]">Posted on {formattedDate}</span>
    </div>
  );
}

function Rating({ reviews }: { reviews: ProductReview }) {
  const percentages = [0, 0, 0, 0, 0, 0];
  const length = reviews?.reviews?.length || 0;
  for (let i = 0; i < length; i++) {
    const currRating = reviews.reviews[i];
    percentages[currRating.rating] += 1;
  }
  const calcpercent = percentages.map((percent) => (percent / length) * 100);

  return (
    <div className="flex gap-12 max-w-[1440px] mx-auto p-[20px]">
      <div className="flex-1">
        <h4 className="text-[#020617] text-[31px] font-medium mb-7 ">
          Rating and Review
        </h4>
        <div className="flex items-center gap-10">
          <div className="flex flex-col gap-5">
            <span>{reviews?.overall_rating}</span>
            <StarRating size="5" rating={reviews?.overall_rating} />
            <span>{length} reviews</span>
          </div>
          <div className="flex-1">
            <RatingLine no={1} percent={calcpercent[1]} />
            <RatingLine no={2} percent={calcpercent[2]} />
            <RatingLine no={3} percent={calcpercent[3]} />
            <RatingLine no={4} percent={calcpercent[4]} />
            <RatingLine no={5} percent={calcpercent[5]} />
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-[#020617] text-[31px] font-medium mb-[61px]">
          Reviews
        </h4>
        <p>Showing 1 to 4 of 4 results</p>
      </div>
    </div>
  );
}
function RatingLine({ no, percent }: { no: number; percent: number }) {
  return (
    <div className="flex items-center">
      <span>{no}</span>
      <div className="ml-2 mr-[37px] h-3 flex-1 rounded-full bg-[#E2E8F0] overflow-hidden">
        <div
          className="bg-orange-400 h-full rounded-full "
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <span className="text-[#CBD5E1]">{percent}%</span>
    </div>
  );
}
