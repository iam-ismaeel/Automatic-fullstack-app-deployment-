import { useQuery } from "@tanstack/react-query";
import { productHome, productModel } from "@interfaces/products";
import { HOMEPAGE_REF } from "@/api/client/endpoints";
import { homeProductsClient } from "@/api/client/homeproducts";

export const useGetProductDetailQuery = (slug: string) => {
  return useQuery<
    { status: boolean; message: string; data: productHome },
    Error
  >({
    queryKey: [HOMEPAGE_REF.GET_PRODUCT_DETAIL(slug)],
    queryFn: () => homeProductsClient.getProducDetailProduct(slug),
    // enabled: false,
  });
};

export const useGetProductCategory = (slug: string) => {
  return useQuery<
    { status: boolean; message: string; data: productModel[] },
    Error
  >({
    queryKey: ["HOMEPAGE_REF.GET_CATEGORY_PRODUCT"],
    queryFn: () => homeProductsClient.getProductByCategory(slug),
  });
};
