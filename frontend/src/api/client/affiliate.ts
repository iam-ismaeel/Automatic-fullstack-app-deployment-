import {
  IAffiliatePayload,
  ICreateBankAccount,
  IGetTransactionsResponse,
  IWithdrawFunds,
} from "@/interfaces/affiliate";
import { ApiClient } from ".";
import { AFFILIATE_ENDPOINTS } from "./endpoints";
import { UpdateProfileSettingsPayload } from "@/interfaces/profile";

export const affiliateClient = {
  createAffiliate: async (data: IAffiliatePayload): Promise<any> =>
    ApiClient.post(AFFILIATE_ENDPOINTS.CREATE_AFFILIATE, data),
  createBankAccount: async (data: ICreateBankAccount): Promise<any> =>
    ApiClient.post(AFFILIATE_ENDPOINTS.ADD_BANK_ACCOUNT, data),
  withdrawFunds: async (data: IWithdrawFunds): Promise<any> =>
    ApiClient.post(AFFILIATE_ENDPOINTS.WITHDRAW, data),
  addKYC: async (data: FormData): Promise<any> =>
    ApiClient.post(AFFILIATE_ENDPOINTS.ADD_KYC, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  updateEarningOption: async (data: {
    user_id: number;
    type: string;
  }): Promise<any> =>
    ApiClient.post(AFFILIATE_ENDPOINTS.UPDATE_EARNING_OPTION, data),
  getTransactions: async (
    userId: string,
    status: string
  ): Promise<IGetTransactionsResponse> =>
    ApiClient.get(AFFILIATE_ENDPOINTS.GET_TRANSACTIONS(userId, status)),
  getReferrals: async (userId: string): Promise<any> =>
    ApiClient.get(AFFILIATE_ENDPOINTS.GET_REFERRALS(userId)),
  getDashboardAnalytics: async (userId: string): Promise<any> =>
    ApiClient.get(AFFILIATE_ENDPOINTS.GET_DASHBOARD_ANALYTICS(userId)),
  getPaymentMethod: async (userId: string): Promise<any> =>
    ApiClient.get(AFFILIATE_ENDPOINTS.GET_PAYMENT_METHOD(userId)),
  updateSecuritySettings: async (
    data: UpdateProfileSettingsPayload,
    user_id: string
  ): Promise<any> =>
    ApiClient.post(AFFILIATE_ENDPOINTS.UPDATE_SECURITY_SETTINGS(user_id), data),
};
