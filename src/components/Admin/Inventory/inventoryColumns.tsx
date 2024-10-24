"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { inventoryType } from "@/types/inventoryType";
import { ColumnDef } from "@tanstack/react-table";
import { InventoryCellAction } from "./InventoryCellAction";

export const inventoryColumns: ColumnDef<inventoryType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Item Name",
    id: "Item Name",
    enableHiding: false,
    cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
  },
  {
    accessorKey: "description",
    header: "Item Description",
  },
  {
    accessorKey: "inStock",
    header: "Item In Stock",
    id: "In Stock",
    enableSorting: false,
    cell: ({ row }) => <div>{row.original.inStock ? "Yes" : "No"}</div>,
  },
  {
    accessorKey: "category",
    header: "Item Category",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.category}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => <InventoryCellAction data={row.original} />,
  },
];
