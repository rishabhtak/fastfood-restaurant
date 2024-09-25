"use client";
import { createContext, useState } from "react";

export const Context = createContext({});

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMinimized, setisMinimized] = useState<boolean>(false);
  return (
    <Context.Provider value={{ isMinimized, setisMinimized }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
