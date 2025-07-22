import ProtectedProvider from "@/providers/Protected";
import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default function ProtectedLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  return <ProtectedProvider>{children}</ProtectedProvider>;
}
