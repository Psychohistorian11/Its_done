import Category from "./category";

export default interface UserTask {
  id?: number;
  title: string;
  itsDone: boolean;
  description?: string;
  dueTime: Date;
  priority: string;
  createdAt: Date;
  category: Category;
}
