import type { Metadata } from "next";
import CustomerAuthGuard from "@/providers/CustomerAuthGuard";
import CustomerSideBar from "@/components/common/customer-sidebar";
import CustomerHeader from "@/components/common/customer-header";

export const metadata: Metadata = {
  title: "Customer",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}
export default function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  return (
    <CustomerAuthGuard>
      <div className="flex flex-auto min-w-0">
        <CustomerSideBar />

        <div className="flex bg-[#f9f9fb] flex-col flex-auto min-h-screen min-w-0 relative w-full">
          <CustomerHeader />

          <main className="slg:px-6 px-8 flex-1 h-full pb-8 md:pt-24 pt-24">
            {children}
          </main>
        </div>
      </div>
    </CustomerAuthGuard>
  );
}
