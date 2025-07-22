import {useQuery} from "@tanstack/react-query";
import {HOMEPAGE_REF} from "@/api/client/endpoints";
import {brandClient} from "@/api/client/brandclient";


export const useGetTopBrandsQuery = () => {
    return useQuery<{ status: boolean; message: string; data: any }, Error>({
        queryKey: [HOMEPAGE_REF.GET_TOP_BRANDS],
        queryFn: () => brandClient.getTopBrand(),
        // enabled: false,
    });
};