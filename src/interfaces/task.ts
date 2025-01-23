export default interface UserTasks {
  id?: number;
  title: string;
  description?: string;
  dueTime: Date;
  ItsDone: boolean;
  priority: string;
}
