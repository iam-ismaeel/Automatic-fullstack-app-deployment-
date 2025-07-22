import { useWishListQuery } from "@/api/user";
import Saved from "./saved";
import { useUserStore } from "@/zustand/userStore";
import EmptyData from "@/components/common/empty-data";

export default function SavedForLater() {
  const { user } = useUserStore();
  const { data } = useWishListQuery(user.user_id, true);
  const savedproduct = data?.data;

  return (
    <div className="bg-white p-4 mt-[35px] rounded-md">
      {/* /user/customer/wishlist/{user_id} */}
      <h4 className="text-extra-large-medium">Saved for later</h4>

      <div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 mt-4">
        {savedproduct?.length == 0 ? (
          <EmptyData />
        ) : (
          savedproduct?.map((product, i) => <Saved product={product} key={i} />)
        )}
      </div>
    </div>
  );
}
