import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { deleteGroup } from "@/services/delete-group";
import { ReactNode } from "react";
import { toast } from "sonner";

interface DeleteGroupDialogProps {
  children: ReactNode;
  groupName: string;
  groupId: string;
}

export function DeleteGroupDialog({
  children,
  groupId,
  groupName,
}: DeleteGroupDialogProps) {
  async function handleDeleteGroup() {
    const result = await deleteGroup({ groupId });

    if (result.statusCode) {
      toast.error(result.message);
      return;
    }

    toast.success(`Grupo "${groupName}" deletado com sucesso`);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Tem certeza que deseja deletar o grupo {groupName}?
          </DialogTitle>
          <DialogDescription>
            Esta ação não pode ser desfeita. Porém, não será possível deletar o
            grupo caso este tenha empresas cadastradas
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant={"outline"}>Cancelar</Button>
          </DialogClose>
          <Button onClick={handleDeleteGroup} variant={"destructive"}>
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
