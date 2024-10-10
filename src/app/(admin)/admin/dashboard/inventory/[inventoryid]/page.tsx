import Breadcrumbs from "@/components/Breadcrumbs";
import { InventoryForm } from "@/components/Admin/Inventory/InventoryForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { inventoryType } from "@/types/inventoryType";
import PageContainer from "@/components/Admin/PageContainer";
import { Heading } from "@/components/ui/heading";

const breadcrumbItems = [
  { title: "Dashboard", link: "/admin/dashboard" },
  { title: "Inventory", link: "/admin/dashboard/inventory" },
  { title: "Create", link: "/admin/dashboard/inventory/create" },
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
  params: {
    inventoryid: string;
  };
};

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
export default async function Page({ params }: paramsProps) {
  let inventory: inventoryType | null = null;
  try {
    if (params.inventoryid === "new") {
      return (
        <ScrollArea className="h-full">
          <div className="flex-1 space-y-4 p-8">
            <Breadcrumbs items={breadcrumbItems} />
            <InventoryForm initialData={null} />
          </div>
        </ScrollArea>
      );
    }
    const response = await fetch(
      `${baseUrl}/api/inventory/?id=${params.inventoryid}&_=${Date.now()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (!data.inventory) {
      throw new Error("Failed to fetch inventory data");
    }
    inventory = data.inventory;
    return (
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-8">
          <Breadcrumbs items={breadcrumbItems} />
          <InventoryForm initialData={inventory} />
        </div>
      </ScrollArea>
    );
  } catch (error) {
    return (
      <PageContainer>
        <div className="space-y-4">
          <Heading title="Failed to load inventory data." />
          <p>
            An error occurred while retrieving inventory data. The requested
            inventory item may have been deleted or might not exist yet.
          </p>
        </div>
      </PageContainer>
    );
  }
}
