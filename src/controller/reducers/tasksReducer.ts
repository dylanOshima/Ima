import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TaskType = {
  id: number;
  taskName: string;
  taskDescription: string;
  taskLinks: string[];
  subtasks: string[];
  value: number;
  finished: boolean;
  dueDate: Date | null;
  expectedTime: number | null;
};

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

export const initialState = [
  {
    id: 0,
    taskName: 'Finish figma mockups',
    taskDescription: 'A really sexy task',
    finished: false,
    taskLinks: [],
    subtasks: [],
    value: 0,
    expectedTime: null,
    dueDate: null,
  },
  {
    id: 1,
    taskName: 'Create persistant storage',
    taskDescription: 'A really sexy task',
    finished: false,
    taskLinks: [],
    subtasks: [],
    value: 0,
    expectedTime: null,
    dueDate: null,
  },
  {
    id: 2,
    taskName: 'Turn these into react components',
    taskDescription: 'A really sexy task',
    finished: true,
    taskLinks: [],
    subtasks: [],
    value: 0,
    expectedTime: null,
    dueDate: null,
  },
] as TasksStateType;

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
      const subtasks = subtasksRaw ?? [];

      const newTask = {
        id: state.length,
        taskName,
        taskDescription,
        taskLinks,
        subtasks,
        finished,
        expectedTime,
        dueDate,
        value,
      };
      state.push(newTask);
      // updateLocalStorage
    },
    editTask(state, action: PayloadAction<TaskType>) {
      const task = action.payload;
      state[task.id] = task;
      // updateLocalStorage
    },
    toggleTask(state, action: PayloadAction<number>) {
      const task = state.find((t) => t.id === action.payload);
      if (task) {
        task.finished = !task.finished;
      }
      // updateLocalStorage
    },
  },
});

export const { addTask, editTask, toggleTask } = tasksSlice.actions;

export default tasksSlice.reducer;
