"use client";

import { useEffect, useState } from "react";
import TaskEmptyState from "@/components/tasks/task-empty-state";
import UserTask from "@/interfaces/task";
import { TaskList } from "@/components/tasks/task-list";
import TaskSkeleton from "@/components/tasks/task-skeleton";

export default function TaskPage() {
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

    const verifyUser = async () => {
      const response = await fetch("/api/auth/services-signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to verify user");
      }
    };

    fetchTasks();
    verifyUser();
  }, []);

  return (
    <div>
      {isLoading ? (
        <TaskSkeleton />
      ) : task.length > 0 ? (
        <TaskList task={task} setTask={setTask} />
      ) : (
        <TaskEmptyState />
      )}
    </div>
  );
}
