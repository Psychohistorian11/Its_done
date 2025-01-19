"use client"

import {useState, useEffect } from "react";
import {CategoryForm} from "./categories/category-form";

import { Calendars } from "@/components/calendars";
import { DatePicker } from "@/components/date-picker";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const [user, setUser] = useState({
    name: "It's Done  ",
    email: "m@example.com",
    image: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/data-user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
  
        const data = await response.json();
  
        setUser(data);
      } catch (error) {
        console.error("Error fetching user session:", error);
      }
    };
  
    fetchUser();
  }, []); 

  const data = {
    user,
    calendars: [
      {
        name: "My Categories",
        items: ["Personal", "Work", "Family"],
      }
    ],
  };

  return (
    <Sidebar {...props} >
      <SidebarHeader className="h-16  bg-primary">
        <NavUser user={data.user} />
      </SidebarHeader>

      
      <SidebarContent className="bg-primary">

        <DatePicker/> 

        <Calendars calendars={data.calendars} />
      </SidebarContent>


      <SidebarFooter className="bg-primary">
        <SidebarMenu>
          <SidebarMenuItem>
              <CategoryForm />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail/>
    </Sidebar>
  );
}
