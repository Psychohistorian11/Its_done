import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function DashBoard() {
  return (
    <SidebarProvider >

      <AppSidebar/>
      
      <SidebarInset className="bg-foreground">
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2  px-4">
          <SidebarTrigger className="-ml-1 text-white" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          
          <Breadcrumb >
            <BreadcrumbList >
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">October 2024</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-5">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-xl bg-primary" />
            ))}
          </div>
        </div>
        
      </SidebarInset>
    </SidebarProvider>
  )
}
