import { Header } from "@/components/global/Header";
import { Sidebar } from "@/components/global/Sidebar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col antialiased">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
