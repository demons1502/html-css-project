import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { create, getAll, remove, update } from '../services/manageContent';

const initialState = [];

export const retrieveData = createAsyncThunk(
  'manageContent/getAll',
  async ({ option = 'articles', params }) => {
    console.log(option, '------>', params);
    const res = await getAll(option, params);
    return res.data;
  }
);

export const createContent = createAsyncThunk(
  'manageContent/create',
  async ({ option, payload }) => {
    console.log(option, '-------', payload);
    const res = await create(option, payload);
    return res.data;
  }
);
export const updateContent = createAsyncThunk(
  'manageContent/update',
  async ({ option, id, payload }) => {
    console.log(option, '---', id, '---', payload);
    const res = await update(option, id, payload);
    return res.data;
  }
);

export const deleteContent = createAsyncThunk(
  'manageContent/delete',
  async ({ option, id }) => {
    console.log(option, '------------>', id);
    const res = await remove(option, id);
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
      console.log('success');
      return [...action.payload];
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
