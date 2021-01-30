export type TaskType = {
  id: string;
  taskName: string;
  taskDescription: string;
  taskLinks: string[];
  subtasks: string[];
  value: number;
  finished: boolean;
  dueDate: Date | null;
  expectedTime: number | null;
};
