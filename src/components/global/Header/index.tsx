import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { options } from "@/lib/auth";
import { Settings, User } from "lucide-react";
import { getServerSession } from "next-auth";
import React from "react";
import { LogoutButton } from "./LogoutButton";

export async function Header() {
  const session = await getServerSession(options);

  const { profilePicture, name } = session!.user;

  const userInitials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2);

  return (
    <header className="bg-primary text-primary-foreground p-4 h-16 flex items-center justify-between">
      <h1 className="text-3xl font-mono">SST</h1>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none cursor-pointer">
          <Avatar>
            <AvatarImage src={profilePicture} />
            <AvatarFallback>{userInitials}</AvatarFallback>
            <span className="sr-only">Toggle user menu</span>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="flex items-center">
            <User className="mr-2" />
            <span>{name}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Settings opacity={0.7} className="mr-2" />
            <span>Minha assinatura</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
