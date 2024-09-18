"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "../../ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Briefcase,
  Building,
  Building2,
  Component,
  Grid2x2Plus,
  House,
  IdCard,
  Menu,
  User,
} from "lucide-react";
import { MenuItem } from "./MenuItem";

const registrationsMenuItems = [
  {
    label: "Grupo",
    href: "/groups",
    icon: Component,
  },
  {
    label: "Empresa",
    href: "/employers",
    icon: Building2,
  },
  {
    label: "Unidade",
    href: "/branches",
    icon: Building,
  },
  {
    label: "Setor",
    href: "/departments",
    icon: IdCard,
  },
  {
    label: "Função",
    href: "/positions",
    icon: Briefcase,
  },
  {
    label: "Funcionários",
    href: "/employees",
    icon: User,
  },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const toggleCollapsed = () => setIsCollapsed((state) => !state);

  return (
    <aside
      className={cn([
        "border-r border-muted-foreground/20 transition-all duration-300 ease-in-out px-1 py-2",
        isCollapsed ? "w-16" : "w-64",
      ])}
    >
      <div
        className={cn([
          "flex items-center",
          !isCollapsed ? "justify-end" : "justify-center",
        ])}
      >
        <Button
          type="button"
          variant={"ghost"}
          size={"icon"}
          onClick={toggleCollapsed}
        >
          <Menu />
          <span className="sr-only">Minimizar o menu</span>
        </Button>
      </div>

      <nav className="px-1 mt-2">
        <MenuItem
          href="/"
          isCollapsed={isCollapsed}
          label="Página inicial"
          icon={
            <House
              opacity={0.8}
              className={cn(["h-5 w-5", !isCollapsed && "mr-3"])}
            />
          }
        />

        <Accordion type="multiple">
          <AccordionItem value="registrations">
            <AccordionTrigger
              showCaret={!isCollapsed}
              className={cn([
                "text-sm font-medium flex justify-start ",
                isCollapsed && "justify-center px-3",
              ])}
            >
              <Grid2x2Plus opacity={0.8} className="h-5 w-5 mr-3" />
              {!isCollapsed && <span>Cadastros</span>}
            </AccordionTrigger>

            <AccordionContent>
              <ul className={cn(["mt-2 space-y-0"])}>
                {registrationsMenuItems.map((item) => (
                  <MenuItem
                    key={item.label}
                    href={item.href}
                    label={item.label}
                    isCollapsed={isCollapsed}
                    icon={
                      <item.icon
                        opacity={0.8}
                        className={cn(["h-5 w-5", !isCollapsed && "mr-3"])}
                      />
                    }
                  />
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </nav>
    </aside>
  );
}
