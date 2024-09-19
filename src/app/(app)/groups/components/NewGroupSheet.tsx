"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { ReactNode } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const newGroupFormSchema = z.object({
  name: z.string(),
  description: z.string(),
});

type NewGroupFormType = z.infer<typeof newGroupFormSchema>;

interface NewGroupSheetProps {
  children: ReactNode;
}

export function NewGroupSheet({ children }: NewGroupSheetProps) {
  const { register, handleSubmit, reset } = useForm<NewGroupFormType>({
    resolver: zodResolver(newGroupFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function handleCreateNewGroupSubmit(data: NewGroupFormType) {
    console.log(data);

    reset();
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        aria-describedby="Cadastrar novo grupo"
        className="bg-card text-foreground"
        side={"right"}
      >
        <SheetHeader>
          <SheetTitle>Cadastrar novo grupo</SheetTitle>
        </SheetHeader>
        <form
          onSubmit={handleSubmit(handleCreateNewGroupSubmit)}
          className="mt-5 space-y-3"
        >
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input {...register("name")} type="text" id="name" />
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea {...register("description")} id="description" />
          </div>

          <div className="flex items-center gap-1 justify-end">
            <Button type="submit" className="flex items-center gap-2">
              <Save size={18} />
              Salvar
            </Button>
            <SheetClose asChild>
              <Button onClick={() => reset()} variant={"outline"}>
                Cancelar
              </Button>
            </SheetClose>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
