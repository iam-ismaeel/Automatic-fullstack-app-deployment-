import {ApiClient} from "@/api/client/index";
import {HOMEPAGE_REF} from "@/api/client/endpoints";


export const recommendProductsClient = {
    getRecommendProduct: async (): Promise<any> =>
        ApiClient.get(HOMEPAGE_REF.GET_RECOMMENDED_PRODUCTS),
}