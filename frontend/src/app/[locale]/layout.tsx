import type { Metadata } from "next";
import "react-loading-skeleton/dist/skeleton.css";
import "../../../public/styles/index.css";
import {
  poppins,
  libre_baskerville,
  public_sans,
  inter,
  open_sans,
  roboto,
} from "./fonts";

import { NextIntlClientProvider } from "next-intl";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import LoaderProvider from "@/providers/LoaderProvider";
import { Toaster } from "sonner";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import NextProgressBarProvider from "@/providers/NextProgressBarProvider";

export const metadata: Metadata = {
  title: {
    default: "AZANY",
    template: "%s - AZANY",
  },
  description:
    "At Azany, we believe shopping should know no boundaries. We are dedicated to breaking barriers and connecting people from all corners of the world.",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}
export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${poppins.variable} font-poppins ${libre_baskerville.variable} font-libre-baskerville ${public_sans.variable} font-public-sans ${inter.variable} ${open_sans.variable} ${roboto.variable}`}
      >
        <NextProgressBarProvider>
          <NextIntlClientProvider messages={messages}>
            <ReactQueryProvider>
              <main>
                <LoaderProvider>{children}</LoaderProvider>
              </main>
              <Toaster
                expand={true}
                richColors
                visibleToasts={3}
                gap={14}
                position="top-right"
              />
            </ReactQueryProvider>
          </NextIntlClientProvider>
        </NextProgressBarProvider>
      </body>
    </html>
  );
}
