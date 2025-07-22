import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { affiliateClient } from "./client/affiliate";
import {
  IAffiliatePayload,
  ICreateBankAccount,
  IWithdrawFunds,
} from "@/interfaces/affiliate";
import API_ENDPOINTS, { AFFILIATE_ENDPOINTS } from "./client/endpoints";
import ProcessError from "@/utils/error";
import { UpdateProfileSettingsPayload } from "@/interfaces/profile";

export const useCreateAffiliateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IAffiliatePayload) =>
      affiliateClient.createAffiliate(data),
    mutationKey: [AFFILIATE_ENDPOINTS.CREATE_AFFILIATE],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AFFILIATE_ENDPOINTS.CREATE_AFFILIATE],
      });
    },
    onError: (error) => ProcessError(error),
  });
};

export const useAddBankAccountMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICreateBankAccount) =>
      affiliateClient.createBankAccount(data),
    mutationKey: [AFFILIATE_ENDPOINTS.ADD_BANK_ACCOUNT],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AFFILIATE_ENDPOINTS.ADD_BANK_ACCOUNT],
      });
    },
    onError: (error) => ProcessError(error),
  });
};

export const useWithdrawFundsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IWithdrawFunds) => affiliateClient.withdrawFunds(data),
    mutationKey: [AFFILIATE_ENDPOINTS.WITHDRAW],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AFFILIATE_ENDPOINTS.WITHDRAW],
      });
    },
    onError: (error) => ProcessError(error),
  });
};

export const useAddKYCMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => affiliateClient.addKYC(data),
    mutationKey: [AFFILIATE_ENDPOINTS.ADD_KYC],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AFFILIATE_ENDPOINTS.ADD_KYC],
      });
    },
    onError: (error) => ProcessError(error),
  });
};

export const useUpdateEarningOptionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { user_id: number; type: string }) =>
      affiliateClient.updateEarningOption(data),
    mutationKey: [AFFILIATE_ENDPOINTS.UPDATE_EARNING_OPTION],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AFFILIATE_ENDPOINTS.UPDATE_EARNING_OPTION],
      });
    },
    onError: (error) => ProcessError(error),
  });
};

export const useGetTransactionsQuery = (userId: string, status: string) => {
  return useQuery({
    queryKey: [AFFILIATE_ENDPOINTS.GET_TRANSACTIONS(userId, status)],
    queryFn: () => affiliateClient.getTransactions(userId, status),
  });
};

export const useGetReferralsQuery = (userId: string) => {
  return useQuery({
    queryKey: [AFFILIATE_ENDPOINTS.GET_REFERRALS(userId)],
    queryFn: () => affiliateClient.getReferrals(userId),
  });
};

export const useGetPaymentMethodsQuery = (userId: string) => {
  return useQuery({
    queryKey: [AFFILIATE_ENDPOINTS.GET_PAYMENT_METHOD(userId)],
    queryFn: () => affiliateClient.getPaymentMethod(userId),
  });
};

export const useGetDashboardAnalyticsQuery = (userId: string) => {
  return useQuery({
    queryKey: [AFFILIATE_ENDPOINTS.GET_DASHBOARD_ANALYTICS(userId)],
    queryFn: () => affiliateClient.getDashboardAnalytics(userId),
  });
};

export const useUpdateSecuritySettingsMutation = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProfileSettingsPayload) =>
      affiliateClient.updateSecuritySettings(data, userId),
    mutationKey: [AFFILIATE_ENDPOINTS.UPDATE_SECURITY_SETTINGS],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AFFILIATE_ENDPOINTS.UPDATE_SECURITY_SETTINGS],
      });
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.GET_PROFILE],
      });
    },
    onError: (error) => ProcessError(error),
  });
};
