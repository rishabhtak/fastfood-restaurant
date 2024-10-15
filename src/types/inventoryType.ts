import { Variant } from "@/components/Admin/Inventory/Variants";
export type inventoryType = {
  id: number;
  name: string;
  description: string;
  category: string;
  vegNonVeg: string;
  inStock: boolean;
  variants: Variant[];
  addons: Variant[];
  image: {
    url: string;
    altText: string;
  };
};
