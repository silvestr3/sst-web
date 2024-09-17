import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";

interface MenuItemProps {
  isCollapsed: boolean;
  label: string;
  href: string;
  icon: ReactElement;
}

export const MenuItem = ({ isCollapsed, label, href, icon }: MenuItemProps) => {
  const pathname = usePathname();
  const basepath = pathname.split("/")[1];

  return (
    <li
      className={cn(
        "w-full hover:bg-accent py-1 rounded-sm flex items-center",
        isCollapsed && "justify-center",
        basepath === href.slice(1) && "bg-accent hover:0"
      )}
    >
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger className={cn(["hover:opacity-100"])} asChild>
            <Link
              className={cn([
                "flex items-center py-1 rounded-lg w-full h-full justify-start text-sm",
                isCollapsed && "justify-center",
              ])}
              href={href}
            >
              {icon}
              {!isCollapsed && <span>{label}</span>}
            </Link>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent
              className="ml-2 bg-card text-foreground p-2 rounded-md"
              side="right"
            >
              {label}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </li>
  );
};
