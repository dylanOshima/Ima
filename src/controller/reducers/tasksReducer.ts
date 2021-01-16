import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TaskType = {
  id: number;
  taskName: string;
  taskDescription: string;
  taskLinks: string[];
  subtasks: TaskType[];
  value: number;
  finished: boolean;
  dueDate?: Date;
  expectedTime?: number;
};

type TaskPayload = {
  taskName: string;
  taskDescription: string;
  taskLinks?: string[];
  subtasks?: TaskType[];
  value?: number;
  finished?: boolean;
  dueDate?: Date;
  expectedTime?: number;
};

type TasksState = TaskType[];

const initialState = [
  {
    id: 0,
    taskName: 'Finish figma mockups',
    taskDescription: 'A really sexy task',
    finished: false,
    taskLinks: [],
    subtasks: [],
    value: 0,
  },
  {
    id: 1,
    taskName: 'Create persistant storage',
    taskDescription: 'A really sexy task',
    finished: false,
    taskLinks: [],
    subtasks: [],
  },
  {
    id: 2,
    taskName: 'Turn these into react components',
    taskDescription: 'A really sexy task',
    finished: true,
    taskLinks: [],
    subtasks: [],
  },
] as TasksState;

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<TaskPayload>) {
      const {
        taskName,
        taskDescription,
        taskLinks = [],
        subtasks = [],
        value = 0,
        finished = false,
        dueDate,
        expectedTime,
      } = action.payload;

      state.push({
        id: state.length,
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
    toggleTask(state, action: PayloadAction<number>) {
      const task = state.find((t) => t.id === action.payload);
      if (task) {
        task.finished = !task.finished;
      }
    },
  },
});

export const { addTask, toggleTask } = tasksSlice.actions;

export default tasksSlice.reducer;
