import {HOMEPAGE_REF} from "./endpoints";
import {ApiClient} from "@/api/client/index";
import {IParams} from "@interfaces/client";

export const pocketClient = {
    getPocketProduct: async (params: IParams): Promise<any> =>
        ApiClient.get(HOMEPAGE_REF.GET_POCKET_PRODUCTS),
}