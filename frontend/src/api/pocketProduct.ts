import { useQuery } from "@tanstack/react-query";
import { HOMEPAGE_REF } from "@/api/client/endpoints";
import { IParams } from "@interfaces/client";
import { featuredClient } from "@/api/client/featuredclient";
import { pocketClient } from "@/api/client/pocketclient";
import { useEffect, useState } from "react";

export const useGetPocketProductQuery = ({
  enabled = true,
  params = {},
}: {
  enabled?: boolean;
  params?: IParams;
} = {}) => {
  return useQuery<any, Error>({
    queryKey: [HOMEPAGE_REF.GET_POCKET_PRODUCTS],
    queryFn: () => pocketClient.getPocketProduct(params),
    enabled: enabled !== undefined ? enabled : true,
  });
};

export const useGetPocketProduct = () => {
  const [data, setDate] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<any>({})

  useEffect(() => {
    handleRequestcall();
  }, []);
  const handleRequestcall = async () => {
    try {
      setIsLoading(true);
      const response = await pocketClient.getPocketProduct({});
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
