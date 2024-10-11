"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const searchEmployerSchema = z.object({
  q: z.string(),
});

type SearchEmployerType = z.infer<typeof searchEmployerSchema>;

export function SearchEmployerInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { handleSubmit, register, reset } = useForm<SearchEmployerType>({
    resolver: zodResolver(searchEmployerSchema),
    values: {
      q: searchParams.get("q")?.toString() ?? "",
    },
  });

  function handleSearchEmployer(data: SearchEmployerType) {
    const search = data.q;
    const params = new URLSearchParams(searchParams);

    if (search !== "") {
      params.set("q", search);
    } else {
      params.delete("q");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  function handleResetSearch() {
    const params = new URLSearchParams(searchParams);
    params.delete("q");
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit(handleSearchEmployer)}
      className="flex-1 flex items-center gap-1"
    >
      <div className="flex-1 flex items-center relative">
        <Input
          {...register("q")}
          className="placeholder:text-accent"
          placeholder="Pesquisar nome da empresa"
        />

        <X
          onClick={handleResetSearch}
          className="absolute right-2 opacity-60 cursor-pointer hover:opacity-100"
        />
      </div>

      <Button type="submit" className="flex items-center gap-2">
        <Search size={18} />
        Buscar
      </Button>
    </form>
  );
}
