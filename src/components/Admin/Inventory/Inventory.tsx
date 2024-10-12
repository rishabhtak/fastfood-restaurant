"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { inventoryColumns } from "@/components/Admin/Inventory/inventoryColumns";
import { inventoryType } from "@/types/inventoryType";
import { DataTable } from "@/components/Admin/DataTable";
import { useToast } from "@/components/ui/use-toast";
import { Context } from "@/components/ContextProvider";

interface InventoryProps {
  page: number;
  pageCount: number;
  inventory: inventoryType[];
}
interface isLoadingProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Inventory = ({ page, pageCount, inventory }: InventoryProps) => {
  const { isLoading, setIsLoading } = useContext(Context) as isLoadingProps;
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

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loader"></span>
        </div>
      ) : (
        <DataTable
          searchKey="Item Name"
          pageNo={page}
          columns={inventoryColumns}
          //  totalInventory={totalInventory}
          data={inventory}
          pageCount={pageCount}
          statusBox={false}
          onDelete={handleDeleteSelectedRows}
        />
      )}
    </>
  );
};
