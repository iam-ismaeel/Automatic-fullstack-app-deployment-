import {COUNTRY_ENDPOINTS, HOMEPAGE_REF} from "./endpoints";
import {ApiClient} from "@/api/client/index";
import {IParams} from "@interfaces/client";

export const categoryClient = {
    getAllCategory: async (params: IParams): Promise<any> =>
        ApiClient.get(HOMEPAGE_REF.GET_ALL_CATEGORIES),
}