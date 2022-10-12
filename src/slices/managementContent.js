import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { create, getAll, getOne, like, remove, update } from '../services/manageContent';

const initialState = { isReload: false, data: [], count: 0, detail: null };

export const retrieveData = createAsyncThunk(
  'manageContent/getAll',
  async ({ type = 'articles', params }, { rejectWithValue }) => {
    try {
      const res = await getAll(type, params);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDetail = createAsyncThunk('manageContent/getDetail', async (payload, { rejectWithValue }) => {
  try {
    const res = await getOne(payload.type, payload.id);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const likeContent = createAsyncThunk('manageContent/like', async (payload, { rejectWithValue }) => {
  try {
    await like(payload.type, payload.id);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const createContent = createAsyncThunk(
  'manageContent/create',
  async ({ type, payload }, { rejectWithValue }) => {
    try {
      const res = await create(type, payload);
      return { data: res.data, message: 'Tạo mới thành công' };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateContent = createAsyncThunk(
  'manageContent/updateContent',
  async ({ type, id, payload }, { rejectWithValue }) => {
    try {
      const res = await update(type, id, payload);
      return { data: { ...res.data }, message: 'Cập nhập bài viết thành công' };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteContent = createAsyncThunk('manageContent/delete', async ({ type, id }, { rejectWithValue }) => {
  try {
    const res = await remove(type, id);
    return { id, message: 'Bài viết đã được xóa!' };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const manageContentSlice = createSlice({
  name: 'manageContent',
  initialState,
  reducers: {},
  extraReducers: {
    [createContent.fulfilled]: (state) => {
      state.isReload = true;
    },
    [getDetail.fulfilled]: (state, action) => {
      state.detail = action.payload;
      state.isReload = false;
    },
    [retrieveData.fulfilled]: (state, action) => {
      state.data = action.payload.articles || action.payload.data;
      state.count = action.payload.articlesCount;
      state.isReload = false;
    },
    [updateContent.fulfilled]: (state) => {
      state.isReload = true;
    },
    [deleteContent.fulfilled]: (state) => {
      state.isReload = true;
    },
    [likeContent.fulfilled]: (state) => {
      state.isReload = true;
    },
  },
});

const { reducer } = manageContentSlice;
export default reducer;
