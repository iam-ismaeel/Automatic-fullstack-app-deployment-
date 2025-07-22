import { useCallback, useState, useRef, useEffect } from "react";
import { useDebounce } from "./useDebounce";

type QueryParamValue = string | number | boolean | null;

export const useSearch = <T extends Record<string, QueryParamValue>>(
  initialParams: T
) => {
  const [queryParams, setQueryParams] = useState<T>(initialParams);

  const updateQueryParam = useCallback(
    (name: keyof T, value: QueryParamValue) => {
      setQueryParams((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const debouncedUpdateQueryParam = useDebounce(updateQueryParam, 1000);

  const handleSearch = useCallback(
    (value: string) => {
      debouncedUpdateQueryParam("search" as keyof T, value);
    },
    [debouncedUpdateQueryParam]
  );

  const resetParams = useCallback(() => {
    setQueryParams(initialParams);
  }, [initialParams]);

  return {
    queryParams,
    updateQueryParam,
    handleSearch,
    resetParams,
  };
};
