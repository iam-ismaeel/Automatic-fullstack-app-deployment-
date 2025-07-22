import CategoriesPage from "@/components/pages/categories/page";
import React from "react";

function page({ params }: { params: { categoryId: string } }) {
  return <CategoriesPage categoryId={params.categoryId} />;
}

export default page;
