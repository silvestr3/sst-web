"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginType = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  async function handleUserLogin(data: LoginType) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(handleUserLogin)}
      className="flex flex-col gap-2 items-center justify-center"
    >
      <h1 className="font-bold text-2xl mb-6">Entre em sua conta</h1>

      <div className="flex flex-col gap-2">
        <Label>E-mail</Label>
        <Input {...register("email")} type="email" className="w-[320px]" />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Senha</Label>
        <Input
          {...register("password")}
          type="password"
          className="w-[320px]"
        />
      </div>

      <div className="flex flex-col gap-4 mt-8 items-center justify-center w-1/2">
        <Button>Login</Button>
        <span className="flex items-center text-muted-foreground text-sm">
          Ainda não possui uma conta?
          <Link href={"/signup"}>
            <Button variant={"link"}>Cadastrar</Button>
          </Link>
        </span>
      </div>
    </form>
  );
}
