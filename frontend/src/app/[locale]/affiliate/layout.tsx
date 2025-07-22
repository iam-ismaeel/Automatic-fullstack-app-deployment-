import type { Metadata } from "next";
import AffiliateHeader from "@/components/common/affiliate-header";
import AffiliateSideBar from "@/components/common/affiliate-sidebar";
import AffiliateAuthGuard from "@/providers/AffiliateAuthGuard";

export const metadata: Metadata = {
  title: "Affiliate",
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
    <AffiliateAuthGuard>
      <div className="flex flex-auto min-w-0">
        <AffiliateSideBar />

        <div className="flex bg-[#f9f9fb] flex-col flex-auto min-h-screen min-w-0 relative w-full">
          <AffiliateHeader />

          <main className="flex-1 md:px-6 px-8 h-full pb-10 pt-28 grow">
            {children}
          </main>
        </div>
      </div>
    </AffiliateAuthGuard>
  );
}
