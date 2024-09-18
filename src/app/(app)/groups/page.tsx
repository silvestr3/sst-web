import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
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

const groups = [
  {
    id: "1",
    name: "CONSTRUTORA ENERGIA",
    isActive: true,
  },
  {
    id: "2",
    name: "CONSTRUTORA PERFIL LTDA",
    isActive: true,
  },
  {
    id: "3",
    name: "CONSTRUTORA SÃO CRISTÓVÃO",
    isActive: true,
  },
  {
    id: "4",
    name: "FAZER CONSULTORIA E TREINAMENTOS",
    isActive: true,
  },
  {
    id: "5",
    name: "GERAÇÃO CULTIVAR",
    isActive: true,
  },
];

export default function GroupsPage() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-start text-3xl text-accent-foreground">
        <Component size={32} className="mr-6" />
        <h2>Grupos</h2>

        <div className="flex items-center gap-1 ml-auto">
          <Button
            className="flex items-center gap-2 text-secondary-foreground"
            variant={"secondary"}
          >
            <Plus size={18} />
            Novo
          </Button>
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

      <Table className="mt-8">
        <TableHeader>
          <TableHead className="mr-auto">Nome do grupo</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-16 text-right"></TableHead>
        </TableHeader>
        <TableBody>
          {groups.map((group) => (
            <GroupListItem key={group.id} group={group} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
