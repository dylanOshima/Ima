import { configureStore } from '@reduxjs/toolkit';
import { ipcRenderer } from 'electron';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    pageState: { page: 'tasks' },
    taskState: [],
  },
});

// TODO: Throttle this shit
store.subscribe(
  (() => {
    let prevTaskState = store.getState().taskState;
    return async () => {
      const newTaskState = store.getState().taskState;
      if (prevTaskState !== newTaskState) {
        prevTaskState = newTaskState;
        ipcRenderer.send('write-storage', store.getState().taskState);
      }
    };
  })()
);

export type AppDispatch = typeof store.dispatch;

export default store;
