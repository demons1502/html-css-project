import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { create, getAll, remove, update } from '../services/manageContent';

const initialState = [];

export const retrieveData = createAsyncThunk(
  'manageContent/getAll',
  async ({ type = 'articles', params }) => {
    const res = await getAll(type, params);
    return res.data;
  }
);

export const createContent = createAsyncThunk(
  'manageContent/create',
  async ({ type, payload }) => {
    console.log(payload);
    const res = await create(type, payload);
    return res.data;
  }
);
export const updateContent = createAsyncThunk(
  'manageContent/update',
  async ({ type, id, payload }) => {
    if (id) {
      const res = await update(type, id, payload);
      return res.data;
    } else {
      const res = await create(type, payload)
      return res.data
    }
  }
);

export const deleteContent = createAsyncThunk(
  'manageContent/delete',
  async ({ type, id }) => {
    const res = await remove(type, id);
    return res.data;
  }
);

const manageContentSlice = createSlice({
  name: 'manageContent',
  initialState,
  reducers: {},
  extraReducers: {
    [createContent.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveData.fulfilled]: (state, action) => {
      return [...action.payload?.articles];
    },
    [updateContent.fulfilled]: (state, action) => {
      const index = state.findIndex((data) => data.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteContent.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
  },
});

const { reducer } = manageContentSlice;
export default reducer;
