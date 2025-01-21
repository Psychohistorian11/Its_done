import * as React from "react";
import {  Bell, ChevronsUpDown, Eraser, Eye, LogOut, Pencil, SlidersHorizontal } from "lucide-react";

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
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Category from "@/interfaces/category";
import { EditCategory } from "./categories/edit-category";
import { AlertDeleteCategory } from "./alert-delete-category";

interface CategorySidebarProps {
  categories: Category[];
}

const Categories: React.FC<CategorySidebarProps> = ({ categories }) => {
  const [openCategory, setOpenCategory] = React.useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenCategory((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <SidebarGroup className="py-0">
        <SidebarGroupLabel
          asChild
          className="group/label w-full text-sm text-sidebar-foreground"
        >
          <span className="text-white mb-2">My Categories</span>
        </SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu>
            {categories.map((category, index) => (
              <SidebarMenuItem key={index}>
                <DropdownMenu
                  open={openCategory === index}
                  onOpenChange={(isOpen) =>
                    setOpenCategory(isOpen ? index : null)
                  }
                >
                  <div
                    className="flex items-center gap-2 text-white mt-1 bg-foreground p-1 w-full
                 hover:bg-white hover:text-black rounded-lg"
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
                    <span
                      className="text-sm flex-1"
                      onClick={() =>
                        console.log(`Navigating to ${category.name}`)
                      }
                    >
                      {category.name}
                    </span>

                    <DropdownMenuTrigger asChild>
                      <button
                        className="ml-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(index);
                        }}
                      >
                        <ChevronsUpDown className="size-4" />
                      </button>
                    </DropdownMenuTrigger>
                  </div>{" "}
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                    align="start"
                    sideOffset={4}
                  >
                    <DropdownMenuLabel className="p-0 font-normal">
                      <div className="flex items-center gap-2 px-1 py-2 text-left text-sm">
                        <div
                          className="flex items-center justify-center h-8 w-8 rounded-lg"
                          style={{
                            backgroundColor: category.color,
                          }}
                        >
                          <span className="text-white text-lg">
                            {category.icon}
                          </span>
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-semibold overflow-hidden whitespace-nowrap">
                            {category.name}
                          </span>
                          <span className="truncate text-xs text-gray-500 overflow-hidden whitespace-nowrap">
                            Category Info
                          </span>
                        </div>
                      </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />
                    <DropdownMenuGroup className="items-start">
                      <DropdownMenuItem>
                        <span className="flex items-center gap-4">
                          <Eye className="ml-auto size-4 text-black" />
                          See
                        </span>
                      </DropdownMenuItem>
                      <span className="flex items-center ">
                        <Pencil className="ml-2 size-4 text-black" />
                        <EditCategory category={category} />
                      </span>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />

                    <span className="flex items-center">
                      <Eraser className="ml-2 size-4 text-black" />
                      <AlertDeleteCategory category={category} />
                    </span>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
};

export default Categories;
