"use client";

import { useState } from "react";
import { TaskForm } from "./task-form";
import UserTask from "@/interfaces/task";

export function Task() {
  const [task, setTask] = useState<UserTask[]>([]);

  return (
    <div>
      {task!.length > 0 && (
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-5">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-xl bg-primary" />
            ))}
          </div>
        </div>
      )}

      {task!.length == 0 && (
        <div className="flex flex-col justify-center items-center h-screen pb-40">
          <img src="/images/fondo.png" className="w-[500px] h-[300  px]" />
          <p className="text-lg text-center mb-6 text-white truncate font-semibold">
            Start by adding your first task and organizing your day.
          </p>
          <TaskForm />
        </div>
      )}
    </div>
  );
}
