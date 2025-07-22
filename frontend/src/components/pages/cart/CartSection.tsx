import Aside from "./aside";
import { useFetchAllCartItemQuery } from "@/api/fetchAllCartItem";
import useStore from "@/zustand/useStore";
import { IUserStore, useUserStore } from "@/zustand/userStore";
import { Cart } from "@interfaces/cart";
import Loader from "@components/common/loader";
import CartList from "./CartList";

export default function CartSection() {
  const userStore = useStore<IUserStore, IUserStore>(
    useUserStore,
    (state: any) => state
  );

  const userId = userStore?.user?.user_id;
  const enabled = !!userId;

  const userCurrency = userStore?.user.data?.default_currency;

  const {
    data: cartDetail,
    isLoading: iscartDetailLoading,
    isError: isCartError,
  } = useFetchAllCartItemQuery(userId!, enabled);

  let cartResponse: Cart;
  cartResponse = cartDetail?.data as Cart;

  if (iscartDetailLoading) {
    return <Loader />;
  }
  return (
    <div>
      <h6 className="text-2xl font-inter font-semibold mb-6 flex items-center gap-1">
        My cart
        <span className="text-[#DB4444]">
          {`(${
            cartResponse?.local_items?.length! +
              cartResponse?.international_items?.length! || 0
          })`}
        </span>
      </h6>

      <div className="flex md:flex-col gap-5 relative">
        <CartList cartResponse={cartResponse} />
        <Aside data={cartResponse} userCurrency={userCurrency} />
      </div>
    </div>
  );
}
