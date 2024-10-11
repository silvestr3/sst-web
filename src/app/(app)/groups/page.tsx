import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Component, FileDown, Plus, Search } from "lucide-react";
import { GroupListItem } from "./components/GroupListItem";
import { fetchGroups } from "@/services/fetch-groups";
import { GroupFormSheet } from "./components/GroupFormSheet";
import { SearchGroupInput } from "./components/SearchGroupInput";
import { Group } from "@/@types/Group";
import { searchGroups } from "@/services/search-groups";

interface GroupsPageProps {
  searchParams: {
    q?: string;
  };
}

export default async function GroupsPage({ searchParams }: GroupsPageProps) {
  let groups: Group[];

  if (searchParams.q) {
    const { groups: groupsList } = await searchGroups({ q: searchParams.q });
    groups = groupsList;
  } else {
    const { groups: groupsList } = await fetchGroups();
    groups = groupsList;
  }

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

      <SearchGroupInput />

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
          {!searchParams.q
            ? "Você ainda não cadastrou nenhum grupo"
            : `Sua pesquisa "${searchParams.q}" não retornou nenhum resultado`}
        </h2>
      )}
    </div>
  );
}
