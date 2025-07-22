"use client";
import React, { useState } from "react";
import { Textarea, Button } from "rizzui";
import { useRouter } from "next/navigation";
import { StarRatingInput } from "./star-rating";
import { useUserStore } from "@/zustand/userStore";
import { useStore } from "zustand";
import { useAddReviewToProductMutation } from "@/api/user";
import { useQueryClient } from "@tanstack/react-query";
import { showsuccess } from "@/utils/showPopup";
import { HOMEPAGE_REF } from "@/api/client/endpoints";

const Reviewform = ({
  productid,
  setReviewState,
  slug,
}: {
  productid: number | undefined;
  setReviewState: any;
  slug: string;
}) => {
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [keyset, setKeyset] = useState(0);
  const router = useRouter();
  const userStore = useStore(useUserStore, (state: any) => state);
  const { mutateAsync: addReview, isPending: isSubmitting } =
    useAddReviewToProductMutation();
  const queryClient = useQueryClient();

  const user = userStore?.user;

  const handleSubmitReview = (e: any) => {
    e.preventDefault();
    if (!user.is_logged_in) {
      const currentPath = window.location.pathname;
      router.push(`/en/login?redirect=${currentPath}`);
      return;
    }
    if (!productid || !rating || !review) return;

    const newreview = {
      date: new Date().toISOString(),
      id: 100,
      rating: rating,
      review: review,
      user: `${user.data.first_name} ${user.data.last_name}`,
    };

    addReview({
      user_id: user.user_id,
      product_id: productid,
      rating: rating,
      review: review,
    }).then(() => {
      setReviewState((s: any) => {
        newreview.id = s.length + 1;
        return [newreview, ...s];
      });
      setReview("");
      setKeyset((s) => 1 - s);
      queryClient.invalidateQueries({
        queryKey: [HOMEPAGE_REF.GET_PRODUCT_DETAIL(slug)],
      });

      showsuccess(`Added review successfully`);
    });
  };
  return (
    <div className="py-7">
      <h6 className="text-extra-large-medium">Add a Review</h6>
      <p className="text-[#707070] text-small-regular">
        Your email address will not be published.
      </p>
      <form className="flex flex-col gap-y-4 mt-4">
        <div className="flex flex-col  gap-y-[2px]">
          <label htmlFor="review">
            Your Review <span>*</span>
          </label>
          <Textarea
            placeholder="Enter your Review"
            textareaClassName="border border-[#D8D8D8] "
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <div className="flex flex-col  gap-y-[2px]">
          <label>Your Rating</label>
          <StarRatingInput onchangerating={setRating} key={keyset} />
        </div>
        <Button
          rounded="lg"
          type="submit"
          className="w-full max-w-[200px] h-[45px] text-white  !text-base-bold !bg-primary"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          onClick={handleSubmitReview}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Reviewform;
