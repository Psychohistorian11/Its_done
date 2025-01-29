"use client";

import { useEffect, useState } from "react";
import TaskEmptyState from "@/components/tasks/task-empty-state";
import UserTask from "@/interfaces/task";
import { TaskList } from "@/components/tasks/task-list";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const [task, setTask] = useState<UserTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setTask(data);
      } catch (error) {
        console.error("Error fetching user session:", error);
      }
      setIsLoading(false);
    };

    fetchTasks();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-5">
            {Array.from({ length: 20 }).map((_, index) => (
              <div className="flex items-center space-x-4" key={index}>
                <Skeleton
                  key={index}
                  className="w-[312px] h-[312px] aspect-square rounded-xl bg-primary"
                />
              </div>
            ))}
          </div>
        </div>
      ) : task.length > 0 ? (
        <TaskList task={task} setTask={setTask} />
      ) : (
        <TaskEmptyState />
      )}
    </div>
  );
}
