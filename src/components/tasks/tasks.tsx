"use client";

import { useState } from "react";
import undraw_designer from "../../../public/images/undraw_designer-girl_jtyy.svg";

export function Task() {
  const [task, setTask] = useState();
  const [areThereTask, setAreThereTask] = useState(false);

  return (
    <div>
      {areThereTask && (
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-5">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-xl bg-primary" />
            ))}
          </div>
        </div>
      )}

      {!areThereTask && (
        <div className="flex flex-col justify-center items-center h-screen">
          <img src="/images/createTask.png" className="size-80" />
          <span className="text-white mt-4">there is not tasks</span>
        </div>
      )}
    </div>
  );
}
