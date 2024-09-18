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
      <TableCell>{group.isActive ? "Ativo" : "Inativo"}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
              <EllipsisVertical opacity={0.7} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{group.name}</DropdownMenuLabel>
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
