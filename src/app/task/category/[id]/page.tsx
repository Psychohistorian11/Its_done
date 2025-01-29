"use client";

import TaskEmptyState from "@/components/tasks/task-empty-state";
import { TaskList } from "@/components/tasks/task-list";
import TaskSkeleton from "@/components/tasks/task-skeleton";
import UserTask from "@/interfaces/task";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function TaskbyCategoryPage() {
  const [tasks, setTasks] = useState<UserTask[]>([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      const fetchCategoryTasks = async () => {
        try {
          const response = await fetch(`/api/task?categoryId=${id}`);
          const data = await response.json();
          setTasks(data);
        } catch (error) {
          console.error("Error fetching user session:", error);
        }
        setIsLoading(false);
      };

      fetchCategoryTasks();
    }
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <TaskSkeleton />
      ) : tasks.length > 0 ? (
        <TaskList task={tasks} setTask={setTasks} />
      ) : (
        <TaskEmptyState />
      )}
    </div>
  );
}
