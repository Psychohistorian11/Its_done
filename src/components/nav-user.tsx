"use client"

import { Bell, ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { handleSignOut } from "@/components/services/route";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  const [notificationsNumber, setNotificationsNumber] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const fetchNotificationsNumber = async () => {
      try {
        const response = await fetch(`/api/notification?count=${true}`);

        if (!response.ok) {
          console.error("Error fetching notifications");
          return;
        }

        const data = await response.json();
        setNotificationsNumber(data.count);
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };

    fetchNotificationsNumber();

    const socket = new WebSocket("wws://its-done-web-socket.onrender.com");

    socket.onopen = () => {
      console.log("✅ Conectado al WebSocket");
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "NOTIFICATION") {
        setNotificationsNumber((prev) => prev + 1);
      }
    };
    return () => socket.close();
  }, []);

  const handleShowNotification = () => {
    router.push(`/task/notification/${user.email}`);
  };

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
                  {notificationsNumber > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                      {notificationsNumber}
                    </span>
                  )}
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
                {/*<DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem> */}

                <DropdownMenuItem onClick={handleShowNotification}>
                  <Bell />
                  <div>Notifications</div>
                  {notificationsNumber > 0 && (
                    <span className="absolute -right-2 bg-red-500 text-white text-xs px-2 py-1 mr-1 rounded-l-sm">
                      {notificationsNumber}
                    </span>
                  )}
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
