import { useQuery} from "@tanstack/react-query";
import { HOMEPAGE_REF} from "@/api/client/endpoints";
import {IParams} from "@interfaces/client";
import {featuredCategoryClient} from "@/api/client/featurecategoryclient";



export const useGetFeaturedCategoryQuery = ({enabled = true, params = {},}: {
    enabled?: boolean;
    params?: IParams;
} = {}) => {
    return useQuery<any, Error>({
        queryKey: [HOMEPAGE_REF.GET_FEATURE_CATEGORIES],
        queryFn: () => featuredCategoryClient.getFeaturedCategory(params),
        enabled: enabled !== undefined ? enabled : true,
    });
};