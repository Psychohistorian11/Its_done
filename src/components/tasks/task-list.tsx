"use client";

import UserTask from "@/interfaces/task";

interface TaskProps {
  task: UserTask[];
  setTask: (value: UserTask[]) => void;
}

export function TaskList({ task, setTask }: TaskProps) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {task.map((t, i) => (
          <div
            key={i}
            className="relative aspect-square rounded-xl p-6 text-white shadow-md"
            style={{ backgroundColor: t.category?.color || "#64748b" }} // Default color if category color is missing
          >
            <div className="flex gap-2">
              <span
                className="bg-foreground p-2 rounded-lg"
                style={{
                  fontSize: "2rem",
                }}
              >
                {t.category.icon}
              </span>
              <h2 className="text-lg font-bold truncate">{t.title}</h2>
            </div>

            {/* Description */}
            {t.description && (
              <p className="mt-2 text-sm text-gray-200 line-clamp-2">
                {t.description}
              </p>
            )}

            {/* Metadata */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-sm">
                <p>
                  <span className="font-semibold">Due:</span>{" "}
                  {new Date(t.dueTime).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Priority:</span> {t.priority}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {t.itsDone ? "Done" : "Pending"}
                </p>
              </div>

              {/* Created At */}
              <p className="mt-2 text-xs text-gray-300">
                Created: {new Date(t.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
