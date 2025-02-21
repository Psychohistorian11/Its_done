import UserTask from "./task";

export interface AppNotification {
  id: string;
  message: string;
  createdAt: Date;
  read: boolean;
  userId: string;
  taskId: string | null;
  task?: UserTask;
}
