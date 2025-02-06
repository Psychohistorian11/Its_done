import { Calendar } from "@/components/ui/calendar";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import UserTask from "@/interfaces/task";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export function DatePicker() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [pendingTasks, setPendingTasks] = useState<UserTask[]>([]);
  const [pendingDates, setPendingDates] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const filterPendingTasks = (tasks: UserTask[]): UserTask[] => {
    return tasks.filter((task) => !task.itsDone);
  };

  const extractDates = (tasks: UserTask[]): Date[] => {
    return tasks.map((task) => new Date(task.createdAt));
  };

  const handleDateChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      router.push(`/task/date/${selectedDate.toISOString()}`);
    }
    setDate(selectedDate);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/task", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data: UserTask[] = await response.json();

        const filteredTasks = filterPendingTasks(data);
        setPendingTasks(filteredTasks);

        const dates = extractDates(filteredTasks);
        setPendingDates(dates);
      } catch (error) {
        console.error("Error fetching user session:", error);
      }
      setIsLoading(false);
    };

    fetchTasks();
  }, []);

  return (
    <SidebarGroup className="px-0 text-white">
      <SidebarGroupContent>
        {isLoading ? (
          <div className="flex items-center space-x-4">
            <Skeleton className="w-[232px] ml-2 h-[300px] aspect-square rounded-xl  bg-foreground" />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              className="rounded-none bg-primary shadow-lg text-white"
              classNames={{
                day: "h-10 w-8 text-sm flex items-center justify-center rounded-md hover:bg-gray-700",
                day_selected:
                  "bg-indigo-500 text-white font-bold rounded-md hover:bg-indigo-600",
                day_today: "bg-green-500 text-white rounded-md",
                day_outside: "text-gray-500 cursor-not-allowed",
              }}
              modifiers={{
                pending: pendingDates,
              }}
              modifiersClassNames={{
                pending:
                  "bg-orange-400 text-white font-semibold rounded-md hover:bg-orange-400",
              }}
            />
            {date && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-300">
                  selected date:{" "}
                  <span className="font-bold text-white">
                    {date.toLocaleDateString()}
                  </span>
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  pending tasks:{" "}
                  <span className="font-semibold text-orange-400">
                    {
                      pendingTasks.filter(
                        (task) =>
                          new Date(task.createdAt).toDateString() ===
                          date.toDateString()
                      ).length
                    }
                  </span>
                </p>
              </div>
            )}
          </div>
        )}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
