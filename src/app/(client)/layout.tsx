import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import "../globals.css";
import "react-multi-carousel/lib/styles.css";
import Header from "@/components/Client/Header/Index";
import Footer from "@/components/Client/Footer";
import ScrollUp from "@/components/Client/ScrollUp";

const inter = Inter({ subsets: ["latin"] });
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancingScript",
});

export const metadata: Metadata = {
  title: "Fast Food Restuarant",
  description: "Fast Food Restuarant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dancingScript.variable}`}>
      <body className={inter.className}>
        <Header />
        <ScrollUp />
        {children}
        <Footer />
      </body>
    </html>
  );
}
