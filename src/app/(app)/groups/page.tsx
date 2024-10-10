import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Component, FileDown, Plus, Search } from "lucide-react";
import { GroupListItem } from "./components/GroupListItem";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchGroups } from "@/services/fetch-groups";
import { GroupFormSheet } from "./components/GroupFormSheet";

export default async function GroupsPage() {
  const { groups } = await fetchGroups();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-start text-3xl text-accent-foreground">
        <Component size={32} className="mr-6" />
        <h2>Grupos</h2>

        <div className="flex items-center gap-1 ml-auto">
          <GroupFormSheet>
            <Button
              className="flex items-center gap-2 text-secondary-foreground"
              variant={"secondary"}
            >
              <Plus size={18} />
              Novo
            </Button>
          </GroupFormSheet>
          <Button
            className="flex items-center gap-2 text-secondary-foreground"
            variant={"outline"}
          >
            <FileDown size={18} />
            Exportar
          </Button>
        </div>
      </div>
      <span className="text-secondary-foreground text-sm">
        Agrupe empresas/clientes sob sua gestão com configurações semelhantes
      </span>

      <div className="mt-6 flex items-center gap-1">
        <Input
          className="placeholder:text-accent"
          placeholder="Pesquisar nome do grupo"
        />
        <Select>
          <SelectTrigger className="w-64">
            <SelectValue placeholder={"Status"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ativo">Ativo</SelectItem>
            <SelectItem value="inativo">Inativo</SelectItem>
          </SelectContent>
        </Select>
        <Button className="flex items-center gap-2">
          <Search size={18} />
          Buscar
        </Button>
      </div>

      {groups.length > 0 ? (
        <Table className="mt-8">
          <TableHeader>
            <TableRow>
              <TableHead className="mr-auto">Nome do grupo</TableHead>
              <TableHead className="w-56">Status</TableHead>
              <TableHead className="w-16 text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.map((group) => (
              <GroupListItem key={group.id} group={group} />
            ))}
          </TableBody>
        </Table>
      ) : (
        <h2 className="text-center mt-10 text-lg">
          Você ainda não cadastrou nenhum grupo
        </h2>
      )}
    </div>
  );
}
