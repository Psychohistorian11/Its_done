"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  LogOut,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { handleSignOut } from "@/app/api/auth/services/route"
import { Skeleton } from "./ui/skeleton";

interface Tasks {
  isLoading: boolean;
  user: {
    name: string;
    email: string;
    image: string;
  };
}

export function NavUser({ isLoading, user }: Tasks) {
  const handleLogOut = async () => {
    await handleSignOut();
  };
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          {isLoading ? (
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full bg-foreground" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-[170px] bg-foreground" />
                <Skeleton className="h-3 w-[140px] bg-foreground" />
              </div>
            </div>
          ) : (
            user && (
              <DropdownMenuTrigger asChild className="bg-foreground">
                <SidebarMenuButton size="lg" className="hover:bg-foreground">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback className="rounded-lg">ID</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight text-white">
                    <span className="truncate font-semibold ">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 text-white" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
            )
          )}
          {user && (
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="start"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Bell />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="hover:cursor-pointer"
                onClick={handleLogOut}
              >
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
