import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description: string;
  breadcrumbItems: Array<{
    href?: string;
    label: string;
  }>;
}

export function PageHeader({
  title,
  description,
  breadcrumbItems,
}: PageHeaderProps) {
  return (
    <>
      <Breadcrumb className="-mt-4">
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <>
              <BreadcrumbItem>
                {item.href ? (
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                ) : (
                  `${item.label}`
                )}
              </BreadcrumbItem>

              <BreadcrumbSeparator />
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <Separator />

      <div className="flex flex-col gap-1 justify-start">
        <h2 className="text-3xl text-accent-foreground">{title}</h2>
        <span className="text-secondary-foreground text-sm">{description}</span>
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
    </>
  );
}
