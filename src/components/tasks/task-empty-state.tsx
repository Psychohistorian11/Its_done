"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";

export default function TaskEmptyState() {
  const router = useRouter();

  const handleAddTask = () => {
    router.push("/task/task-form");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen pb-40">
      <Image
        width={500}
        height={300}
        alt="task-empty"
        src="/images/fondo.png"
        className="w-[500px] h-[300px]"
      />
      <p className="text-lg text-center mb-6 text-white truncate font-semibold">
        Start by adding your task and organizing your day.
      </p>
      <Button
        onClick={handleAddTask}
        className="px-6 py-3 bg-primary text-white rounded-md shadow-md hover:bg-primary-dark"
      >
        Add Task
      </Button>
    </div>
  );
}
