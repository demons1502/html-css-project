import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { create, getAll, remove, importFile, getHistories } from '../services/paymentManagement';

const initialState = { isReload: false, data: [], histories: { data: [], count: 0 }, total: 0 };

export const retrieveData = createAsyncThunk('paymentManagement/getAll', async (params, { rejectWithValue }) => {
  try {
    const res = await getAll(params);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getHistoriesData = createAsyncThunk(
  'paymentManagement/getHistory',
  async ({ loginId, params }, { rejectWithValue }) => {
    try {
      // console.log(loginId, params);
      const res = await getHistories(loginId, params);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPayment = createAsyncThunk('paymentManagement/create', async (params, { rejectWithValue }) => {
  try {
    const res = await create(params);
    return { data: res.data, message: 'Tạo thanh toán thành công' };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const uploadFile = createAsyncThunk('paymentManagement/upload', async (params, { rejectWithValue }) => {
  try {
    const res = await importFile(params);
    console.log(res);
    return { data: res.data, message: 'Tạo thanh toán thành công' };
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.response.data);
  }
});

export const deletePayment = createAsyncThunk('paymentManagement/delete', async (params, { rejectWithValue }) => {
  try {
    const res = await remove(params);
    return { id: params.transactionIds, message: 'Xóa thanh toán thành công' };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const paymentManagementSlice = createSlice({
  name: 'paymentManagement',
  initialState,
  reducers: {},
  extraReducers: {
    [createPayment.fulfilled]: (state) => {
      state.isReload = true;
    },
    [retrieveData.fulfilled]: (state, action) => {
      state.data = action.payload.data;
      state.total = action.payload.total;
      state.isReload = false;
    },

    [getHistoriesData.fulfilled]: (state, action) => {
      state.histories.data = action.payload.data;
      state.histories.count = action.payload.total;
      state.isReload = false;
    },

    [uploadFile.fulfilled]: (state) => {
      state.isReload = true;
    },
    [deletePayment.fulfilled]: (state) => {
      state.isReload = true;
    },
  },
});

const { reducer } = paymentManagementSlice;
export default reducer;
