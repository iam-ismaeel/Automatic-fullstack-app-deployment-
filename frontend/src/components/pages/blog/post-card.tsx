import React from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import Link from "next/link";
import { post } from "@/api/post";
import { format } from "date-fns";

interface PostCardProps {
  data: post;
  size: "small" | "medium" | "large" | "xlarge";
}

const sizeClasses = {
  small: {
    container: "w-[153px] h-[142px]",
    image: { width: 140, height: 146 },
  },
  medium: {
    container: "w-[184px] h-[170px]",
    image: { width: 184, height: 170 },
  },
  large: {
    container: "w-[324px] h-[307px]",
    image: { width: 184, height: 170 },
  },
  xlarge: {
    parentContainer: "w-[225px] h-[157px] justify-self-center",
    container: "w-[200px] h-[95px]",
    image: { width: 67, height: 69 },
  },
};

const PostCard = ({ data, size }: PostCardProps) => {
  const localActive = useLocale();
  const sizeClasses = {
    small: {
      container: "w-[153px] xsm:w-[145px] h-[142px] xsm:h-[135px",
      image: { width: 120, height: 126 },
      parentContainer: "", // Add parentContainer property for small size
    },
    medium: {
      container: "w-[184px] h-[170px]  ",
      image: { width: 184, height: 170 },
      parentContainer: "", // Add parentContainer property for medium size
    },
    large: {
      container: "w-[324px] h-[307px]  smd:w-[90%] sm:w-[100%] mx-auto",
      image: { width: 184, height: 170 },
      parentContainer: "smd:w-[95%] sm:w-[100%] ", // Add parentContainer property for large size
    },
    xlarge: {
      parentContainer:
        "w-[225px] smd:w-[100%] space-y-2 bg-white  px-3 py-4 rounded-[10px]",
      container: "w-[200px] smd:w-[100%]  h-[95px]",
      image: { width: 67, height: 69 },
    },
  };

  const { parentContainer, container, image } = sizeClasses[size];

  return (
    <Link
      href={`${localActive}/product/123`}
      className={`flex flex-col gap-2 ${parentContainer} mx-auto hover:cursor-pointer cursor-pointer`}
    >
      <div
        className={` bg-secondary-light ${container} flex items-center justify-center relative`}
      >
        <Image
          src={data.image}
          alt="Product"
          width={image.width}
          height={image.height}
          className="object-contain max-w-full max-h-full"
        />
      </div>

      <div className="flex flex-col gap-y-2">
        <h6 className="text-base-medium font-poppins text-black">
          {data.title}
        </h6>
        <label
          className={`absolute top-[13px] left-[11px] px-[6px] py-[2px] bg-[#DB4444] font-public-sans text-extra-small-regular text-white flex justify-center items-center rounded `}
        >
          {data.category}
        </label>

        <p className="flex items-center gap-x-3 text-small-medium">
          <time dateTime={data.date}>{format(data.date, "LLLL d, yyyy")}</time>
          {/*<span className="text-black">{`${data.date}`}</span>*/}
        </p>
      </div>
    </Link>
  );
};

export default PostCard;
