import Breadcrumbs from "@/components/Breadcrumbs";
import { InventoryForm } from "@/components/Admin/Inventory/InventoryForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { inventoryType } from "@/types/inventoryType";

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
  const response = await fetch(
    `${baseUrl}/api/inventory/?id=${params.inventoryid}&_=${Date.now()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const res = await response.json();
  let inventory: inventoryType | null = res.inventory;

 // console.log("inventory", inventory);
  // params { inventoryid: '1' }
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <InventoryForm
          categories={[
            { _id: "shirts", name: "shirts" },
            { _id: "pants", name: "pants" },
          ]}
          initialData={inventory}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
