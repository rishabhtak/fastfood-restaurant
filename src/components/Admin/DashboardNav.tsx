"use client";
import { useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "./Icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/navItem";
import { Dispatch, SetStateAction } from "react";
import { Context } from "../ContextProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

type isMinimizedProps = boolean;

const DashboardNav = ({
  items,
  setOpen,
  isMobileNav = false,
}: DashboardNavProps) => {
  const path = usePathname();
  const { isMinimized } = useContext(Context) as {
    isMinimized: isMinimizedProps;
  };
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  if (!items?.length) {
    return null;
  }

  const handleAccordionToggle = (title: string) => {
    setOpenAccordion((prev) => (prev === title ? null : title));
  };

  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        {items.map((item, index) => {
          const Icon = Icons[item.icon || "arrowRight"];

          // Handle accordion behavior for items with submenus
          const isAccordionOpen = openAccordion === item.title;

          return (
            <div key={index}>
              {item.href && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.disabled ? "/" : item.href}
                      className={cn(
                        "flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        path === item.href ? "bg-accent" : "transparent",
                        item.disabled && "cursor-not-allowed opacity-80"
                      )}
                      onClick={() => {
                        if (setOpen) setOpen(false);
                        if (item.submenu) {
                          handleAccordionToggle(item.title);
                        }
                      }}
                    >
                      <Icon className={`ml-3 size-5 flex-none`} />
                      {isMobileNav || (!isMinimized && !isMobileNav) ? (
                        <span className="mr-2 truncate">{item.title}</span>
                      ) : (
                        ""
                      )}
                      {item.submenu && (
                        <span
                          className={`ml-auto transition-transform duration-300 ${
                            isAccordionOpen ? "rotate-180" : ""
                          }`}
                        >
                          <Icons.arrowDown size={16} />
                        </span>
                      )}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    align="center"
                    side="right"
                    sideOffset={8}
                    className={!isMinimized ? "hidden" : "inline-block"}
                  >
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              )}

              {/* Submenu rendering for accordion */}
              {item.submenu && isAccordionOpen && (
                <div className="pl-6">
                  {item.submenu.map((subItem, subIndex) => {
                    const SubIcon =
                      Icons[subItem.icon as keyof typeof Icons] ||
                      Icons.arrowRight;
                    return (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className={cn(
                          "flex items-center gap-2 rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                          path === subItem.href ? "bg-accent" : "transparent"
                        )}
                      >
                        <SubIcon className={`ml-3 size-5 flex-none`} />
                        {isMobileNav || (!isMinimized && !isMobileNav) ? (
                          <span className="mr-2 truncate">{subItem.title}</span>
                        ) : (
                          ""
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </TooltipProvider>
    </nav>
  );
};

export default DashboardNav;
