import { Calendar } from "@/components/ui/calendar";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import React from "react";

export function DatePicker() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <SidebarGroup className="px-0 text-white">
      <SidebarGroupContent>
        <Calendar
          className="[&_[role=gridcell].bg-accent]:bg-ItsDone 
        [&_[role=gridcell].bg-accent]:text-black [&_[role=gridcell]]:w-[33px]"
          mode="single"
          selected={date}
          onSelect={setDate}
          classNames={{
            day_selected: "bg-ItsDone text-black",
            day_today: "bg-white text-black",
          }}
        />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
