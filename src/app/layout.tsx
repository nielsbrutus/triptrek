import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400","500","600","700","800"],
  variable: "--font-brand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TripTrek.nl",
  description: "Huur dakkoffers, dakdragers en skidragers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className={montserrat.variable}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
