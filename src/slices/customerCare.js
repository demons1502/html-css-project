import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { create, getAll, update, remove } from '../services/customerCare';

const initialState = [];

export const searchData = createAsyncThunk('customerCare/create', async () => {
  const res = await getAll();
  return res.data;
});

export const createData = createAsyncThunk(
  'customerCare/create',
  async (payload) => {
    const res = await create(payload);
    return res.data;
  }
);
export const retrieveData = createAsyncThunk(
  'customerCare/retrieve',
  async () => {
    const res = await getAll();
    return res.data;
  }
);
export const updateData = createAsyncThunk(
  'customerCare/update',
  async ({ id, data }) => {
    const res = await update(id, data);
    return res.data;
  }
);
export const deleteData = createAsyncThunk(
  'customerCare/delete',
  async ({ id }) => {
    await remove(id);
    return { id };
  }
);

const customerCareSlice = createSlice({
  name: 'customerCare',
  initialState,
  extraReducers: {
    [createData.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveData.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateData.fulfilled]: (state, action) => {
      const index = state.findIndex((data) => data.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteData.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
  },
});

const { reducer } = customerCareSlice;

export default reducer;
