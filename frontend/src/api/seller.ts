import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import userClient from "./client/user";
import { SELLER_ENDPOINTS } from "./client/endpoints";
import {
  CreateSellerPayload,
  IGetPlanHistoryResponse,
  IGetPlansResponse,
  IGetWithdrawalHistoryResponse,
  IPayForSubscription,
} from "@/interfaces/seller";
import useAuthStore from "@/zustand/authStore";
import { IWithdrawFunds } from "@/interfaces/affiliate";
import ProcessError from "@/utils/error";

export const useCreateSellerWithCouponMutation = (coupon: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSellerPayload) =>
      userClient.createSellerWithCoupon(data, coupon),
    mutationKey: [SELLER_ENDPOINTS.CREATE_SELLER_WITH_COUPON(coupon)],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SELLER_ENDPOINTS.CREATE_SELLER_WITH_COUPON(coupon)],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useCreateSellerWithReferrerMutation = (referrer: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSellerPayload) =>
      userClient.createSellerWithReferrer(data, referrer),
    mutationKey: [SELLER_ENDPOINTS.CREATE_SELLER_WITH_REFERRER(referrer)],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SELLER_ENDPOINTS.CREATE_SELLER_WITH_REFERRER(referrer)],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useGetDashboardAnalyticsQuery = () => {
  const {
    userData: { user_id },
  } = useAuthStore();

  return useQuery<{ status: boolean; message: string; data: any }, Error>({
    queryKey: ["SELLER-DASHBOARD-ANALYTICS"],
    queryFn: () => userClient.getDashboardAnalytics(user_id as string),
  });
};

export const useGetTopSellingProductQuery = () => {
  const {
    userData: { user_id },
  } = useAuthStore();

  return useQuery<{ status: boolean; message: string; data: any }, Error>({
    queryKey: ["TOP-SELLING-PRODUCT"],
    queryFn: () => userClient.getTopSellingProducts(user_id as string),
  });
};

export const useGetPlanByCountryQuery = (country_id?: string) => {
  return useQuery<IGetPlansResponse, Error>({
    queryKey: ["COUNTRY_PLAN", country_id],
    queryFn: () => userClient.getPlanByCountry(country_id as string),
    enabled: country_id ? true : false,
  });
};

export const useGetSubscriptionHistoryQuery = () => {
  const {
    userData: { user_id },
  } = useAuthStore();
  return useQuery<IGetPlanHistoryResponse, Error>({
    queryKey: ["SUBCRIPTION-HISTORY"],
    queryFn: () => userClient.getSubscriptionHistory(user_id as string),
    enabled: user_id ? true : false,
  });
};

export const useGetWithdrawalHistoryQuery = (currentPage?: number) => {
  const {
    userData: { user_id },
  } = useAuthStore();

  return useQuery<IGetWithdrawalHistoryResponse, Error>({
    queryKey: ["WITHDRAWAL-HISTORY"],
    queryFn: () =>
      userClient.getWithdrawalHistory(user_id as string, currentPage),
    enabled: user_id ? true : false,
  });
};

export const useGetSellerPaymentMethodsQuery = (userId: string) => {
  return useQuery({
    queryKey: [SELLER_ENDPOINTS.GET_SELLER_PAYMENT_METHOD(userId)],
    queryFn: () => userClient.getSellerPaymentMethod(userId),
  });
};

export const useWithdrawSellerFundsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IWithdrawFunds) => userClient.withdrawSellerFunds(data),
    mutationKey: [SELLER_ENDPOINTS.SELLER_WITHDRAW],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SELLER_ENDPOINTS.SELLER_WITHDRAW],
      });
    },
    onError: (error) => ProcessError(error),
  });
};

export const usePayForSubscriptionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IPayForSubscription) =>
      userClient.payForSubscription(data),
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: [SELLER_ENDPOINTS.CREATE_SELLER_WITH_COUPON],
    //   });
    // }
  });
};
export const useGetSellerProfileDetailQuery = (seller_id: string) => {
  return useQuery<{ status: boolean; message: string; data: any }, Error>({
    queryKey: [`SELLER-PRODUCT-${seller_id}`],
    queryFn: () => userClient.getSellersDetail(seller_id),
  });
};

export const useGetSellerReviewQuery = (seller_id: string) => {
  return useQuery<{ status: boolean; message: string; data: any }, Error>({
    queryKey: [`SELLER-REVIEW-${seller_id}`],
    queryFn: () => userClient.getSellersReviewDetail(seller_id),
  });
};

export const useGetSellerCategoryQuery = (seller_id: string) => {
  return useQuery<{ status: boolean; message: string; data: any }, Error>({
    queryKey: [`SELLER-CATEGORY-${seller_id}`],
    queryFn: () => userClient.getSellersCategoryDetail(seller_id),
  });
};

export const useUpdateOrderStatus = (user_id: number, order_id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) =>
      userClient.updateOrderStatus(user_id, order_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["UPDATE_ORDER_STATUS"],
      });
    },
    onError: (error) => ProcessError(error),
  });
};
