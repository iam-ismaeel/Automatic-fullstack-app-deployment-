import { ApiClient } from ".";
import { PUBLIC_ENDPOINTS } from "./endpoints";
import { ILoginPayload, IVerifyEmailPayload } from "@/interfaces/seller";

const authClient = {
  login: async (data: ILoginPayload): Promise<any> =>
    ApiClient.post(PUBLIC_ENDPOINTS.LOGIN, data),
  verifyEmail: async (data: IVerifyEmailPayload): Promise<any> =>
    ApiClient.post(PUBLIC_ENDPOINTS.VERIFY_EMAIL, data),
  verifyLogin: async (data: any): Promise<any> =>
    ApiClient.post(PUBLIC_ENDPOINTS.VERIFY_LOGIN, data),
  resetPassword: async (data: any): Promise<any> =>
    ApiClient.post(PUBLIC_ENDPOINTS.RESET_PASSWORD, data),
  forgotPassword: async (data: { email: string }): Promise<any> =>
    ApiClient.post(PUBLIC_ENDPOINTS.FORGOT_PASSWORD, data),
  resendCode: async (data: { email: string }): Promise<any> =>
    ApiClient.post(PUBLIC_ENDPOINTS.RESEND_CODE, data),
  logout: async (data: any): Promise<any> =>
    ApiClient.post(PUBLIC_ENDPOINTS.LOGOUT, data),
};

export default authClient;
