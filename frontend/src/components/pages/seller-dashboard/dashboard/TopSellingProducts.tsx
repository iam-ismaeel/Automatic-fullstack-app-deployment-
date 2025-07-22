import EmptyData from "@/components/common/empty-data";
import Flex from "@/components/common/Flex";
import SpaceBetween from "@/components/common/SpaceBetween";
import { TopSellingIcon } from "@/components/svg/seller/icons";
import Image from "next/image";

const TopSellingProducts = ({
  topSellingProducts,
}: {
  topSellingProducts: any[];
}) => {
  return (
    <div
      style={{
        boxShadow: "0px 5px 10px rgba(51, 66, 87, 0.05)",
      }}
      className="bg-white p-4 rounded-md bg- mb-4"
    >
      <Flex>
        <TopSellingIcon />
        <p className="text-[14px] text-[#334257] font-semibold">
          Top Selling Products
        </p>
      </Flex>
      {topSellingProducts?.length ? (
        <div className="mt-4 flex flex-col gap-4">
          {topSellingProducts.map((p, i) => (
            <SpaceBetween className="p-2 border rounded-md" key={i}>
              <Flex>
                <div className="size-[50px] rounded-full overflow-hidden">
                  <Image
                    src={p.front_image}
                    alt={p.slug}
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
                    Rating: ⭐ <b>{p.rating}</b>
                  </p>
                </div>
              </Flex>
              <div className="text-[13px] p-2 border rounded-md text-[#0D6EFD]">
                Sold: <b>{p.sold}</b>
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

export default TopSellingProducts;
