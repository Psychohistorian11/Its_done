"use client";

import UserTask from "@/interfaces/task";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface TaskProps {
  task: UserTask[];
  setTask: (value: UserTask[]) => void;
}

export function TaskList({ task, setTask }: TaskProps) {
  const router = useRouter();
  const totalBlocks = 24;
  const emptyBlocks = totalBlocks - task.length;

  const handleAddTask = () => {
    router.push("/task/task-form");
  };

  const handleItsDone = async (selectedTask: UserTask) => {
    try {
      const response = await fetch(`/api/task`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itsDone: true, id: selectedTask.id }),
      });

      if (!response.ok) {
        throw new Error("Error updating task status");
      }

      const updatedTasks = task.map((t) =>
        t.id === selectedTask.id ? { ...t, itsDone: true } : t
      );
      setTask(updatedTasks);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {/* Bloques con tareas */}
        {task.map((t, i) => (
          <div
            key={`task-${i}`}
            className="relative aspect-square rounded-xl p-6 text-white shadow-md"
            style={{ backgroundColor: t.category?.color || "#64748b" }}
          >
            <div className="flex gap-2">
              <span
                className="bg-foreground pl-4 w-16 rounded-lg"
                style={{
                  fontSize: "2rem",
                }}
              >
                {t.category?.icon}
              </span>
              <h2 className="text-lg font-bold truncate">{t.title}</h2>
            </div>

            {/* Descripción */}
            {t.description && (
              <div>
                <span className="font-semibold">Description</span>
                <p className="rounded-lg mt-2 text-sm text-gray-200">
                  {t.description}
                </p>
              </div>
            )}

            {/* Metadatos */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between">
              <div className="text-sm">
                <p>
                  <span className="font-semibold">Due:</span>{" "}
                  {new Date(t.dueTime).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Priority:</span> {t.priority}
                </p>

                {/* Fecha de creación */}
                <p className="mt-2 text-xs text-gray-300">
                  Created: {new Date(t.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="absolute right-0 bottom-0">
                <Button
                  onClick={() => !t.itsDone && handleItsDone(t)}
                  disabled={t.itsDone}
                  className={
                    t.itsDone ? "bg-ItsDone cursor-not-allowed text-black" : ""
                  }
                >
                  {t.itsDone ? "It's Done" : "Pending"}
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Bloque para agregar nueva tarea */}
        <div className="flex flex-col justify-center aspect-square rounded-xl bg-primary h-full gap-1">
          <div className="text-sm text-muted-foreground text-white p-4 items-center flex justify-center">
            Do you have any ideas? Let's create them
          </div>
          <div className="flex justify-center items-center">
            <Button
              onClick={handleAddTask}
              className="px-8 py-3 bg-ItsDone text-black rounded-md shadow-md hover:bg-foreground hover:text-white"
            >
              Add Task
            </Button>
          </div>
        </div>

        {/* Bloques vacíos */}
        {Array.from({ length: emptyBlocks }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="aspect-square rounded-xl bg-primary"
          />
        ))}
      </div>
    </div>
  );
}
