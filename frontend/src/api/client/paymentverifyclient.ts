import {ApiClient} from "@/api/client/index";
import {PAYSTACK_REF} from "@/api/client/endpoints";


export const paymentVerifyClient = {
    verifyPaystackPayment: async (user_id: number, txref: string): Promise<any> =>
        ApiClient.get(PAYSTACK_REF.VERIFY(user_id, txref)),
}