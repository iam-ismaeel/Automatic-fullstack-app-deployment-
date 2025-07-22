import EmptyData from "@/components/common/empty-data";
import Flex from "@/components/common/Flex";
import SpaceBetween from "@/components/common/SpaceBetween";
import { TopFavoriteIcon } from "@/components/svg/seller/icons";
import Image from "next/image";

const TopFavouriteProducts = ({
  topFavouriteProducts,
}: {
  topFavouriteProducts: any[];
}) => {
  return (
    <div
      style={{
        boxShadow: "0px 5px 10px rgba(51, 66, 87, 0.05)",
      }}
      className="p-4 w-full rounded-md bg-white"
    >
      <Flex>
        <TopFavoriteIcon />
        <p className="text-[14px] text-[#334257] font-semibold">
          Most Favorite Products
        </p>
      </Flex>

      {/* {topSellingProducts.map((p, i) => (
          <SpaceBetween className="p-2 border rounded-md" key={i}>
            <Flex>
              <div className="size-[50px] rounded-full overflow-hidden">
                <Image
                  src={p.img}
                  alt="product-image"
                  width={120}
                  height={120}
                  className="w-full"
                />
              </div>
              <div>
                <p className="text-[14px] text-[#212529] font-medium">
                  {p.name}
                </p>

                <p className="text-[12px] text-[#A855F7] font-medium">
                  Sold: <b>{p.sold}</b> | Rating: ⭐ <b>{p.rating}</b>
                </p>
              </div>
            </Flex>
            <div className="text-[13px] p-2 border rounded-md text-[#0D6EFD]">
              4 ❤️
            </div>
          </SpaceBetween>
        ))} */}

      {topFavouriteProducts?.length ? (
        <div className="mt-4 flex flex-col gap-4">
          {topFavouriteProducts.map((p, i) => (
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
                  <p className="text-[12px] text-[#A855F7] font-medium">
                    Sold: <b>{p.sold_count}</b> | Rating: ⭐{" "}
                    <b>{p.average_rating}</b>
                  </p>
                </div>
              </Flex>

              <div className="text-[13px] p-2 border rounded-md text-[#0D6EFD]">
                {p.wishlist_count} ❤️
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

export default TopFavouriteProducts;
