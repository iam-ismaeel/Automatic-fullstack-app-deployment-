import type { Metadata } from "next";
import SellerSideBar from "@/components/common/seller-sidebar";
import SellerHeader from "@/components/common/seller-header";
import SellerAuthGuard from "@/providers/SellerAuthGuard";

export const metadata: Metadata = {
  title: "Seller",
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
    <SellerAuthGuard>
      <div className={`flex flex-auto flex-col`}>
        <div className="flex flex-auto min-w-0">
          <SellerSideBar />

          <div className="flex bg-[#f9f9fb] flex-col flex-auto min-h-screen min-w-0 relative w-full">
            <SellerHeader />

            <main className="px-8 md:px-5 pb-8 md:pt-18 pt-24 flex-1 h-full mb-8 grow md:ml-0">
              {children}
            </main>
          </div>
        </div>
      </div>
    </SellerAuthGuard>
  );
}
