"use client";

import { LogoutButton } from "@/features/auth/ui/logout-button";
import { routes } from "@/shared/constants/routes";
import { useCurrentUser } from "@/shared/lib/auth-js/use-current-user";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { User } from "lucide-react";
import Link from "next/link";

export const SidebarUser = () => {
  const user = useCurrentUser(); //TODO loading

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex flex-row flex-wrap items-center justify-center gap-3 ">
          <Avatar>
            <AvatarFallback className="bg-green-100">
              <User className="h-5 w-5 text-black " />
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom">
        <DropdownMenuItem asChild>
          <Link
            href={user?.id ? routes.employeeUserId(user.id) : routes.profile()}
          >
            Профиль
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogoutButton>
          <DropdownMenuItem>Выйти</DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
