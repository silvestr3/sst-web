import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { EllipsisVertical, Eye, Pencil, Trash2 } from "lucide-react";

interface GroupListItemProps {
  group: {
    id: string;
    name: string;
    isActive: boolean;
  };
}

export function GroupListItem({ group }: GroupListItemProps) {
  return (
    <TableRow>
      <TableCell>{group.name}</TableCell>
      <TableCell className="py-6 flex items-center gap-2">
        <span
          className={cn([
            "w-2 h-2 rounded-full",
            group.isActive ? "bg-emerald-500" : "bg-rose-500",
          ])}
        />
        <span>{group.isActive ? "Ativo" : "Inativo"}</span>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
              <EllipsisVertical opacity={0.7} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-[150px]" align="end">
            <DropdownMenuLabel className="truncate">
              {group.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center">
              <Eye opacity={0.7} className="mr-4" />
              Visualizar
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center">
              <Pencil opacity={0.7} className="mr-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center text-destructive">
              <Trash2 opacity={0.7} className="mr-4" />
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
