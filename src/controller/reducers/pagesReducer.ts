import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PageTypes = 'tasks' | 'new_task' | 'account';

interface CurrentPageState {
  page: PageTypes;
  accountId: number | null;
}

interface CurrentPagePayload {
  page: PageTypes;
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
      const { page, accountId = null } = action.payload;
      state.page = page;
      if (accountId != null) state.accountId = accountId;
    },
  },
});

export const { setCurrentPage } = currentPageSlice.actions;

export default currentPageSlice.reducer;
