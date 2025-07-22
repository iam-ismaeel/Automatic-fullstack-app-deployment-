import type { Metadata } from "next";
import SellerAuthGuard from "@/providers/SellerAuthGuard";
import B2bSellerSideBar from "@/components/common/b2b-seller-sidebar";
import B2BSellerHeader from "@/components/common/b2b-seller-header";
import { inter } from "./fonts";

export const metadata: Metadata = {
  title: "B2B Seller",
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
      <div className={`flex flex-auto flex-col font-inter ${inter.className}`}>
        <div className="flex flex-auto min-w-0">
          <B2bSellerSideBar />

          <div className="flex bg-[#f9f9fb] flex-col flex-auto min-h-screen min-w-0 relative w-full">
            <B2BSellerHeader />

            <main
              className={`pl-8 pr-4 font-inter  md:pl-4 pb-8 md:pt-18 pt-24  flex-1 h-full mb-8  grow md:ml-0`}
            >
              {children}
            </main>
          </div>
        </div>
      </div>
    </SellerAuthGuard>
  );
}
