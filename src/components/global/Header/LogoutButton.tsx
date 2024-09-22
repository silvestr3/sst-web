"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await signOut({
      redirect: false,
    });

    router.replace("/login");
    toast.success("Sessão encerrada");
  }

  return (
    <Button
      onClick={handleLogout}
      className="w-full items-center justify-start text-destructive p-2"
      variant={"ghost"}
    >
      <LogOut opacity={0.7} className="mr-2" />
      <span>Sair</span>
    </Button>
  );
}
