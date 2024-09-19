import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignupPage() {
  return (
    <form className="flex flex-col gap-2 items-center justify-center">
      <h1 className="font-bold text-2xl mb-6">Cadastrar nova conta</h1>

      <div className="flex flex-col gap-2">
        <Label>Seu nome</Label>
        <Input type="text" className="w-[320px]" />
      </div>

      <div className="flex flex-col gap-2">
        <Label>CPF</Label>
        <Input type="text" className="w-[320px]" />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Telefone</Label>
        <Input type="text" className="w-[320px]" />
      </div>

      <div className="flex flex-col gap-2">
        <Label>E-mail</Label>
        <Input type="email" className="w-[320px]" />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Senha</Label>
        <Input type="password" className="w-[320px]" />
      </div>

      <div className="flex flex-col gap-4 mt-8 items-center justify-center w-1/2">
        <Button>Login</Button>
        <span className="flex items-center text-muted-foreground text-sm">
          Já possui uma conta?
          <Link href={"/login"}>
            <Button variant={"link"}>Entrar</Button>
          </Link>
        </span>
      </div>
    </form>
  );
}
