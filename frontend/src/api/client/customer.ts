import { QueryBuilder } from "@/utils/queryBuilder";
import { ApiClient } from ".";
import { CUSTOMER_ENDPOINTS } from "./endpoints";

export const customerClient = {
  getDashboardAnalytics: async (userId: string): Promise<any> =>
    ApiClient.get(CUSTOMER_ENDPOINTS.GET_DASHBOARD_ANALYTICS(userId)),
  getRewardPointsAnalytics: async (userId: string): Promise<any> =>
    ApiClient.get(CUSTOMER_ENDPOINTS.GET_REWARD_POINTS_ANALYTICS(userId)),
  getRewardPointsActivities: async (userId: string): Promise<any> =>
    ApiClient.get(CUSTOMER_ENDPOINTS.GET_REWARD_POINTS_ACTIVITIES(userId)),
  getAccountOverview: async (userId: string): Promise<any> =>
    ApiClient.get(CUSTOMER_ENDPOINTS.GET_ACCOUNT_OVERVIEW(userId)),
  getRecentOrders: async (userId: string): Promise<any> =>
    ApiClient.get(CUSTOMER_ENDPOINTS.GET_RECENT_ORDERS(userId)),
  getAllOrders: async (userId: string, params?: any): Promise<any> =>
    ApiClient.get(
      CUSTOMER_ENDPOINTS.GET_ALL_ORDERS(userId) + QueryBuilder(params)
    ),
  getWishlist: async (userId: string): Promise<any> =>
    ApiClient.get(CUSTOMER_ENDPOINTS.GET_WISHLIST(userId)),
  getOrderDetails: async (order_no: string): Promise<any> =>
    ApiClient.get(CUSTOMER_ENDPOINTS.GET_ORDER_DETAILS(order_no)),
};
