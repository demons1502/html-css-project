import {createSlice, createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {getCustomerCare, addCustomerCare, patchCustomerCare, deleteCustomerCare} from '../services/customerCare';

const initialState = {
  data: [],
  customerId: 0,
};

export const setCustomerId = createAction('customerCare/setCustomerId')

export const getData = createAsyncThunk('customerCare/get', async (payload, { rejectWithValue }) => {
  try {
    const res = await getCustomerCare(payload);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
});

export const createData = createAsyncThunk(
  'customerCare/create',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await addCustomerCare(payload);
      return {
        data: res.data,
        message: "Tạo thông tin thành công"
      };
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);
export const updateData = createAsyncThunk(
  'customerCare/update',
  async ({id, data}, { rejectWithValue }) => {
    try {
      const res = await patchCustomerCare(id, data);
      return {
        data: res.data,
        message: "Thay đổi thông tin thành công"
      };
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);
export const deleteData = createAsyncThunk(
  'customerCare/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteCustomerCare(id);
      return {
        id: id,
        message: "Xóa thông tin thành công"
      };
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);

const customerCareSlice = createSlice({
  name: 'customerCare',
  initialState,
  extraReducers: {
    [setCustomerId]: (state, action) => {
      state.customerId = action.payload
    },
    [getData.fulfilled]: (state, action) => {
      state.data = action.payload
    },
    [createData.fulfilled]: (state, action) => {
      state.data.push(action.payload.data)
    },
    [updateData.fulfilled]: (state, action) => {
      const index = state.data.findIndex((data) => data.id === action.payload.data.id);
      state.data[index] = {
        ...state[index],
        ...action.payload.data,
      }
    },
    [deleteData.fulfilled]: (state, action) => {
      let index = state.data.findIndex(({id}) => id === action.payload.id);
      state.data.splice(index, 1)
    }
  },
});

const {reducer} = customerCareSlice;

export default reducer;
