import { IParams } from "@/interfaces/client";
import userClient from "./client/user";
import API_ENDPOINTS, {
  HOMEPAGE_REF,
  SELLER_ENDPOINTS,
} from "./client/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICart, IProfile } from "@/interfaces/api";
import {
  addCartItem,
  addReview,
  IBannerResponse,
  saveForLater,
} from "@/interfaces/common";
import useAuthStore from "@/zustand/authStore";
import ProcessError from "@/utils/error";
import { homeProductsClient } from "./client/homeproducts";
import { cartclient } from "./client/cartclient";
import { ApiClient, client } from "./client";

export const useProfileQuery = ({
  enabled = true,
  params = {},
  headers = {},
}: {
  enabled?: boolean;
  params?: IParams;
  headers?: Record<string, string>;
} = {}) => {
  return useQuery<IProfile, Error>({
    queryKey: [API_ENDPOINTS.GET_PROFILE],
    queryFn: () => userClient.getProfile(params, headers),
    enabled: enabled !== undefined ? enabled : true,
  });
};

export const useBannerQuery = () => {
  return useQuery<IBannerResponse, Error>({
    queryKey: [SELLER_ENDPOINTS.GET_BANNERS],
    queryFn: () => userClient.getBanners(),
  });
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  const {
    userData: { user_id },
  } = useAuthStore();
  return useMutation({
    mutationFn: (data: FormData) =>
      userClient.updateProfile(data, user_id as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ENDPOINTS.GET_PROFILE],
      });
    },
    onError: (error) => ProcessError(error),
  });
};

export const useAddToCartMutation = () => {
  return useMutation({
    mutationFn: (data: addCartItem) => userClient.addToCarts(data),
    onSuccess: () => {},
    onError: (error) => ProcessError(error),
  });
};

export const useAddReviewToProductMutation = () => {
  // Log the default headers to console

  return useMutation({
    mutationFn: (data: addReview) =>
      homeProductsClient.postProductsReview(data),
    onSuccess: () => {},
    onError: (error) => ProcessError(error),
  });
};

export const useSaveForLater = () => {
  return useMutation({
    mutationFn: (data: saveForLater) =>
      homeProductsClient.postSaveForLater(data),
    onSuccess: () => {},
    onError: (error) => ProcessError(error),
  });
};

export const useAddToWishList = () => {
  return useMutation({
    mutationFn: (data: saveForLater) =>
      homeProductsClient.postAddToWishList(data),
    onSuccess: () => {},
    onError: (error) => ProcessError(error),
  });
};

export const useMoveWishListToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: saveForLater) =>
      homeProductsClient.postMoveWishListCart(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_CART_ITEM"],
      });
      queryClient.invalidateQueries({
        queryKey: ["HOMEPAGE_REF.GET_ADD_TO_WISH_LIST"],
      });
    },
    onError: (error) => ProcessError(error),
  });
};

export const useWishListQuery = (user_id: number, enabled = false) => {
  return useQuery<ICart, Error>({
    queryKey: ["HOMEPAGE_REF.GET_ADD_TO_WISH_LIST"],
    queryFn: () => {
      // console.log(
      //   "Executing queryFn with URL:",
      //   `/user/customer/wishlist/${user_id}`
      // );
      return ApiClient.get(`/user/customer/wishlist/${user_id}`);
    },
    enabled: true,
  });
};
