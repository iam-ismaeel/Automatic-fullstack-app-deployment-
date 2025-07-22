import CountrySelectorNav from "@/components/common/Country-selector-Nav";
import CartPageComponent from "@/components/pages/cart";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Cart",
  description: "Cart page",
};

export default function CartPage() {
  return (
    <section className="app_container py-[150px] pb-[50px] md:py-[220px] md:pb-[50px]">
      {/* <CountrySelectorNav /> */}
      <CartPageComponent />
    </section>
  );
}
