import { IParams } from "@/interfaces/client";
import { ApiClient } from ".";
import API_ENDPOINTS, { SELLER_ENDPOINTS } from "./endpoints";
import { QueryBuilder } from "@/utils/queryBuilder";

const productClient = {
  getSellerProducts: async (userId: string, params?: IParams): Promise<any> =>
    ApiClient.get(
      API_ENDPOINTS.GET_SELLER_PRODUCTS + `/${userId}${QueryBuilder(params)}`
    ),
  getSingleProduct: async (id: string, userId: string): Promise<any> =>
    ApiClient.get(SELLER_ENDPOINTS.GET_SINGLE_PRODUCT(id) + `/${userId}`),
  addProduct: async (data: FormData): Promise<any> =>
    ApiClient.post(API_ENDPOINTS.ADD_PRODUCT, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  updateProduct: async (
    data: FormData,
    prodId: string,
    userId: string
  ): Promise<any> =>
    ApiClient.post(API_ENDPOINTS.UPDATE_PRODUCT(prodId, userId), data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  importProducts: async (data: FormData): Promise<any> =>
    ApiClient.post(SELLER_ENDPOINTS.IMPORT_PRODUCT, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  getCategories: async (): Promise<any> =>
    ApiClient.get(SELLER_ENDPOINTS.GET_CATEGORIES),
  getSubCategories: async (id: string): Promise<any> =>
    ApiClient.get(SELLER_ENDPOINTS.GET_SUB_CATEGORIES(id)),
  getBrands: async (): Promise<any> =>
    ApiClient.get(SELLER_ENDPOINTS.GET_BRANDS),
  getColors: async (): Promise<any> =>
    ApiClient.get(SELLER_ENDPOINTS.GET_COLORS),
  getSizes: async (): Promise<any> => ApiClient.get(SELLER_ENDPOINTS.GET_SIZES),
  getUnits: async (): Promise<any> => ApiClient.get(SELLER_ENDPOINTS.GET_UNITS),
  getTemplate: async (): Promise<any> =>
    ApiClient.get(SELLER_ENDPOINTS.GET_TEMPLATE),
  exportProducts: async (userId: string): Promise<any> =>
    ApiClient.get(SELLER_ENDPOINTS.GET_TEMPLATE),
};

export default productClient;
