import { TaskForm } from "@/components/tasks/task-form";

export default function TaskFormPage() {
  return (
    <div>
      <div className="text-white p-5 border-b-2">
        <div className="font-semibold leading-none tracking-tight">
          Task form
        </div>
        <div className="text-sm text-muted-foreground text-start pt-2">
          Organize your ideas and make it happen! Create purposeful tasks, set
          priorities, and move closer to your goals. Every success starts with a
          good plan. Start now!
        </div>
      </div>
      <div className="flex justify-center items-center h-screen">
        <TaskForm />
      </div>
    </div>
  );
}
