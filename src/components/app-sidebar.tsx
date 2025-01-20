"use client"

import {useState, useEffect } from "react";
import {CategoryForm} from "./categories/category-form";

import  Categories  from "@/components/categories";
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
import Category from "@/interfaces/category";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const [user, setUser] = useState({
    name: "It's Done  ",
    email: "m@example.com",
    image: "",
  });

  const [categories, setCategories] = useState<Category[]>([{
    name: "It's Done",
    color: "#00BFB3",
    icon: "futbol"
  }])

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

    const fetchCategory = async () => {
      try{
        const response = await fetch("api/auth/category", {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          },
        })

        if(!response.ok){
          throw new Error("Failed to fetch category data");
        }

        const data = await response.json()
        setCategories(data)
      } catch(error){
        console.error("Error fetching category", error)
      }
    }
  
    fetchUser();
  }, []); 

  const data = {
    user,
    categories
  };

  return (
    <Sidebar {...props} >
      <SidebarHeader className="h-16  bg-primary">
        <NavUser user={data.user} />
      </SidebarHeader>

      
      <SidebarContent className="bg-primary">

        <DatePicker/> 

        <Categories categories={data.categories} />
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
