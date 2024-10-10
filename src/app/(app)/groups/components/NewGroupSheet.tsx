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
import { createGroup } from "@/services/create-group";
import { toast } from "sonner";

const newGroupFormSchema = z.object({
  name: z.string().min(1, "Nome do grupo é obrigatório"),
  description: z.string().min(1, "Forneça uma descrição ao grupo"),
});

type NewGroupFormType = z.infer<typeof newGroupFormSchema>;

interface NewGroupSheetProps {
  children: ReactNode;
}

export function NewGroupSheet({ children }: NewGroupSheetProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewGroupFormType>({
    resolver: zodResolver(newGroupFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function handleCreateNewGroupSubmit(data: NewGroupFormType) {
    const result = await createGroup({
      name: data.name,
      description: data.description,
    });

    if (result.statusCode) {
      toast.error(result.message);
      return;
    }

    const groupName = result.group.name;
    toast.success(`Grupo "${groupName}" criado com sucesso!`);

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
            {errors.name && (
              <span className="text-sm text-rose-600 font-semibold">
                {errors.name.message}
              </span>
            )}
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea {...register("description")} id="description" />
            {errors.description && (
              <span className="text-sm text-rose-600 font-semibold">
                {errors.description.message}
              </span>
            )}
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
