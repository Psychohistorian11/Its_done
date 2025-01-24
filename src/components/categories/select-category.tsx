import { useEffect, useState } from "react";
import Category from "@/interfaces/category";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "../ui/sidebar";
import { List, Plus, Check } from "lucide-react";
import { DropdownMenu } from "../ui/dropdown-menu";
import { CategoryForm } from "./category-form";

interface CategoryProps {
  setCategory: (value: Category) => void;
}

export function SelectCategory({ setCategory }: CategoryProps) {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 0,
      name: "It's Done",
      color: "#00BFB3",
      icon: "⚽",
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  useEffect(() => {
    const fetchCategory = async () => {
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
        console.log("data: ", data);
      } catch (error) {
        console.error("Error fetching category", error);
      }
    };

    fetchCategory();
  }, []);

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setCategory(category);
  };

  return (
    <SidebarGroup className="py-0">
      <SidebarGroupLabel
        asChild
        className="group/label w-full text-sm text-sidebar-foreground"
      >
        <span className="text-white mb-2 gap-2">
          <List />
          My Categories
        </span>
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {categories ? (
            categories.map((category) => (
              <SidebarMenuItem key={category.id}>
                <DropdownMenu>
                  <div
                    className={`flex items-center gap-2 text-white mt-1 p-1 w-full rounded-lg ${
                      selectedCategory?.id === category.id
                        ? "bg-primary" // Apply bg-primary if selected
                        : "hover:bg-primary"
                    }`}
                    onClick={() => handleSelectCategory(category)} // Handle selection on click
                  >
                    {category.icon && (
                      <span
                        className="p-1.5 rounded-md"
                        style={{
                          backgroundColor: category.color,
                          fontSize: "1.2rem",
                        }}
                      >
                        {category.icon}
                      </span>
                    )}

                    <span className="text-sm">{category.name}</span>

                    <span className="flex ml-auto">
                      {selectedCategory?.id === category.id ? (
                        <Check className="text-ItsDone" />
                      ) : (
                        <Plus />
                      )}
                    </span>
                  </div>
                </DropdownMenu>
              </SidebarMenuItem>
            ))
          ) : (
            <CategoryForm />
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
