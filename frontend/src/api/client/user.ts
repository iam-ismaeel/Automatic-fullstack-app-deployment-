import { IParams } from "@/interfaces/client";
import { ApiClient } from ".";
import API_ENDPOINTS, {
  HOMEPAGE_REF,
  PUBLIC_ENDPOINTS,
  SELLER_ENDPOINTS,
} from "./endpoints";
import { IProfile } from "@/interfaces/api";
import {
  CreateSellerPayload,
  IDashboardAnalyticsResponse,
  IGetOrdersResponse,
  ILoginPayload,
} from "@/interfaces/seller";
import {
  addCartItem,
  IBannerResponse,
  ICountryResponse,
} from "@/interfaces/common";
import { IWithdrawFunds } from "@/interfaces/affiliate";
import { QueryBuilder } from "@/utils/queryBuilder";

const userClient = {
  getProfile: (
    params: IParams,
    headers: Record<string, string> = {}
  ): Promise<IProfile> =>
    ApiClient.get(API_ENDPOINTS.GET_PROFILE, params, headers),
  updateProfile: async (data: FormData, user_id: string): Promise<any> =>
    ApiClient.post(API_ENDPOINTS.UPDATE_PROFILE(user_id), data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  getBanners: (): Promise<IBannerResponse> =>
    ApiClient.get(SELLER_ENDPOINTS.GET_BANNERS),
  createSellerWithCoupon: async (
    data: CreateSellerPayload,
    coupon: string
  ): Promise<any> =>
    ApiClient.post(SELLER_ENDPOINTS.CREATE_SELLER_WITH_COUPON(coupon), data),
  createSellerWithReferrer: async (
    data: CreateSellerPayload,
    referrer: string
  ): Promise<any> =>
    ApiClient.post(
      SELLER_ENDPOINTS.CREATE_SELLER_WITH_REFERRER(referrer),
      data
    ),
  addToCarts: async (data: addCartItem): Promise<any> =>
    ApiClient.post(HOMEPAGE_REF.ADD_TO_CART, data),
  loginSeller: async (data: ILoginPayload): Promise<any> =>
    ApiClient.post(PUBLIC_ENDPOINTS.LOGIN, data),
  getCountries: (): Promise<ICountryResponse> =>
    ApiClient.get(PUBLIC_ENDPOINTS.COUNTRY),
  getStates: (id: string): Promise<ICountryResponse> =>
    ApiClient.get(PUBLIC_ENDPOINTS.STATE(id)),
  getDashboardAnalytics: (
    user_id: string
  ): Promise<IDashboardAnalyticsResponse> =>
    ApiClient.get(SELLER_ENDPOINTS.DASHBOARD_ANALYTICS(user_id)),
  getTopSellingProducts: (user_id: string): Promise<IBannerResponse> =>
    ApiClient.get(SELLER_ENDPOINTS.TOP_SELLING_PRODUCT(user_id)),
  getOrders: (user_id: string, params?: any): Promise<IGetOrdersResponse> =>
    ApiClient.get(SELLER_ENDPOINTS.GET_ORDERS(user_id) + QueryBuilder(params)),
  getOrderDetails: async (id: string, userId: string): Promise<any> =>
    ApiClient.get(SELLER_ENDPOINTS.GET_ORDER_DETAILS(userId) + `/${id}`),
  getPlanByCountry: (country_id: string): Promise<any> =>
    ApiClient.get(SELLER_ENDPOINTS.GET_PLAN_BY_COUNTRY(country_id)),
  payForSubscription: async (data: any): Promise<any> =>
    ApiClient.post(SELLER_ENDPOINTS.PAY_FOR_SUBSCRIPTION, data),
  verifySubscription: (country_id: string, reference: string): Promise<any> =>
    ApiClient.get(SELLER_ENDPOINTS.VERIFY_PAYMENT(country_id, reference)),
  getSubscriptionHistory: (user_id: string): Promise<any> =>
    ApiClient.get(SELLER_ENDPOINTS.GET_SUSBCRIPTION_HISTORY(user_id)),
  getWithdrawalHistory: (user_id: string, currentPage?: number): Promise<any> =>
    ApiClient.get(
      SELLER_ENDPOINTS.GET_WITHDRAWAL_HISTORY(user_id, currentPage)
    ),
  getSellersDetail: (seller_id: string): Promise<any> =>
    ApiClient.get(SELLER_ENDPOINTS.GET_SELLERS_DETAIL(seller_id)),
  getSellersReviewDetail: (seller_id: string): Promise<any> =>
    ApiClient.get(SELLER_ENDPOINTS.GET_SELLERS_REVIEW_DETAIL(seller_id)),
  getSellersCategoryDetail: (seller_id: string): Promise<any> =>
    ApiClient.get(SELLER_ENDPOINTS.GET_SELLERS_CATEGORY_DETAIL(seller_id)),
  getSellerPaymentMethod: async (userId: string): Promise<any> =>
    ApiClient.get(SELLER_ENDPOINTS.GET_SELLER_PAYMENT_METHOD(userId)),
  withdrawSellerFunds: async (data: IWithdrawFunds): Promise<any> =>
    ApiClient.post(SELLER_ENDPOINTS.SELLER_WITHDRAW, data),
  updateOrderStatus: async (
    user_id: number,
    order_id: number,
    data: any
  ): Promise<any> =>
    ApiClient.patch(
      SELLER_ENDPOINTS.UPDATE_ORDER_STATUS(user_id, order_id),
      data
    ),
};

export default userClient;
