"use client";
import { createContext, useState } from "react";

export const Context = createContext({});

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <Context.Provider
      value={{ isMinimized, setIsMinimized, isLoading, setIsLoading }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
