import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAll, getMostView } from '../services/financeKnowledge';

const initialState = {
  articles: { loading: false, message: '' },
  mostView: { loading: false, message: '', data: [] },
};

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
    [getArticlesData.pending]: (state, action) => {
      state.articles.loading = true;
    },
    [getArticlesData.fulfilled]: (state, action) => {
      state.articles.loading = false;
      state.articles = { ...state.articles, ...action.payload };
    },
    [getArticlesData.rejected]: (state, action) => {
      state.articles.loading = false;
      state.articles.message = action.error.message;
    },

    [mostViewArticles.pending]: (state, action) => {
      state.loading = true;
    },
    [mostViewArticles.fulfilled]: (state, action) => {
      state.mostView.push(...action.payload);
      state.loading = false;
      state.message = '';
    },
    [mostViewArticles.rejected]: (state, action) => {
      state.message = action.error.message;
    },
  },
});

const { reducer } = financeKnowledgeSlice;
export default reducer;
