import {HOMEPAGE_REF} from "./endpoints";
import {ApiClient} from "@/api/client/index";
import {IParams} from "@interfaces/client";

export const bestSellingClient = {
    getBestSelling: async (params: IParams): Promise<any> =>
        ApiClient.get(HOMEPAGE_REF.GET_BESTSELLING_PRODUCTS),
}