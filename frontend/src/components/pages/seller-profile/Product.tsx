import Image from "next/image";
import productplaceholder from "../../../../public/img/product-placeholder.png";
import { SellerProduct } from "@/interfaces/seller";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function Product({ product }: { product: SellerProduct }) {
  const localActive = useLocale();
  return (
    <div className="border border-[#E5E7EB] rounded-lg bg-white">
      <div className="h-[200px] mb-3">
        <Image
          src={product.front_image || productplaceholder}
          alt="product"
          className="w-full h-full object-contain"
          height={300}
          width={200}
        />
      </div>
      <div className="px-2 py-2">
        <h4 className="mb-[10px]">{product.name}</h4>
        <p className="text-[#E02014] font-bold mb-2">${product.price || 0}</p>
        <div className="grid grid-cols-2 mb-3">
          <div className="border-r border-[#E5E7EB]">
            ⭐️ {product.total_reviews || 0}
          </div>
          <div className="text-right text-[#64748B]">
            {product.item_sold || 0} Sold
          </div>
        </div>
        <div className="flex gap-3">
          <button className="border-[#F3E8FF] border p-[10px] rounded-[10px]">
            💼
          </button>
          <Link
            href={`/${localActive}/product/${product.slug}`}
            className="border-[#E02014] border text-[#E02014] rounded-[10px] p-[10px] text-[14px] flex-1 flex justify-center"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
}
