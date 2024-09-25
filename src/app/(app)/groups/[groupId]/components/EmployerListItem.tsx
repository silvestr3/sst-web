import { Employer } from "@/@types/Employer";
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
import Link from "next/link";

interface EmployerListItemProps {
  employer: Employer;
}

export function EmployerListItem({ employer }: EmployerListItemProps) {
  return (
    <TableRow>
      <TableCell>{employer.nomeFantasia}</TableCell>
      <TableCell>123.123.123-12</TableCell>
      <TableCell className="py-6 flex items-center gap-2">
        <span
          className={cn([
            "w-2 h-2 rounded-full",
            employer.isActive ? "bg-emerald-500" : "bg-rose-500",
          ])}
        />
        <span>{employer.isActive ? "Ativa" : "Inativa"}</span>
      </TableCell>
      <TableCell className="p-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <EllipsisVertical className="cursor-pointer" opacity={0.7} />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-[220px]" align="end">
            <DropdownMenuLabel className="truncate">
              {employer.nomeFantasia}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/employers/${employer.id}`}>
              <DropdownMenuItem className="flex items-center">
                <Eye opacity={0.7} className="mr-4" />
                Visualizar
              </DropdownMenuItem>
            </Link>
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
