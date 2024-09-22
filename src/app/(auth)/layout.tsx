import { options } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(options);

  if (session) {
    redirect("/");
  }

  return (
    <div className="h-screen grid grid-cols-2">
      <div className="bg-accent h-full border-r flex-1 p-8"></div>
      {children}
    </div>
  );
}
