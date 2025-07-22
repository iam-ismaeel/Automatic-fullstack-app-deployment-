import { useQuery } from "@tanstack/react-query";
import { COUNTRY_ENDPOINTS } from "@/api/client/endpoints";
import { countryClient } from "@/api/client/countryclient";
import { IParams } from "@interfaces/client";
import { IGetCountriesResponse } from "@/interfaces/seller";

export const useGetCountryQuery = ({
  enabled = true,
  params = {},
}: {
  enabled?: boolean;
  params?: IParams;
} = {}) => {
  return useQuery<IGetCountriesResponse, Error>({
    queryKey: [COUNTRY_ENDPOINTS.GET_COUNTRY],
    queryFn: () => countryClient.getCountry(params),
    enabled: enabled !== undefined ? enabled : true,
  });
};
