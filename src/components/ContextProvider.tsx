"use client";
import { createContext, useState } from "react";
import { inventoryType } from "@/types/inventoryType";
export const Context = createContext({});

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inventories, setInventories] = useState<inventoryType[]>([]);

  const deleteInventory = (id: number) => {
    setInventories((prevInventories) =>
      prevInventories.filter((item) => item.id !== id)
    );
  };

  return (
    <Context.Provider
      value={{
        isMinimized,
        setIsMinimized,
        isLoading,
        setIsLoading,
        inventories,
        setInventories,
        deleteInventory,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
