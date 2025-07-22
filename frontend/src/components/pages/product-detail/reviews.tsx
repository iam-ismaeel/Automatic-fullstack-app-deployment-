import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Comment } from "@icons";
import Review from "./review";
import Reviewform from "@/components/common/review-form";
import { Review as ReviewType } from "@/interfaces/products";

const Reviews = ({
  reviews,
  name,
  productid,
  slug,
}: {
  reviews: ReviewType[] | undefined;
  name: string | undefined;
  productid: number | undefined;
  slug: string;
}) => {
  const [more, setmore] = useState(3);
  const [reviewsstate, setReviewState] = useState<ReviewType[] | undefined>(
    undefined
  );
  useEffect(() => {
    setReviewState(reviews?.slice().reverse());
  }, [reviews, setReviewState]);

  if (!reviewsstate) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center smd:flex-wrap smd:gap-y-3 max-w-[475px] justify-between">
        <h6 className="text-large-medium text-black">
          {reviewsstate.length} Reviews for {name?.slice(0, 10) + "..."}
        </h6>
        <Link
          href={"#review-form"}
          className="flex items-center gap-x-[6px] border border-[#7E7E7E] py-3 px-5 rounded-md"
        >
          <Comment className="w-6 h-6" />
          <label className="text-base-medium text-main">Review</label>
        </Link>
      </div>
      <div className="reviews_parent">
        {reviewsstate.slice(0, more).map((review) => (
          <Review key={review.id} review={review} />
        ))}

        {more < reviewsstate.length && (
          <button
            className=" block mx-auto underline underline-offset-4 decoration-main text-main"
            onClick={() => setmore((s) => s + 3)}
          >
            See More...
          </button>
        )}
      </div>
      <div id="review-form">
        <Reviewform
          productid={productid}
          setReviewState={setReviewState}
          slug={slug}
        />
      </div>
    </div>
  );
};

export default Reviews;
