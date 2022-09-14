import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAll, getMostView } from '../services/financeKnowledge';

const initialState = { articles: [], mostView: [] };

export const retrieveData = createAsyncThunk(
  'financeKnowledge/getAll',
  async (params) => {
    const res = await getAll(params);
    return res.data;
  }
);

export const mostViewArticles = createAsyncThunk(
  'financeKnowledge/most-view',
  async () => {
    const res = await getMostView();
    return res.data;
  }
);

const financeKnowledgeSlice = createSlice({
  name: 'financeKnowledge',
  initialState,
  reducers: {},
  extraReducers: {
    [retrieveData.fulfilled]: (state, action) => {
      state.articles.push(action.payload);
    },
    [mostViewArticles.fulfilled]: (state, action) => {
      state.mostView.push(action.payload);
    },
  },
});

const { reducer } = financeKnowledgeSlice;
export default reducer;
