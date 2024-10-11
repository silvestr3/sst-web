import { Button } from "@/components/ui/button";
import { Building2, FileDown, Plus, Search } from "lucide-react";
import { GroupSelectCombobox } from "./components/GroupSelectCombobox";
import { Input } from "@/components/ui/input";
import { fetchGroups } from "@/services/fetch-groups";
import { Employer } from "@/@types/Employer";
import { fetchEmployersByGroup } from "@/services/fetch-employers-by-group";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmployerListItem } from "../groups/[groupId]/components/EmployerListItem";

interface EmployersPageProps {
  searchParams: {
    grupo?: string;
    q?: string;
  };
}

export default async function EmployersPage({
  searchParams,
}: EmployersPageProps) {
  const { groups } = await fetchGroups();

  const { grupo } = searchParams;

  let employers: Employer[];

  if (grupo) {
    const { employers: employersList } = await fetchEmployersByGroup(grupo);
    employers = employersList;
  } else {
    employers = [];
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-start text-3xl text-accent-foreground">
        <Building2 size={32} className="mr-6" />
        <h2>Empresas</h2>

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
        Gerencie as empresas em sua assinatura
      </span>

      <div className="mt-6 flex items-center gap-1">
        <GroupSelectCombobox groups={groups} />

        <Input
          className="placeholder:text-accent"
          placeholder="Pesquisar nome da empresa"
        />

        <Button type="submit" className="flex items-center gap-2">
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
        <>
          {grupo ? (
            <h2 className="text-center mt-10 text-lg">
              {!searchParams.q
                ? "Nenhuma empresa cadastrada neste grupo"
                : `Sua pesquisa "${searchParams.q}" não retornou nenhum resultado`}
            </h2>
          ) : (
            <h2 className="text-center mt-10 text-lg">
              Selecione um grupo para exibir as empresas cadastradas nele
            </h2>
          )}
        </>
      )}
    </div>
  );
}
