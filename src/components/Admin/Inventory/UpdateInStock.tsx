"use client";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PageContainer from "../PageContainer";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { inventoryType } from "@/types/inventoryType";
import { useToast } from "@/components/ui/use-toast";
import { buttonVariants } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const UpdateInStock = ({
  inStockData: initialData,
}: {
  inStockData: inventoryType[];
}) => {
  const [inStockData, setInStockData] = useState<inventoryType[]>(initialData);
  const { toast } = useToast();

  const groupedData = inStockData?.reduce((acc: any, item: inventoryType) => {
    const { category } = item;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  const onCheckedChange = async (id: number, inStock: boolean) => {
    setInStockData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, inStock: inStock } : item
      )
    );
    console.log("Updated Item ID:", id, "New In Stock Status:", inStock);
    // Update Inventory InStock
    try {
      const res = await fetch(`/api/inventory`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          inStock,
        }),
      });
      const data = await res.json();
      if (data.status === 400 || data.status === 500) {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error Updating Inventory InStock",
        description: `${error}`,
      });
    }
  };

  if (!inStockData || inStockData.length === 0) {
    return (
      <PageContainer>
        <div className="space-y-4">
          <p>There are no inventories, Please add inventory first </p>
          <Link
            href={"/admin/dashboard/inventory/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Inventory
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <div>
      <Accordion type="multiple" className="w-full">
        {Object.keys(groupedData)?.map((category) => (
          <AccordionItem key={category} value={category}>
            <AccordionTrigger className="capitalize text-xl font-bold hover:no-underline">
              {category}
            </AccordionTrigger>
            <AccordionContent>
              {groupedData[category]?.map((item: inventoryType) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between mb-2"
                >
                  <p className="text-lg capitalize">{item.name}</p>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`instock-${item.id}`}
                      checked={item.inStock}
                      onCheckedChange={() =>
                        onCheckedChange(item.id, !item.inStock)
                      }
                    />
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default UpdateInStock;
