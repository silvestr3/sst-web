import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ReactElement } from "react";

interface AccordionMenuItemProps {
  isCollapsed: boolean;
  label: string;
  href: string;
  icon: ReactElement;
}

export const AccordionMenuItem = ({
  isCollapsed,
  label,
  href,
  icon,
}: AccordionMenuItemProps) => {
  return (
    <li
      className={cn(
        "w-full hover:bg-primary/10 p-1 rounded-sm flex items-center",
        isCollapsed && "justify-center"
      )}
    >
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              className={cn([
                "flex items-center py-1 rounded-lg w-full justify-start text-sm",
                isCollapsed && "justify-center",
              ])}
              href={href}
            >
              {icon}
              {!isCollapsed && <span>{label}</span>}
            </a>
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
