import React, { Fragment } from "react";
import Item from "./item";
import { Cart } from "@interfaces/cart";
import { useUserStore } from "@/zustand/userStore";

function Review({ data }: { data: Cart }) {
  const { user } = useUserStore();
  return (
    <Fragment>
      <p className="text-[12px] font-normal">3 items in card</p>

      <div className="mt-4 space-y-4">
        {data?.local_items?.map((item, index) => (
          <Item
            key={index}
            item={item}
            removeParam={{ user_id: user.user_id, cart_id: 2 }}
          />
        ))}
        {data?.international_items?.map((item, index) => (
          <Item
            key={index}
            item={item}
            removeParam={{ user_id: user.user_id, cart_id: 2 }}
          />
        ))}
      </div>
    </Fragment>
  );
}

export default Review;
