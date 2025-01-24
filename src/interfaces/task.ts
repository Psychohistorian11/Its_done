export default interface UserTask {
  id?: number;
  title: string;
  description?: string;
  dueTime: Date;
  ItsDone: boolean;
  priority: string;
}
