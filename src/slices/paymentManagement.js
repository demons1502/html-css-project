import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { create, getAll, remove } from '../services/paymentManagement';

const initialState = [];

export const retrieveData = createAsyncThunk(
  'paymentManagement/getAll',
  async (params, { rejectWithValue }) => {
    try {
      const res = await getAll(params);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPayment = createAsyncThunk(
  'paymentManagement/create',
  async (params, { rejectWithValue }) => {
    try {
      const res = await create(params);
      return { data: res.data, message: 'Tạo thanh toán thành công' };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteContent = createAsyncThunk(
  'paymentManagement/delete',
  async (params) => {
    const res = await remove(params);
    return res.data;
  }
);

const paymentManagementSlice = createSlice({
  name: 'paymentManagement',
  initialState,
  reducers: {},
  extraReducers: {
    [createPayment.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveData.fulfilled]: (state, action) => {
      return [...action.payload.data];
    },
    [deleteContent.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
  },
});

const { reducer } = paymentManagementSlice;
export default reducer;
