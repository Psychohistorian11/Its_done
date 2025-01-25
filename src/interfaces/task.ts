import Category from "./category";

export default interface UserTask {
  id?: number;
  title: string;
  itsDone: boolean;
  description?: string;
  dueTime: Date;
  ItsDone: boolean;
  priority: string;
  createdAt: Date;
  category: Category;
}
