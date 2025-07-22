import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CUSTOMER_ENDPOINTS } from "./client/endpoints";
import ProcessError from "@/utils/error";
import { customerClient } from "@/api/client/customer";
import useAuthStore from "@/zustand/authStore";
import { IOrder } from "@/interfaces/products";

export const useGetDashboardAnalyticsQuery = (userId: string) => {
  return useQuery({
    queryKey: [CUSTOMER_ENDPOINTS.GET_DASHBOARD_ANALYTICS(userId)],
    queryFn: () => customerClient.getDashboardAnalytics(userId),
  });
};
export const useGetAccountOverviewQuery = (userId: string) => {
  return useQuery({
    queryKey: [CUSTOMER_ENDPOINTS.GET_ACCOUNT_OVERVIEW(userId)],
    queryFn: () => customerClient.getAccountOverview(userId),
  });
};
export const useGetRecentOrdersQuery = (userId: string) => {
  return useQuery({
    queryKey: [CUSTOMER_ENDPOINTS.GET_RECENT_ORDERS(userId)],
    queryFn: () => customerClient.getRecentOrders(userId),
  });
};
export const useGetAllOrdersQuery = (params: { page?: number } = {}) => {
  const {
    userData: { user_id },
  } = useAuthStore();

  return useQuery({
    queryKey: [CUSTOMER_ENDPOINTS.GET_ALL_ORDERS(user_id as string)],
    queryFn: () => customerClient.getAllOrders(user_id as string, params),
  });
};

export const useGetRewardPointsAnalyticsQuery = (userId: string) => {
  return useQuery({
    queryKey: [CUSTOMER_ENDPOINTS.GET_REWARD_POINTS_ANALYTICS(userId)],
    queryFn: () => customerClient.getRewardPointsAnalytics(userId),
  });
};

export const useGetRewardPointsActivitiesQuery = (userId: string) => {
  return useQuery({
    queryKey: [CUSTOMER_ENDPOINTS.GET_REWARD_POINTS_ACTIVITIES(userId)],
    queryFn: () => customerClient.getRewardPointsActivities(userId),
  });
};

export const useGetWishListQuery = (userId: string) => {
  return useQuery({
    queryKey: [CUSTOMER_ENDPOINTS.GET_WISHLIST(userId)],
    queryFn: () => customerClient.getWishlist(userId),
  });
};

export const useGetCustomerOrderDetailsQuery = (order_no: string) => {
  return useQuery<{ status: boolean; message: string; data: IOrder }, Error>({
    queryKey: ["SINGLE-SELLERS-ORDERS"],
    queryFn: () => customerClient.getOrderDetails(order_no),
    // enabled: false,
  });
};
