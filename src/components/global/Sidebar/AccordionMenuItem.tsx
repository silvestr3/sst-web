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
    <li>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger className="w-full hover:bg-accent/10 p-1 rounded-sm">
            <a
              className={cn([
                "flex items-center justify-start text-sm transition-colors duration-150 ease-in-out",
                isCollapsed && "justify-center",
              ])}
              href={href}
            >
              {icon}
              {!isCollapsed && <span className="text-muted/60">{label}</span>}
            </a>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent
              className="ml-2 bg-card-foreground border border-muted-foreground text-foreground p-2 rounded-md"
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
