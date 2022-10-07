import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCustomersContracts, updateCustomer } from '../services/customers';
import { message } from 'antd';

const initialState = {
  data: [],
  selectedCustomer: {},
  updateCustomer: {},
  isLoading: false,
  isError: false,
  error: '',
};

export const getCustomerList = createAsyncThunk('customers/get', async () => {
  try {
    const res = await getCustomersContracts();
    return res.data;
  } catch (error) {
    return Promise.reject(error.data);
  }
});

export const editCustomer = createAsyncThunk('customers/update', async ({ id, data }) => {
  try {
    const res = await updateCustomer(id, data);
    if (res?.status === 201 || res?.status === 200) {
      message.success('Lưu thông tin cá nhân thành công');
      return res.data;
    } else {
      message.error('Lưu thông tin cá nhân không thành công');
    }
  } catch (error) {
    return Promise.reject(error.data);
  }
});

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setSelectedCustomer: (state, action) => {
      state.selectedCustomer = state.data?.find((customer) => customer?.customerId === action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerList.fulfilled, (state, action) => {
        state.data = action.payload?.customers;
      })
      .addCase(editCustomer.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(editCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updateCustomer = action.payload;
        state.error = '';
      })
      .addCase(editCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.updateCustomer = [];
      });
  },
});
export const { setData, setSelectedCustomer } = customerSlice.actions;

export default customerSlice.reducer;