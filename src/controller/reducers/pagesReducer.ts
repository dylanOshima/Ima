import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PageTypes = 'tasks' | 'new_task' | 'edit_task' | 'account';

interface CurrentPageState {
  page: PageTypes;
  currentTask: string | null;
  accountId: number | null;
}

interface CurrentPagePayload {
  page: PageTypes;
  currentTask?: string;
  accountId?: number;
}

const initialState = {
  page: 'tasks',
} as CurrentPageState;

const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<CurrentPagePayload>) {
      const { page, currentTask = null, accountId = null } = action.payload;
      if (page === 'account' && accountId != null) {
        state.accountId = accountId;
        state.page = page;
      } else if (page === 'edit_task' && currentTask != null) {
        state.currentTask = currentTask;
        state.page = page;
      }
      state.page = page;
    },
  },
});

export const { setCurrentPage } = currentPageSlice.actions;

export default currentPageSlice.reducer;
