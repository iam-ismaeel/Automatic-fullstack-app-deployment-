import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API_ENDPOINTS, { SELLER_ENDPOINTS } from "./client/endpoints";
import productClient from "./client/product";
import { IParams } from "@/interfaces/client";
import {
  ICategoriesResponse,
  IGetProductTemplateResponse,
  IOrder,
  IProduct,
  IProductsResponse,
} from "@/interfaces/products";
import ProcessError from "@/utils/error";
import useAuthStore from "@/zustand/authStore";
import userClient from "./client/user";
import { Pagination } from "@/interfaces/table";

export const useSellerProductsQuery = ({
  userId,
  enabled = true,
  params = {},
}: {
  userId: string;
  enabled?: boolean;
  params?: IParams;
}) => {
  return useQuery<IProductsResponse, Error>({
    queryKey: [API_ENDPOINTS.GET_SELLER_PRODUCTS],
    queryFn: () => productClient.getSellerProducts(userId, params),
    enabled: enabled !== undefined ? enabled : true,
  });
};

export const useGetSingleProductQuery = (id: string, userId: string) => {
  return useQuery<{ status: boolean; message: string; data: IProduct }, Error>({
    queryKey: ["SINGLE-PRODUCT"],
    queryFn: () => productClient.getSingleProduct(id, userId),
    // enabled: false,
  });
};

export const useSellerAddProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => productClient.addProduct(data),
    mutationKey: [API_ENDPOINTS.ADD_PRODUCT],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.GET_SELLER_PRODUCTS],
      });
    },
    onError: (error) => {
      ProcessError(error);
    },
  });
};

export const useSellerUpdateProductMutation = (
  prodId: string,
  userId: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) =>
      productClient.updateProduct(data, prodId, userId),
    mutationKey: [API_ENDPOINTS.ADD_PRODUCT],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.GET_SELLER_PRODUCTS],
      });
    },
    onError: (error) => {
      ProcessError(error);
    },
  });
};

export const useImportProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => productClient.importProducts(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.GET_SELLER_PRODUCTS],
      });
    },
    onError: (error) => ProcessError(error),
  });
};

export const useGetCategoriesQuery = () => {
  return useQuery<ICategoriesResponse, Error>({
    queryKey: [SELLER_ENDPOINTS.GET_CATEGORIES],
    queryFn: () => productClient.getCategories(),
  });
};

export const useGetBrandsQuery = () => {
  return useQuery<ICategoriesResponse, Error>({
    queryKey: [SELLER_ENDPOINTS.GET_BRANDS],
    queryFn: () => productClient.getBrands(),
  });
};

export const useGetSizesQuery = () => {
  return useQuery<ICategoriesResponse, Error>({
    queryKey: [SELLER_ENDPOINTS.GET_SIZES],
    queryFn: () => productClient.getSizes(),
  });
};

export const useGetUnitsQuery = () => {
  return useQuery<ICategoriesResponse, Error>({
    queryKey: [SELLER_ENDPOINTS.GET_UNITS],
    queryFn: () => productClient.getUnits(),
  });
};

export const useGetColorsQuery = () => {
  return useQuery<ICategoriesResponse, Error>({
    queryKey: [SELLER_ENDPOINTS.GET_COLORS],
    queryFn: () => productClient.getColors(),
  });
};

export const useGetSubCategoriesQuery = (id: string) => {
  return useQuery<ICategoriesResponse, Error>({
    queryKey: ["PRODUCT-SUBCATEGORIES"],
    queryFn: () => productClient.getSubCategories(id),
    enabled: id ? true : false,
  });
};

export const useGetProductTemplateQuery = () => {
  return useQuery<IGetProductTemplateResponse, Error>({
    queryKey: [SELLER_ENDPOINTS.GET_TEMPLATE],
    queryFn: () => productClient.getTemplate(),
    enabled: false,
  });
};

export const useExportProductsQuery = (userId: string) => {
  return useQuery<any, Error>({
    queryKey: [SELLER_ENDPOINTS.EXPORT_PRODUCT],
    queryFn: () => productClient.exportProducts(userId),
    enabled: false,
  });
};

export const useGetOrdersQuery = (
  params: { page?: number; status?: string } = {}
) => {
  const {
    userData: { user_id },
  } = useAuthStore();

  return useQuery<
    { status: boolean; message: string; data: any; pagination: Pagination },
    Error
  >({
    queryKey: ["SELLER-ORDERS", params],
    queryFn: () => userClient.getOrders(user_id as string, params),
  });
};

export const useGetOrderDetailsQuery = (id: string, userId: string) => {
  return useQuery<{ status: boolean; message: string; data: IOrder }, Error>({
    queryKey: ["SINGLE-SELLERS-ORDERS"],
    queryFn: () => userClient.getOrderDetails(id, userId),
    // enabled: false,
  });
};
