import Breadcrumbs from "@/components/Breadcrumbs";
import PageContainer from "@/components/Admin/PageContainer";
import { inventoryColumns } from "@/components/Admin/Inventory/inventoryColumns";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { inventoryType } from "@/types/inventoryType";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/Admin/DataTable";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Inventory", link: "/dashboard/inventory" },
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
export default async function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const name = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  try {
    const response = await fetch(
      `${baseUrl}/api/inventory/?offset=${offset}&limit=${pageLimit}&_=${Date.now()}` +
        (name ? `&search=${name}` : ""),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.status === "400" || data.status === "500") {
      throw new Error("Failed to fetch inventory data");
    }
    const totalInventory = data.count;
    const pageCount = Math.ceil(totalInventory / pageLimit);
    const inventory: inventoryType[] = data.inventories;
    return (
      <PageContainer>
        <div className="space-y-4">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="flex items-start justify-between">
            <Heading title={`Inventory (${totalInventory})`} />

            <Link
              href={"/admin/dashboard/inventory/new"}
              className={cn(buttonVariants({ variant: "default" }))}
            >
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Link>
          </div>
          <Separator />
          <DataTable
            searchKey="Item Name"
            pageNo={page}
            columns={inventoryColumns}
            //  totalInventory={totalInventory}
            data={inventory}
            pageCount={pageCount}
            statusBox={false}
          />
        </div>
      </PageContainer>
    );
  } catch (error) {
    return (
      <PageContainer>
        <div className="space-y-4">
          <Heading title="Failed to load inventory data because of internal server error or bad request." />
          <p>{`Please try again later or Keep trying to reload browser ${error}`}</p>
        </div>
      </PageContainer>
    );
  }
}
