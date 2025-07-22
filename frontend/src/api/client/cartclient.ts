import { ApiClient } from "@/api/client/index";
import { HOMEPAGE_REF, PAYSTACK_REF } from "@/api/client/endpoints";
import { addCartItem } from "@interfaces/common";
import { Checkout } from "@interfaces/checkout";

export const cartclient = {
  getAllCartItem: async (user_id: number): Promise<any> =>
    ApiClient.get(HOMEPAGE_REF.GET_CART_ITEM(user_id)),
  removeCartItem: async (user_id: number, cart_id: number): Promise<any> =>
    ApiClient.delete(HOMEPAGE_REF.REMOVE_CART_ITEM(user_id, cart_id)),
  clearCart: async (user_id: number): Promise<any> =>
    ApiClient.delete(HOMEPAGE_REF.CLEAR_CART(user_id)),
  updateCarts: async (data: addCartItem): Promise<any> =>
    ApiClient.patch(HOMEPAGE_REF.UPDATE_CART, data),
  createCheckout: async (data: Checkout): Promise<any> =>
    ApiClient.post(PAYSTACK_REF.POST_CHECKOUT, data),
  getProfile: async (): Promise<any> => ApiClient.get(HOMEPAGE_REF.GET_PROFILE),
  getAddToWishList: async (user_id: number): Promise<any> =>
    ApiClient.get(HOMEPAGE_REF.GET_ADD_TO_WISH_LIST(user_id)),
};
