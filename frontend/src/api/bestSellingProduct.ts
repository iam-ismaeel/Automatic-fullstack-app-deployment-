import { useQuery } from "@tanstack/react-query";
import { HOMEPAGE_REF } from "@/api/client/endpoints";
import { IParams } from "@interfaces/client";
import { bestSellingClient } from "@/api/client/bestsellingclient";
import { useEffect, useState } from "react";
import { setDate } from "date-fns";

export const useGetBestSellingProductQuery = ({
  enabled = true,
  params = {},
}: {
  enabled?: boolean;
  params?: IParams;
} = {}) => {
  return useQuery<any, Error>({
    queryKey: [HOMEPAGE_REF.GET_BESTSELLING_PRODUCTS],
    queryFn: () => bestSellingClient.getBestSelling(params),
    enabled: true,
    staleTime: 0, // Always mark data as stale and refetch
  });
};

export const useGetBestSellingProduct = () => {
  const [data, setDate] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<any>({})

  useEffect(() => {
    handleCountriesget();
  }, []);
  const handleCountriesget = async () => {
    try {
      setIsLoading(true);
      const response = await bestSellingClient.getBestSelling({});
      setDate(response);
    } catch (err: any) {
      // setError(err?.response)
    } finally {
      setIsLoading(false);
    }
  };
  const refetch = () => {
    handleCountriesget();
  };
  return { data, refetch, isLoading };
};
