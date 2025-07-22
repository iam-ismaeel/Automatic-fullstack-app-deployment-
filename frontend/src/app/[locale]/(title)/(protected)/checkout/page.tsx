import CountrySelectorNav from "@/components/common/Country-selector-Nav";
import CheckoutPageClient from "@/components/pages/checkout";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout page",
};

export default function CheckoutPage() {
  return (
    <section className="app_container py-[150px] md:py-[220px]">
      {/* <CountrySelectorNav /> */}
      <CheckoutPageClient />
    </section>
  );
}
