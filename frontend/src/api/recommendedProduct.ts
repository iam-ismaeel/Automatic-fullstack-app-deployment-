import {useQuery} from "@tanstack/react-query";
import {HOMEPAGE_REF} from "@/api/client/endpoints";
import {recommendProductsClient} from "@/api/client/recommendedproductclient";


export const useGetRecommendProductQuery = () => {
    return useQuery<{ status: boolean; message: string; data: any }, Error>({
        queryKey: [HOMEPAGE_REF.GET_RECOMMENDED_PRODUCTS],
        queryFn: () => recommendProductsClient.getRecommendProduct(),
        // enabled: false,
    });
};