import EmptyData from "@/components/common/empty-data";
import Flex from "@/components/common/Flex";
import SpaceBetween from "@/components/common/SpaceBetween";
import { TopRatedIcon } from "@/components/svg/seller/icons";
import Image from "next/image";

const TopRatedProducts = ({
  topRatedProducts,
}: {
  topRatedProducts: any[];
}) => {
  return (
    <div
      style={{
        boxShadow: "0px 5px 10px rgba(51, 66, 87, 0.05)",
      }}
      className="p-4 rounded-md bg-white"
    >
      <Flex>
        <TopRatedIcon />
        <p className="text-[14px] text-[#334257] font-semibold">
          Top Rated Products
        </p>
      </Flex>

      {topRatedProducts?.length ? (
        <div className="mt-4 flex flex-col gap-4">
          {topRatedProducts.map((p, i) => (
            <SpaceBetween className="p-2 border rounded-md" key={i}>
              <Flex>
                <div className="size-[50px] rounded-full overflow-hidden">
                  <Image
                    src={p.image}
                    alt="product image"
                    width={120}
                    height={120}
                    className="w-full"
                  />
                </div>
                <div>
                  <p className="text-[14px] text-[#212529] font-medium">
                    {p.name}
                  </p>
                  <p className="text-[13px] text-[#0D6EFD]">
                    Sold: <b>{p.sold_count}</b>
                  </p>
                </div>
              </Flex>
              <div className="p-2 border rounded-md">
                <p className="text-[12px] text-[#A855F7] font-medium">
                  Rating: ⭐ <b>{p.average_rating}</b>
                </p>
              </div>
            </SpaceBetween>
          ))}
        </div>
      ) : (
        <EmptyData />
      )}
    </div>
  );
};

export default TopRatedProducts;
