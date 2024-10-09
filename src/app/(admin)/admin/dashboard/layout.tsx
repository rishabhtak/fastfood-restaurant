import Header from "@/components/Admin/AdminLayout/Header";
import Sidebar from "@/components/Admin/AdminLayout/Sidebar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import ContextProvider from "@/components/ContextProvider";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fast Food Restuarant Admin Dashboard",
  description: "Fast Food Restuarant Admin Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-[#fefcfb]">
      <body className={inter.className}>
        <ContextProvider>
          <NextTopLoader showSpinner={false} />
          <div className="flex">
            <Sidebar />
            <main className="w-full flex-1 overflow-hidden">
              <Header />
              {children}
            </main>
          </div>
        </ContextProvider>
      </body>
    </html>
  );
}

