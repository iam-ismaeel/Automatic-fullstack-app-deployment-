import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Cart } from "@interfaces/cart";
import { cartclient } from "@/api/client/cartclient";
import { addCartItem, removeCartItem } from "@interfaces/common";
import ProcessError from "@/utils/error";
import { Checkout } from "@interfaces/checkout";
import { Profile } from "@interfaces/profile";

export const useFetchAllCartItemQuery = (user_id: number, enabled: boolean) => {
  return useQuery<{ status: boolean; message: string; data: Cart }, Error>({
    queryKey: ["GET_CART_ITEM"],
    queryFn: () => cartclient.getAllCartItem(user_id),
    enabled: enabled,
  });
};

export const useRemoveCartItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: removeCartItem) =>
      cartclient.removeCartItem(data.user_id, data.cart_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_CART_ITEM"],
      });
    },
    onError: (error) => ProcessError(error),
  });
};

export const useClearCartItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user_id: number) => cartclient.clearCart(user_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_CART_ITEM"],
      });
    },
    onError: (error) => ProcessError(error),
  });
};

export const useUpdateCartMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: addCartItem) => cartclient.updateCarts(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_CART_ITEM"],
      });
    },
    onError: (error) => ProcessError(error),
  });
};

export const useCheckoutMutation = () => {
  return useMutation({
    mutationFn: (data: Checkout) => cartclient.createCheckout(data),
    onSuccess: () => {},
    onError: (error) => ProcessError(error),
  });
};

export const useCheckoutQuery = (data: Checkout) => {
  return useQuery<{ status: boolean; message: string; data: any }, Error>({
    queryKey: ["INITIATE_CHECKOUT"],
    queryFn: () => cartclient.createCheckout(data),
    // enabled: false,
  });
};

export const useGetProfileQuery = () => {
  return useQuery<{ status: boolean; message: string; data: Profile }, Error>({
    queryKey: ["GET_PROFILE"],
    queryFn: () => cartclient.getProfile(),
    // enabled: false,
  });
};
