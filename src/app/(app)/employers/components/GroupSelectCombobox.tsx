"use client";

import { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Group } from "@/@types/Group";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface GroupSelectComboboxProps {
  groups: Group[];
}

export function GroupSelectCombobox({ groups }: GroupSelectComboboxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const pathname = usePathname();
  const { replace } = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (value !== "") {
      params.set("grupo", value);
    } else {
      params.delete("grupo");
    }

    replace(`${pathname}?${params.toString()}`);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between truncate"
        >
          {value
            ? groups.find((group) => group.id === value)?.name
            : "Selecione o grupo"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[250px] p-0">
        <Command
          filter={(value, search) => {
            return groups
              .find((item) => item.id === value)
              ?.name.toLowerCase()
              .includes(search)
              ? 1
              : 0;
          }}
        >
          <CommandInput placeholder="Buscar grupo..." />
          <CommandList>
            <CommandEmpty>Nenhum grupo encontrado.</CommandEmpty>

            {groups.map((group) => (
              <CommandItem
                key={group.id}
                value={group.id}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === group.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {group.name}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
