import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TaskType } from '../types/Tasks';

export type TaskPayload = {
  taskName: string;
  taskDescription: string;
  finished: boolean;
  taskLinks: string | null;
  subtasks: string[] | null;
  value: string | null;
  dueDate: Date | null;
  expectedTime: number | null;
};

export type TasksStateType = TaskType[];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [] as TasksStateType,
  reducers: {
    addTask(state, action: PayloadAction<TaskPayload>) {
      const {
        taskName,
        taskDescription,
        taskLinks: taskLinksRaw,
        subtasks: subtasksRaw,
        value: valueRaw,
        finished,
        dueDate,
        expectedTime,
      } = action.payload;
      // Parse value
      const value = valueRaw != null ? parseInt(valueRaw, 10) : 0;
      // parse taskLinks
      const taskLinks = taskLinksRaw?.split(', ') ?? [];
      // parse subtasks
      const subtasks =
        subtasksRaw == null || subtasksRaw.length === 0 ? [] : subtasksRaw;
      state.push({
        id: uuidv4(),
        taskName,
        taskDescription,
        taskLinks,
        subtasks,
        finished,
        expectedTime,
        dueDate,
        value,
      });
    },
    editTask(state, action: PayloadAction<TaskType>) {
      const updatedTask = action.payload;
      return state.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
    },
    deleteTask(state, action: PayloadAction<TaskType['id']>) {
      return state.filter((task) => task.id !== action.payload);
    },
    toggleTask(state, action: PayloadAction<TaskType['id']>) {
      const task = state.find((t) => t.id === action.payload);
      if (task) {
        task.finished = !task.finished;
      }
    },
  },
});

export const { addTask, editTask, toggleTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
