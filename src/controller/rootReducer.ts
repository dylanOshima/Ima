import { combineReducers, Reducer } from '@reduxjs/toolkit';
import pagesReducer from './reducers/pagesReducer';
import tasksReducer from './reducers/tasksReducer';

const rootReducer: Reducer = combineReducers({
  taskState: tasksReducer,
  pageState: pagesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
