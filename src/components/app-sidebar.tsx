"use client"

import {useState, useEffect } from "react";
import {CategoryForm} from "./categories/category-form";

import Categories from "@/components/categories/categories";
import { DatePicker } from "@/components/date-picker";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Category from "@/interfaces/category";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const [user, setUser] = useState();

  const [categories, setCategories] = useState<Category[]>();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
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
      setIsLoading(false);
    };

    const fetchCategory = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/category", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Error fetching category");
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching category", error);
      }
      setIsLoading(false);
    };

    fetchUser();
    fetchCategory();
  }, []);

  const data = {
    user,
    categories,
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16  bg-primary">
        <NavUser isLoading={isLoading} user={data.user!} />
      </SidebarHeader>

      <SidebarContent className="bg-primary">
        <DatePicker />
        <SidebarSeparator className="mx-0" />
        <Categories isLoading={isLoading} categories={data.categories!} />
      </SidebarContent>

      <SidebarFooter className="bg-primary">
        <SidebarMenu>
          <SidebarMenuItem>
            <CategoryForm />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
