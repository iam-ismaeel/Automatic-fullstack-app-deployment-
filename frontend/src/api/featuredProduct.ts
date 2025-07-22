import { useQuery } from "@tanstack/react-query";
import { HOMEPAGE_REF } from "@/api/client/endpoints";
import { IParams } from "@interfaces/client";
import { featuredClient } from "@/api/client/featuredclient";
import { useEffect, useState } from "react";

export const useGetFeaturedProductQuery = ({
  enabled = true,
  params = {},
}: {
  enabled?: boolean;
  params?: IParams;
} = {}) => {
  return useQuery<any, Error>({
    queryKey: [HOMEPAGE_REF.GET_FEATURED_PRODUCTS],
    queryFn: () => featuredClient.getFeaturedProduct(params),
    enabled: enabled !== undefined ? enabled : true,
  });
};

export const useGetFeaturedProduct = () => {
  const [data, setDate] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<any>({})

  useEffect(() => {
    handleRequestcall();
  }, []);
  const handleRequestcall = async () => {
    try {
      setIsLoading(true);
      const response = await featuredClient.getFeaturedProduct({});
      setDate(response);
    } catch (err: any) {
      // setError(err?.response)
    } finally {
      setIsLoading(false);
    }
  };
  const refetch = () => {
    handleRequestcall();
  };
  return { data, refetch, isLoading };
};
