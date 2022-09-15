import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAll, getMostView } from '../services/financeKnowledge';

const initialState = { articles: [], mostView: [] };

export const getArticlesData = createAsyncThunk(
  'financeKnowledge/getArticles',
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
    [getArticlesData.fulfilled]: (state, action) => {
      state.articles.push(...action.payload);
    },
    [mostViewArticles.pending]: (state, action) => {
      console.log('pending');
    },
    [mostViewArticles.fulfilled]: (state, action) => {
      console.log('success');
      state.mostView.push(...action.payload);
    },
    [mostViewArticles.rejected]: (state, action) => {
      console.log('error');
    },
  },
});

const { reducer } = financeKnowledgeSlice;
export default reducer;
