import { IParams } from "@/interfaces/client";
import useAuthStore from "@/zustand/authStore";
import { useUserStore } from "@/zustand/userStore";
import axios from "axios";
import { Checkout } from "@interfaces/checkout";
import { AUTHORIZE_NET_REF, PAYSTACK_REF } from "@/api/client/endpoints";
import { handleApiError } from "@/lib/errorHandler";

const { token } = useUserStore.getState().user;
export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "X-SHPAZY-AUTH": "4sa2e7shpazy1b3f9a",
    Authorization: `Bearer ${token}`,
  },
});

client.interceptors.request.use((config) => {
  const { token } = useUserStore.getState().user;
  const { token: sellerToken } = useAuthStore.getState().userData;

  if (sellerToken ?? token) {
    config.headers.Authorization = `Bearer ${sellerToken ?? token}`;
  }

  return config;
});

//
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // logout
    }
    return Promise.reject(error.response.data);
  }
);

export class ApiClient {
  static async get<T>(url: string, params?: IParams, headers: any = {}) {
    const response = await client.get<T>(url, {
      params,
      headers: {
        ...client.defaults.headers,
        ...headers,
      },
    });

    return response.data;
  }

  static async post<T>(url: string, data: unknown, options?: any) {
    const config = {
      ...options,
      headers: {
        ...client.defaults.headers,
        ...options?.headers,
      },
    };
    const response = await client.post<T>(url, data, config);
    return response.data;
  }

  static async put<T>(url: string, data: unknown) {
    const response = await client.put<T>(url, data);

    return response.data;
  }

  static async patch<T>(url: string, data: unknown) {
    const response = await client.patch<T>(url, data);
    console.log(token);
    return response.data;
  }

  static async delete<T>(url: string) {
    const response = await client.delete<T>(url);

    return response.data;
  }

  static async getPaymentVerification<T>(
    url: string,
    params?: IParams,
    headers: any = {}
  ) {
    const response = await client.get<T>(url, {
      params,
      headers: {
        "Content-Type": "application/json",
        "X-SHPAZY-AUTH": "4sa2e7shpazy1b3f9a",
        Authorization: `Bearer ${token}`,
        ...headers,
      },
    });

    return response.data;
  }
}

export const paystackCheckOut = async (data: Checkout) => {
  try {
    const response = await client.post(PAYSTACK_REF.POST_CHECKOUT, data);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

export const authorizeNetCheckOut = async (data: any) => {
  try {
    const response = await client.post(AUTHORIZE_NET_REF.AUTHORIZE, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
