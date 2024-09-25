import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { EmployerListItem } from "./components/EmployerListItem";
import { fetchEmployersByGroup } from "@/services/fetch-employers-by-group";
import { Http2ServerRequest } from "http2";

interface GroupInstancePageProps {
  params: {
    groupId: string;
  };
}

export default async function GroupInstancePage({
  params,
}: GroupInstancePageProps) {
  const { groupId } = params;
  const { employers, group } = await fetchEmployersByGroup(groupId);

  return (
    <div className="flex flex-col gap-2">
      <Breadcrumb className="-mt-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/groups">Grupos</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>{group.name}</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Separator />

      <div className="flex flex-col gap-1 justify-start">
        <h2 className="text-3xl text-accent-foreground">{group.name}</h2>
        <span className="text-secondary-foreground text-sm">
          {group.description}
        </span>
      </div>

      <div className="mt-6 flex items-center gap-1">
        <Input
          className="placeholder:text-accent"
          placeholder="Pesquisar empresa"
        />
        <Select>
          <SelectTrigger className="w-64">
            <SelectValue placeholder={"Status"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ativo">Ativa</SelectItem>
            <SelectItem value="inativo">Inativa</SelectItem>
          </SelectContent>
        </Select>
        <Button className="flex items-center gap-2">
          <Search size={18} />
          Buscar
        </Button>
      </div>

      {employers.length > 0 ? (
        <Table className="mt-8">
          <TableHeader>
            <TableRow>
              <TableHead className="mr-auto">Nome da empresa</TableHead>
              <TableHead className="w-56">CPF/CNPJ</TableHead>
              <TableHead className="w-48">Status</TableHead>
              <TableHead className="w-16 text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employers.map((employer) => (
              <EmployerListItem key={employer.id} employer={employer} />
            ))}
          </TableBody>
        </Table>
      ) : (
        <h2 className="text-center mt-10 text-lg">
          Não foram encontradas empresas cadastradas neste grupo
        </h2>
      )}
    </div>
  );
}
