"use client";
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
import { DeleteGroupDialog } from "./DeleteGroupDialog";
import { GroupFormSheet } from "./GroupFormSheet";

interface GroupListItemProps {
  group: {
    id: string;
    name: string;
    description: string;
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
            <EllipsisVertical className="cursor-pointer" opacity={0.7} />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-[220px]" align="end">
            <DropdownMenuLabel className="truncate">
              {group.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/groups/${group.id}`}>
              <DropdownMenuItem className="flex items-center">
                <Eye opacity={0.7} className="mr-4" />
                Visualizar
              </DropdownMenuItem>
            </Link>
            <GroupFormSheet
              name={group.name}
              description={group.description}
              groupId={group.id}
              isActive={group.isActive}
            >
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="flex items-center"
              >
                <Pencil opacity={0.7} className="mr-4" />
                Editar
              </DropdownMenuItem>
            </GroupFormSheet>
            <DropdownMenuSeparator />
            <DeleteGroupDialog groupName={group.name} groupId={group.id}>
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="flex items-center text-destructive"
              >
                <Trash2 opacity={0.7} className="mr-4" />
                Deletar
              </DropdownMenuItem>
            </DeleteGroupDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
