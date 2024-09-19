import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen grid grid-cols-2">
      <div className="bg-accent h-full border-r flex-1 p-8"></div>
      {children}
    </div>
  );
}
