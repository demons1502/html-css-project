import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAll, getMostView, view } from '../services/financeKnowledge';

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
export const getView = createAsyncThunk('financeKnowledge/view', async (id) => {
  const res = await view(id);
  return res.data;
});

const financeKnowledgeSlice = createSlice({
  name: 'financeKnowledge',
  initialState,
  reducers: {},
  extraReducers: {
    [getArticlesData.pending]: (state, action) => {
      state.articlesData.loading = true;
    },
    [getArticlesData.fulfilled]: (state, action) => {
      state.articlesData.loading = false;
      state.articlesData = { ...state.articlesData, ...action.payload };
    },
    [mostViewArticles.fulfilled]: (state, action) => {
      state.mostViewData.push(...action.payload.articles);
    },
    [getView.fulfilled]: (state, action) => {
      const index = state.mostViewData.findIndex(
        (data) => data.id === action.payload.article.id
      );
      state.mostViewData[index] = {
        ...state.mostViewData[index],
        ...action.payload.article,
      };
      const indexArticle = state.articlesData.articles.findIndex(
        (data) => data.id === action.payload.article.id
      );
      state.articlesData.articles[indexArticle] = {
        ...state.articlesData.articles[indexArticle],
        ...action.payload.article,
      };
    },
  },
});

const { reducer } = financeKnowledgeSlice;
export default reducer;
