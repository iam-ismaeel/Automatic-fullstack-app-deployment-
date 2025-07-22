import useStore from "@/zustand/useStore";
import { useUserStore } from "@/zustand/userStore";
import { useSaveForLater } from "@/api/user";
import Link from "next/link";
import Image from "next/image";
import { Royco, Badge, Globe, WishList } from "@icons";
import { showerror, showsuccess } from "@/utils/showPopup";
import { Seller } from "@interfaces/products";
function SellerInfo({
  seller,
  productid,
}: {
  seller: Seller | undefined;
  productid: number | undefined;
}) {
  const { mutateAsync: handleSaveForLater, isPending } = useSaveForLater();
  const userStore = useStore(useUserStore, (state: any) => state);
  const user = userStore?.user;
  const handleSubmit = () => {
    if (!user?.user_id) {
      showerror("Login to add product to wishlist");
      return;
    }
    if (!productid) return;
    handleSaveForLater({ user_id: user.user_id, product_id: productid }).then(
      () => {
        showsuccess(`Save for later`);
      }
    );
  };
  if (!seller) {
    return null;
  }
  return (
    <div className="xl:flex xl:flex-col xl:items-end md:col-span-1 md:items-center">
      <div className="max-w-[280px] mx-auto xl:mx-0 w-full h-[325px] border border-[#DEE2E7] rounded-md shadow-md px-4 py-5 bg-white">
        <div className="flex gap-x-3 items-center">
          <div className="w-12 h-12 grid place-content-center text-[28px] bg-[#C6F3F1] text-[#4CA7A799] rounded-[4px]">
            {seller?.name.charAt(0)}
          </div>
          {/* <Royco className="w-12 h-12" /> */}
          <h6 className="max-w-[177px] text-[#1C1C1C]">{seller?.name}</h6>
        </div>
        <div className="border border-[#E0E0E0] my-4 "></div>
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center gap-x-4">
            {seller?.flag ? (
              <Image src={seller?.flag} alt="flag" width={24} height={24} />
            ) : (
              <p>🏳️</p>
            )}
            <label className="text-base-regular text-[#7f8a98]">
              {seller?.country}
            </label>
          </div>
          <div className="flex items-center gap-x-4">
            <Badge className="w-6 h-6" />
            <label className="text-base-regular text-[#7f8a98]">
              Verified Seller
            </label>
          </div>
          <div className="flex items-center gap-x-4">
            <Globe className="w-6 h-6" />
            <label className="text-base-regular text-[#7f8a98]">
              Worldwide shipping
            </label>
          </div>
        </div>
        <Link
          href={`/en/seller/${seller?.uuid}`}
          className="btn bg-primary-light w-full mt-7 text-white hover:text-primary-light"
        >
          Seller&apos;s Profile
        </Link>
      </div>
      <div className="max-w-[280px] mx-auto xl:mx-0    w-full mt-6 flex justify-center items-center gap-x-2">
        <WishList className="text-primary-light w-7 h-7" />
        <button
          onClick={handleSubmit}
          className="text-primary-light text-base-medium"
          disabled={isPending}
        >
          {!isPending ? "Save for later" : "loading.."}
        </button>
      </div>
    </div>
  );
}

export default SellerInfo;
