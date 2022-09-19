import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import { getAll, getMostView, view } from '../services/financeKnowledge';
import { FORMAT_DATE, LOADING_STATUS } from '../ultis/constant';

const initialState = {
  articlesData: { loading: LOADING_STATUS.idle, message: '', data: [] },
  mostViewData: { loading: LOADING_STATUS.idle, message: '', data: [] },
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
  await view(id);
});

const financeKnowledgeSlice = createSlice({
  name: 'financeKnowledge',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArticlesData.fulfilled, (state, action) => {
        state.articlesData.data = action.payload.articles;
      })
      .addCase(mostViewArticles.fulfilled, (state, action) => {
        state.mostViewData.data = action.payload.articles;
      })
      .addMatcher(isPending(getArticlesData, mostViewArticles), (state) => {
        state.articlesData.loading = LOADING_STATUS.pending;
        state.mostViewData.loading = LOADING_STATUS.pending;
      })
      .addMatcher(isFulfilled(getArticlesData, mostViewArticles), (state) => {
        state.articlesData.loading = LOADING_STATUS.succeeded;
        state.mostViewData.loading = LOADING_STATUS.succeeded;
      })
      .addMatcher(
        isRejected(getArticlesData, mostViewArticles),
        (state, action) => {
          state.articlesData.loading = LOADING_STATUS.failed;
          state.mostViewData.loading = LOADING_STATUS.failed;
          state.mostViewData.message = action.error.message;
          state.articlesData.message = action.error.message;
        }
      );
    // [getArticlesData.pending]: (state, action) => {
    //   state.articlesData.loading = true;
    // },
    // [getArticlesData.fulfilled]: (state, action) => {
    //   state.articlesData.loading = false;
    //   state.articlesData = { ...state.articlesData, ...action.payload };
    // },
    // [mostViewArticles.fulfilled]: (state, action) => {
    //   state.mostViewData = action.payload.articles;
    // },
    // [getView.fulfilled]: (state, action) => {
    //   const index = state.mostViewData.findIndex(
    //     (data) => data.id === action.payload.article.id
    //   );
    //   state.mostViewData[index] = {
    //     ...state.mostViewData[index],
    //     ...action.payload.article,
    //   };
    //   const indexArticle = state.articlesData.articles.findIndex(
    //     (data) => data.id === action.payload.article.id
    //   );
    //   state.articlesData.articles[indexArticle] = {
    //     ...state.articlesData.articles[indexArticle],
    //     ...action.payload.article,
    //   };
    // },
  },
});

const { reducer } = financeKnowledgeSlice;
export default reducer;
