import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const PageContainer = ({
  children,
  scrollable = false,
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) => {
  return (
    <>
      {scrollable ? (
        <ScrollArea className="h-[calc(100dvh-50px)]">
          <div className="h-full  p-4 md:px-8">{children}</div>
        </ScrollArea>
      ) : (
        <div className="h-full  p-4 md:px-8">{children}</div>
      )}
    </>
  );
};

export default PageContainer;
