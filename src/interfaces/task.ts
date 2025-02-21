import Category from "./category";

export default interface UserTask {
  id?: string;
  title: string;
  itsDone: boolean;
  description: string | null;
  dueTime: Date;
  priority: string;
  createdAt: Date;
  category?: Category;
}
