import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmployerListItem } from "./components/EmployerListItem";
import { fetchEmployersByGroup } from "@/services/fetch-employers-by-group";
import { PageHeader } from "@/components/global/page-header";

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

  const headerData = {
    title: group.name,
    description: group.description,
    breadcrumbItems: [
      {
        label: "Grupos",
        href: "/groups",
      },
      {
        label: group.name,
      },
    ],
  };

  return (
    <div className="flex flex-col gap-2">
      <PageHeader {...headerData} />

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
