import { ApiClient } from "@/api/client/index";
import { HOMEPAGE_REF } from "@/api/client/endpoints";

export const homeProductsClient = {
  getProducDetailProduct: async (slug: string): Promise<any> =>
    ApiClient.get(HOMEPAGE_REF.GET_PRODUCT_DETAIL(slug)),

  getProductByCategory: async (slug: string): Promise<any> =>
    ApiClient.get(HOMEPAGE_REF.GET_CATEGORY_PRODUCT(slug)),

  postProductsReview: async (data: any) =>
    ApiClient.post(HOMEPAGE_REF.POST_PRODUCT_REVIEW, data),

  postSaveForLater: async (data: any) =>
    ApiClient.post(HOMEPAGE_REF.POST_SAVE_FOR_LATER, data),

  postAddToWishList: async (data: any) =>
    ApiClient.post(HOMEPAGE_REF.POST_ADD_TO_WISH_LIST, data),

  postMoveWishListCart: async (data: any) =>
    ApiClient.post(HOMEPAGE_REF.POST_MOVE_WISH_LIST_TO_CART, data),

  getAddToWishList: async (user_id: number): Promise<any> =>
    ApiClient.get(HOMEPAGE_REF.GET_ADD_TO_WISH_LIST(user_id)),
};
