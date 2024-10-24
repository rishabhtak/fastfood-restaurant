"use client";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { inventoryColumns } from "@/components/Admin/Inventory/inventoryColumns";
import { inventoryType } from "@/types/inventoryType";
import { DataTable } from "@/components/Admin/DataTable";
import { useToast } from "@/components/ui/use-toast";
import { Context } from "@/components/ContextProvider";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageContainer from "@/components/Admin/PageContainer";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";

interface InventoryProps {
  page: number;
  pageCount: number;
  inventory: inventoryType[];
  breadcrumbItems: { title: string; link: string }[];
}
interface isLoadingProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  inventories: inventoryType[];
  setInventories: React.Dispatch<React.SetStateAction<inventoryType[]>>;
  deleteInventory: (id: number) => void;
}
export const Inventory = ({
  page,
  pageCount,
  inventory,
  breadcrumbItems,
}: InventoryProps) => {
  const {
    isLoading,
    setIsLoading,
    inventories,
    setInventories,
    deleteInventory,
  } = useContext(Context) as isLoadingProps;
  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteSelectedRows = async (selectedRows: inventoryType[]) => {
    try {
      setIsLoading(true);
      selectedRows.forEach(async (row) => {
        // Send both requests in parallel
        const [deleteInventoryResponse, deleteImageResponse] =
          await Promise.all([
            fetch(`/api/inventory/?id=${row?.id}`, { method: "DELETE" }),
            row?.image?.url
              ? fetch(`/api/uploadImage/?url=${row?.image?.url}`, {
                  method: "DELETE",
                })
              : Promise.resolve({ ok: true }),
          ]);
        // Handle inventory deletion response
        if (!deleteInventoryResponse.ok) {
          throw new Error("Selected inventory deletion has failed");
        }

        // Handle image deletion response
        if (!deleteImageResponse.ok) {
          throw new Error(
            "Selected inventory deleted but image deletion has failed"
          );
        }
      });
      router.refresh();
      toast({
        variant: "default",
        duration: 2000,
        title: "Selected inventory deleted successfully",
      });
    } catch (error) {
      router.refresh();
      toast({
        variant: "destructive",
        duration: 4000,
        title: "Uh oh! Something went wrong.",
        description: `There is a problem with your request. Please try again later.
          ${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setInventories(inventory);
  }, [inventory, setInventories]);

  return (
    <>
      <PageContainer>
        <div className="space-y-4">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="flex items-start justify-between">
            <Heading title={`Inventory (${inventories?.length})`} />
            <div className="flex justify-end gap-3">
              <Link
                href={"/admin/dashboard/inventory/category"}
                className={cn(buttonVariants({ variant: "default" }))}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Category
              </Link>
              <Link
                href={"/admin/dashboard/inventory/new"}
                className={cn(buttonVariants({ variant: "default" }))}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Item
              </Link>
              <Link
                href={"/admin/dashboard/inventory/updateinstock"}
                className={cn(buttonVariants({ variant: "default" }))}
              >
                <Plus className="mr-2 h-4 w-4" /> Update InStock
              </Link>
            </div>
          </div>
          <Separator />
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <span className="loader"></span>
            </div>
          ) : (
            <DataTable
              searchKey="Item Name"
              pageNo={page}
              columns={inventoryColumns}
              data={inventories}
              pageCount={pageCount}
              statusBox={false}
              onDelete={handleDeleteSelectedRows}
            />
          )}
        </div>
      </PageContainer>
    </>
  );
};
