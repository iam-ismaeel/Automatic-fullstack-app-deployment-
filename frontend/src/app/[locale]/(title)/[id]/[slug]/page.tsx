import React from "react";
import ProductDetail from "@/components/pages/product-detail";

const page = ({ params }: { params: { slug: string } }) => {
  return <ProductDetail slug={params.slug} />;
};

export default page;
