import Image from "next/image";
import React from "react";
import productplaceholder from "../../../../public/img/product-placeholder.png";
import StarRating from "@/components/common/star-rating";
import { productModel } from "@/interfaces/products";
import Link from "next/link";
import { useLocale } from "next-intl";
import { formatPrice } from "@/utils/formatPrice";
import { countryToCurrencyMap } from "@/utils/currencymapper";

function Product({ product }: { product: productModel }) {
  const localActive = useLocale();

  return (
    <Link
      href={`/${localActive}/product/${product.slug}`}
      className="border p-[30px] smd:p-5 border-[#E5E7EB] rounded bg-transparent "
    >
      {/* <span className="text-[#999999]">{product.subcategory}</span> */}
      <h4 className="mb-1 mt-1 ">{product.name}</h4>
      <div className="h-[200px] mb-3">
        <Image
          src={product?.image || productplaceholder}
          alt="product"
          className="w-full h-full object-contain"
          width={200}
          height={300}
        />
      </div>
      <p className="text-right text-[11px] text-[#999999] ">
        {" "}
        ({product?.total_reviews || 0} reviews)
      </p>

      <div className="flex gap-3 items-center smd:flex-col smd:items-start sm:flex-row sm:items-center">
        <span>
          {countryToCurrencyMap(product.currency || product.default_currency) +
            formatPrice(product.price)}
        </span>
        <StarRating rating={product?.average_rating || 0} size="3" />
      </div>
    </Link>
  );
}

export default Product;
