import React from "react";
import Image from "next/image";
import { productModel } from "@/interfaces/products";
import { useLocale } from "next-intl";
import Link from "next/link";
import { countryToCurrencyMap } from "@/utils/currencymapper";
import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils";
import { calculateDiscountPercentage } from "@/utils/calculateDiscountPercentage";

interface ProductCardProps {
  data: productModel;
  size: "small" | "medium" | "large" | "xlarge";
}

const ProductCard = ({ data, size }: ProductCardProps) => {
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
      image: { width: 140, height: 126 },
    },
  };

  const { parentContainer, container, image } = sizeClasses[size];

  return (
    <Link
      href={`${localActive}/product/${data.slug}`}
      className={`flex flex-col gap-2 ${parentContainer} mx-auto hover:cursor-pointer cursor-pointer`}
    >
      <div
        className={` bg-secondary-light ${container} flex items-center justify-center relative`}
      >
        {data.discount_price !== "" && (
          <label
            className={`absolute top-[13px] left-[11px] px-[6px] py-[2px] bg-[#DB4444] font-public-sans text-extra-small-regular text-white flex justify-center items-center rounded truncate`}
          >
            {/* {truncateText(data.slug, 15)} */}
            {countryToCurrencyMap(data.currency || data.default_currency) +
              data.discount_price}
          </label>
        )}
        <Image
          src={data.front_image || data.image}
          alt="Product"
          width={image.width}
          height={image.height}
          className="object-contain max-w-full max-h-full"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <h6 className="text-base-medium font-poppins text-black">
          {data.name}
        </h6>

        <p className="flex items-center gap-x-1 text-small-medium">
          <span className="text-primary">
            {countryToCurrencyMap(data.currency || data.default_currency) +
              formatPrice(data.price)}
          </span>
          {data.discount_price !== "" && (
            <span className="text-xs leading-[18px] font-light text-[#000000b1] self-end">
              {calculateDiscountPercentage(data.price, data.discount_price)}%
              off
            </span>
          )}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
