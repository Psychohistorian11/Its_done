"use client";

import TaskEmptyState from "@/components/tasks/task-empty-state";
import { TaskList } from "@/components/tasks/task-list";
import TaskSkeleton from "@/components/tasks/task-skeleton";
import UserTask from "@/interfaces/task";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TaskbyDatePage() {
  const [task, setTask] = useState<UserTask[]>([]);
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/task?date=${id}`);

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
  }, [id]);

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
