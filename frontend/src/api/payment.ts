import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PAYSTACK_REF } from "./client/endpoints";
import paymentClient from "./client/payment";

export const useLookUpPaystackAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => paymentClient.lookupPaystackAccount(data),
    mutationKey: [PAYSTACK_REF.LOOKUP_PAYSTACK_ACCOUNT],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PAYSTACK_REF.LOOKUP_PAYSTACK_ACCOUNT],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useGetBankListQuery = () => {
  return useQuery<{ status: boolean; message: string; data: any }, Error>({
    queryKey: [PAYSTACK_REF.GET_BANK_LIST],
    queryFn: () => paymentClient.getBankList(),
  });
};
