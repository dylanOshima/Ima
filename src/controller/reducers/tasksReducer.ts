import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TaskType } from '../../entities/Task';

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

export const handleCurrentTasks = createAction(
  'tasks/handleCurrentTasks',
  (tasks: TasksStateType) => {
    return { payload: tasks };
  }
);

// Tasks Reducer
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [] as TasksStateType,
  extraReducers: (builder) => {
    builder.addCase(handleCurrentTasks, (state, action) => {
      state.push(...action.payload);
    });
    builder.addDefaultCase((_, action) => {
      // console.log(`Don't know how to handle action of type ${action.type}`);
    });
  },
  reducers: {
    addTask: {
      reducer: (state, action: PayloadAction<TaskType>) => {
        state.push(action.payload);
      },
      prepare({
        taskLinks: taskLinksRaw,
        subtasks: subtasksRaw,
        value: valueRaw,
        finished = false,
        ...task
      }: TaskPayload) {
        // Parse value
        const value = valueRaw != null ? parseInt(valueRaw, 10) : 0;

        // parse taskLinks
        const taskLinks = taskLinksRaw?.split(', ') ?? [];

        // parse subtasks
        const subtasks =
          subtasksRaw == null || subtasksRaw.length === 0 ? [] : subtasksRaw;

        return {
          payload: {
            ...task,
            id: uuidv4(),
            value,
            taskLinks,
            subtasks,
            finished,
          } as TaskType,
        };
      },
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
