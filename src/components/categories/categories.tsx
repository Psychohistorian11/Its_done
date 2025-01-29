import * as React from "react";
import { ChevronsUpDown, Eraser, Eye, List, Pencil } from "lucide-react";

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
import { EditCategory } from "./edit-category";
import { AlertDeleteCategory } from "../alert-delete-category";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";

interface CategorySidebarProps {
  isLoading: boolean;
  categories: Category[];
}

const Categories: React.FC<CategorySidebarProps> = ({
  isLoading,
  categories,
}) => {
  const [openCategory, setOpenCategory] = React.useState<number | null>(null);
  const router = useRouter();

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
          <span className="text-white mb-2 gap-2">
            <List />
            My Categories
          </span>
        </SidebarGroupLabel>

        <SidebarGroupContent>
          <SidebarMenu>
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <div className="flex items-center space-x-4 pb-1" key={index}>
                    <Skeleton className="h-10 w-10 rounded-full bg-foreground" />
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-[170px] bg-foreground" />
                      <Skeleton className="h-3 w-[140px] bg-foreground" />
                    </div>
                  </div>
                ))
              : categories &&
                categories.map((category, index) => (
                  <SidebarMenuItem key={index}>
                    <DropdownMenu
                      open={openCategory === index}
                      onOpenChange={(isOpen) =>
                        setOpenCategory(isOpen ? index : null)
                      }
                    >
                      <div
                        onClick={() =>
                          router.push(`/task/category/${category.id}`)
                        }
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
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(`/task/category/${category.id}`)
                            }
                          >
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
