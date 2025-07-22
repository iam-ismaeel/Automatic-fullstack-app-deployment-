"use client";

import { useGetSingleProductQuery } from "@/api/product";
import AddProductForm from "@/components/pages/seller-dashboard/products/add/AddProductForm";
import useAuthStore from "@/zustand/authStore";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();
  const {
    userData: { user_id },
  } = useAuthStore();
  const { data, isLoading } = useGetSingleProductQuery(
    id as string,
    user_id as string
  );
  const productDetail = data?.data;
  return <AddProductForm productDetail={productDetail} />;
};

export default Page;
