import { Calendar } from "@/components/ui/calendar"
import {
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar"

export function DatePicker() {
  return (
    <SidebarGroup className="px-0 text-white">
      <SidebarGroupContent>
        <Calendar className="[&_[role=gridcell].bg-accent]:bg-ItsDone 
        [&_[role=gridcell].bg-accent]:text-black [&_[role=gridcell]]:w-[33px]" />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
