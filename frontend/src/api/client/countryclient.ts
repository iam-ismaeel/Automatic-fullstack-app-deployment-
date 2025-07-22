import {COUNTRY_ENDPOINTS} from "./endpoints";
import {ApiClient} from "@/api/client/index";
import {IParams} from "@interfaces/client";

export const countryClient = {
    getCountry: async (params: IParams): Promise<any> =>
        ApiClient.get(COUNTRY_ENDPOINTS.GET_COUNTRY),
}