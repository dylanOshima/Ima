import { configureStore } from '@reduxjs/toolkit';
import { ipcRenderer } from 'electron';
import rootReducer from './rootReducer';

function fetchInitialState() {
  const state = {
    pageState: { page: 'tasks' },
    taskState: [],
  };
  const savedTasksState = ipcRenderer.sendSync('fetch-storage');
  if (savedTasksState != null) state.taskState = savedTasksState;
  return state;
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState: fetchInitialState(),
});

// TODO: Throttle this shit
store.subscribe(
  (() => {
    let prevTaskState = store.getState().taskState;
    return () => {
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
