import { Public_Sans, Inter } from "next/font/google";

export const public_sans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-public-sans",
  weight: ["700", "600", "500", "400"],
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["700", "600", "500", "400"],
});
