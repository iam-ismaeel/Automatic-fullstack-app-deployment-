import {useQuery} from "@tanstack/react-query";
import {HOMEPAGE_REF} from "@/api/client/endpoints";
import {brandClient} from "@/api/client/brandclient";
import {topSellerClient} from "@/api/client/topsellerclient";


export const useGetTopSellersQuery = () => {
    return useQuery<{ status: boolean; message: string; data: any }, Error>({
        queryKey: [HOMEPAGE_REF.GET_TOP_SELLER],
        queryFn: () => topSellerClient.getTopSeller(),
        // enabled: false,
    });
};