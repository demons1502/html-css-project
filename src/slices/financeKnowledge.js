import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAll, getMostView } from '../services/financeKnowledge';

const initialState = {
  articlesData: { loading: false },
  mostViewData: [],
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
      state.articlesData.loading = true
    },
    [getArticlesData.fulfilled]: (state, action) => {
      state.articlesData.loading = false
      state.articlesData = { ...state.articlesData, ...action.payload };
    },

    [mostViewArticles.fulfilled]: (state, action) => {
      state.mostViewData.push(...action.payload);
    }
  },
});

const { reducer } = financeKnowledgeSlice;
export default reducer;
