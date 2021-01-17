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

export type TaskPayload = {
  taskName: string;
  taskDescription: string;
  taskLinks?: string;
  subtasks?: [];
  value?: string;
  finished?: boolean;
  dueDate?: Date;
  expectedTime?: number;
};

export const TASK_PAYLOAD = {
  taskName: '',
  taskDescription: '',
  taskLinks: '',
  value: '10',
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
        taskLinks: taskLinksRaw = '',
        subtasks = [],
        value: valueRaw = '0',
        finished = false,
        dueDate,
        expectedTime,
      } = action.payload;

      // Parse value
      const value = parseInt(valueRaw, 10);

      // parse taskLinks
      const taskLinks = taskLinksRaw.split(', ');

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
      // saveIt
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
