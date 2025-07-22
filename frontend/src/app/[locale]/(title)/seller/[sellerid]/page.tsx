import SellerProfileDetails from "@/components/pages/seller-profile/page";
import React from "react";

function page({ params }: { params: { sellerid: string } }) {
  return <SellerProfileDetails sellerid={params.sellerid} />;
}

export default page;
