import {HOMEPAGE_REF} from "./endpoints";
import {ApiClient} from "@/api/client/index";

export const brandClient = {
    getTopBrand: async (): Promise<any> =>
        ApiClient.get(HOMEPAGE_REF.GET_TOP_BRANDS),
}