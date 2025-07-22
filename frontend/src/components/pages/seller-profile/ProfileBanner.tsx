import Image from "next/image";

import { SearchIcon } from "../../svg";
import StarRating from "@/components/common/star-rating";
import profileplaceholder from "../../../../public/img/profileavatar.png";
import { ProductReview, SellerData } from "@/interfaces/seller";
import Skeleton from "react-loading-skeleton";

export default function ProfileBanner({
  active,
  setActive,
  details,
  reviews,
  categorieslength,
  isLoading,
}: {
  active: any;
  setActive: any;
  details: SellerData;
  reviews: ProductReview;
  categorieslength: number;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="max-w-[1297px] mx-auto shadow-lg  rounded-3xl -translate-y-[100px] overflow-hidden">
        <Skeleton width={"100%"} height={200} />
      </div>
    );
  }
  return (
    <div className="max-w-[1297px] mx-auto bg-white shadow-lg p-5 rounded-3xl -translate-y-[100px]">
      <div className="flex items-center  gap-5">
        <div>
          <Image
            alt="seller"
            src={details?.image || profileplaceholder}
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <div className="flex-1 border-r border-[#a7a9b1] pr-3">
          <h3 className="flex gap-2 font-bold items-center mb-2">
            {details?.first_name} {details?.last_name}
          </h3>
          <p className="flex gap-3 text-[#a7a9b1] mb-2">
            <span>{details?.product_count || 0} Items </span>
            <span>| </span>
            <span>{categorieslength} Categorise</span>
          </p>
          {/* <p className="text-[#a7a9b1]">
              Welcome to azany seller shop and blah Welcome to azany seller shop
              and blah Welcome to azany seller shop and blah Welcome to azany
              seller shop and blah{" "}
            </p> */}
        </div>
        <div className="flex flex-col items-center">
          <p>
            {reviews?.overall_rating} ({reviews?.reviews?.length})
          </p>
          <StarRating rating={reviews?.overall_rating} size="large" />
        </div>
      </div>
      <div className="flex mt-5">
        <div className="flex flex-1 items-center gap-2">
          <button
            onClick={() => setActive(0)}
            className={`${
              active == 0 ? "bg-[#0F60FF] text-white" : "bg-white"
            } hover:bg-[#0F60FF] hover:text-white px-4 py-[14px] rounded-[12px]`}
          >
            All Products
          </button>
          <button
            onClick={() => setActive(1)}
            className={`${
              active == 1 ? "bg-[#0F60FF] text-white" : "bg-white"
            } hover:bg-[#0F60FF] hover:text-white px-4 py-[14px] rounded-[12px]`}
          >
            Categories
          </button>
          <button
            onClick={() => setActive(2)}
            className={`${
              active == 2 ? "bg-[#0F60FF] text-white" : "bg-white"
            } hover:bg-[#0F60FF] hover:text-white px-4 py-[14px] rounded-[12px]`}
          >
            Reviews
          </button>
        </div>
        <SearchInput />
      </div>
    </div>
  );
}

function SearchInput() {
  return (
    <div className="flex items-center bg-[#F1F5F9] border-[#E2E8F0] border rounded-lg w-[433px] overflow-hidden  px-[12px]">
      <input
        type="text "
        placeholder="Search product"
        className="flex-1 py-[15px] border-none bg-inherit"
      />
      <button className="    flex items-center justify-center">
        <SearchIcon className="w-6 h-6" />
      </button>
    </div>
  );
}
