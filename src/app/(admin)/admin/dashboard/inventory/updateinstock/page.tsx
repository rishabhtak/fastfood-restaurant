import Breadcrumbs from "@/components/Breadcrumbs";
import PageContainer from "@/components/Admin/PageContainer";
import UpdateInStock from "@/components/Admin/Inventory/UpdateInStock";
import { Heading } from "@/components/ui/heading";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";

const breadcrumbItems = [
  { title: "Dashboard", link: "/admin/dashboard" },
  { title: "Inventory", link: "/admin/dashboard/inventory" },
  {
    title: "Update In Stock",
    link: "/admin/dashboard/inventory/updateinstock",
  },
];

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default async function page() {
  try {
    const response = await fetch(`${baseUrl}/api/inventory/?_=${Date.now()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.status === 500) {
      throw new Error("Failed to fetch inventories");
    } else if (data.inStockData.length === 0) {
      return (
        <PageContainer>
          <div className="space-y-4">
            <Heading title="No inventories found" />
            <p>Please create inventory first then try again</p>
            <Link
              href={"/admin/dashboard/inventory/new"}
              className={cn(buttonVariants({ variant: "default" }))}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Item
            </Link>
          </div>
        </PageContainer>
      );
    } else {
      return (
        <PageContainer>
          <div className="space-y-4">
            <Breadcrumbs items={breadcrumbItems} />

            <UpdateInStock inStockData={data.inStockData} />
          </div>
        </PageContainer>
      );
    }
  } catch (error) {
    return (
      <PageContainer>
        <div className="space-y-4">
          <Heading title="Failed to load inventories because of internal server error or bad request." />
          <p>{`Please try again later or Keep trying to reload browser ${error}`}</p>
        </div>
      </PageContainer>
    );
  }
}
