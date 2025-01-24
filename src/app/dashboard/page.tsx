"use client";

import { useState } from "react";
import TaskEmptyState from "@/components/task-empty-state";
import UserTask from "@/interfaces/task";
import DashBoard from "@/components/dashboard";

export default function DashboardPage() {
  const [task, setTask] = useState<UserTask[]>([]);

  return <div>{task.length > 0 ? <DashBoard /> : <TaskEmptyState />}</div>;
}
