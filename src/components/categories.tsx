import * as React from "react"
import { Check, ChevronRight } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Category from "@/interfaces/category"

interface CategorySidebar{
  categories: Category[]
}

const Categories:React.FC<CategorySidebar> = ({categories}) => {
  return (
    <>
    
        <React.Fragment key={"My Categories"}>
          <SidebarGroup key={"My Categories"} className="py-0">
            <Collapsible
              className="group/collapsible"
            >
              <SidebarGroupLabel
                asChild
                className="group/label w-full text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger className="text-white">
                  {"My Categories"}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90 text-white" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>  
              
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {categories.map((item, index) => (
                      <SidebarMenuItem key={index}>
                        <SidebarMenuButton className="text-white">
                      
                          {item.name}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        </React.Fragment>
 
    </>
  )
}

export default Categories
