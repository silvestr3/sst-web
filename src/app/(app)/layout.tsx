import { Header } from "@/components/global/Header";
import { Sidebar } from "@/components/global/Sidebar";
import { options } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";

interface LayoutProps {
  children: ReactNode;
}

export default async function AppLayout({ children }: LayoutProps) {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col antialiased">
      <Header />
      <NextTopLoader
        easing="ease"
        speed={200}
        crawlSpeed={200}
        color="#c9c9e4"
      />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
