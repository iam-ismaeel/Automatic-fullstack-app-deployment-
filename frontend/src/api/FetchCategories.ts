import { useQuery} from "@tanstack/react-query";
import {HOMEPAGE_REF} from "@/api/client/endpoints";
import {IParams} from "@interfaces/client";
import {categoryClient} from "@/api/client/categoryclient";



export const useGetAllCategoriesQuery = ({enabled = true, params = {},}: {
    enabled?: boolean;
    params?: IParams;
} = {}) => {
    return useQuery<any, Error>({
        queryKey: [HOMEPAGE_REF.GET_ALL_CATEGORIES],
        queryFn: () => categoryClient.getAllCategory(params),
        enabled: enabled !== undefined ? enabled : true,
    });
};