"use client";

import { User } from "better-auth";
import React from "react";
import UserAvatar from "./UserAvatart";
import { Skeleton } from "./ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, UserCircle } from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";

const UserAccount = ({
  user,
  isAdmin
}: {
  user: User | undefined;
  isAdmin?: boolean;
}) => {
  const router = useRouter();

  if (!user) {
    return <Skeleton className="h-10" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-full p-2 rounded-sm flex hover:bg-muted-foreground/5 cursor-pointer select-none border">
          <UserAvatar user={user} />
          <div className="flex flex-col ml-2 w-full">
            <div className="text-sm flex w-full justify-between">
              <p className="truncate">{user.name}</p>
              {isAdmin && <Badge variant={"secondary"}>Admin</Badge>}
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        align="end"
        side={"bottom"}
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <div className="grid flex-1 text-left text-sm leading-tight">
              <div className="font-medium w-full flex justify-between">
                <span className="truncate">{user.name}</span>
                {isAdmin && <Badge variant={"secondary"}>Admin</Badge>}
              </div>
              <span className="text-muted-foreground truncate text-xs">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserCircle />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push("/");
                }
              }
            });
          }}
        >
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccount;
