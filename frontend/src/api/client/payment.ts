import { useQuery } from "@tanstack/react-query";
import { PAYSTACK_REF } from "@/api/client/endpoints";
import { paymentVerifyClient } from "@/api/client/paymentverifyclient";
import { ApiClient } from ".";

export const usePaystackVerifyClientQuery = (
  user_id: number,
  txref: string
) => {
  return useQuery<any, Error>({
    queryKey: [PAYSTACK_REF.VERIFY(user_id, txref)],
    queryFn: () => paymentVerifyClient.verifyPaystackPayment(user_id, txref),
    // enabled: false,
  });
};

const paymentClient = {
  lookupPaystackAccount: async (data: any): Promise<any> =>
    ApiClient.post(PAYSTACK_REF.LOOKUP_PAYSTACK_ACCOUNT, data),
  getBankList: (): Promise<any> => ApiClient.get(PAYSTACK_REF.GET_BANK_LIST),
};

export default paymentClient;
