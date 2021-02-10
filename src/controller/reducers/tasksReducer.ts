import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ipcRenderer } from 'electron';
import { v4 as uuidv4 } from 'uuid';
import { ADD_TASK_REQUEST } from '../../util/constants';
import { TaskType } from '../../entities/Task';

export type TaskPayload = {
  taskName: string;
  taskDescription: string;
  tags: string[];
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
  (payload: TaskType[]) => {
    return { payload };
  }
);

export type UpdateTaskPayloadType = {
  updatedTask: TaskType;
  key?: string;
};
export const updateTaskAction = createAction<UpdateTaskPayloadType>(
  'tasks/updateTask'
);

export const addTaskAction = createAction(
  'tasks/addTask',
  ({
    taskLinks: taskLinksRaw,
    subtasks: subtasksRaw,
    value: valueRaw,
    tags: tagsRaw,
    finished = false,
    ...otherProps
  }: TaskPayload) => {
    // Parse value
    const value =
      valueRaw != null && !!valueRaw.length ? parseInt(valueRaw, 10) : 0;
    // parse taskLinks
    const taskLinks = taskLinksRaw?.split(', ') ?? [];
    // parse taskLinks
    const tags = tagsRaw ?? [];
    // parse subtasks
    const subtasks =
      subtasksRaw == null || subtasksRaw.length === 0 ? [] : subtasksRaw;
    // temp id
    const key = uuidv4();
    const payload: TaskType = {
      ...otherProps,
      id: key,
      value,
      taskLinks,
      subtasks,
      finished,
      tags,
    };
    ipcRenderer.send(ADD_TASK_REQUEST, payload);
    return { payload };
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
    builder.addCase(addTaskAction, (state, action: PayloadAction<TaskType>) => {
      state.push(action.payload);
    });
    builder.addCase(updateTaskAction, (state, action) => {
      const { updatedTask, key = updatedTask.id } = action.payload;
      const newState: TasksStateType = state.map((task) =>
        task.id === key ? updatedTask : task
      );
      return newState;
    });
    builder.addDefaultCase(() => {
      // console.log(`Don't know how to handle action of type ${action.type}`);
    });
  },
  reducers: {
    editTask(state, action: PayloadAction<TaskType>) {
      const updatedTask = action.payload;
      return (state.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      ) as unknown) as TasksStateType;
    },
    deleteTask(state, action: PayloadAction<TaskType['id']>) {
      return state.filter((task) => task.id !== action.payload);
    },
  },
});

export const { editTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
