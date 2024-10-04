import Breadcrumbs from "@/components/Breadcrumbs";
import { InventoryForm } from "@/components/Admin/Inventory/InventoryForm";
import { ScrollArea } from "@/components/ui/scroll-area";

const breadcrumbItems = [
  { title: "Dashboard", link: "/admin/dashboard" },
  { title: "Inventory", link: "/admin/dashboard/inventory" },
  { title: "Create", link: "/admin/dashboard/inventory/create" },
];

export default function Page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <InventoryForm
          categories={[
            { _id: "shirts", name: "shirts" },
            { _id: "pants", name: "pants" },
          ]}
          initialData={null}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
