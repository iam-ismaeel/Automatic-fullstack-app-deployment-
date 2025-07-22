"use client";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { Fragment } from "react";
import useUserSetup from "@/hooks/useUserSetup";

interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  useUserSetup();
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
}
