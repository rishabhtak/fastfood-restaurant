"use client";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { inventoryType } from "@/types/inventoryType";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Context } from "@/components/ContextProvider";

interface CellActionProps {
  data: inventoryType;
}

interface isLoadingProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  deleteInventory: (id: number) => void;
}

export const InventoryCellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { setIsLoading, deleteInventory } =
    useContext(Context) as isLoadingProps;
  const { toast } = useToast();

  const onConfirm = async () => {
    try {
      setIsLoading(true);
      // Send both requests in parallel
      const [deleteInventoryResponse, deleteImageResponse] = await Promise.all([
        fetch(`/api/inventory/?id=${data?.id}`, { method: "DELETE" }),
        data?.image?.url
          ? fetch(`/api/uploadImage/?url=${data?.image?.url}`, {
              method: "DELETE",
            })
          : Promise.resolve({ ok: true }),
      ]);

      // Handle inventory deletion response
      if (!deleteInventoryResponse.ok) {
        throw new Error("Inventory deletion has failed");
      }

      // Handle image deletion response
      if (!deleteImageResponse.ok) {
        throw new Error("Inventory Deleted but Image deletion has failed");
      }
      deleteInventory(data.id);
      router.refresh();
      toast({
        variant: "default",
        duration: 2000,
        title: "Inventory deleted successfully",
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
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete
              inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/admin/dashboard/inventory/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
