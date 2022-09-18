import {createSlice, createAction, createAsyncThunk, isPending, isRejected, isFulfilled} from '@reduxjs/toolkit';
import {getCustomerCare, addCustomerCare, patchCustomerCare, deleteCustomerCare} from '../services/customerCare';
import {FORMAT_DATE, LOADING_STATUS} from '../ultis/constant'
import moment from 'moment'

const initialState = {
  data: [],
  customerId: 0,
  loading: LOADING_STATUS.idle,
  message: ""
};

export const setCustomerId = createAction('customerCare/setCustomerId')

export const getData = createAsyncThunk('customerCare/get', async (payload) => {
  const res = await getCustomerCare(payload);
  return res.data;
});

export const createData = createAsyncThunk(
  'customerCare/create',
  async (payload) => {
    const res = await addCustomerCare(payload);
    return res.data;
  }
);
export const updateData = createAsyncThunk(
  'customerCare/update',
  async ({id, data}) => {
    const res = await patchCustomerCare(id, data);
    return res.data;
  }
);
export const deleteData = createAsyncThunk(
  'customerCare/delete',
  async ({id}) => {
    await deleteCustomerCare(id);
    return {id};
  }
);

const customerCareSlice = createSlice({
  name: 'customerCare',
  initialState,
  extraReducers: builder => {
    builder.addCase(setCustomerId, (state, action) => {
      state.customerId = action.payload
    }).addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload
    }).addCase(createData.fulfilled, (state, action) => {
      state.data.push(action.payload)
      state.message = 'Tạo thông tin thành công'
    }).addCase(updateData.fulfilled, (state, action) => {
      action.payload.date = moment(action.payload.date).format(FORMAT_DATE)
      const index = state.data.findIndex((data) => data.id === action.payload.id);
      state.data[index] = {
        ...state[index],
        ...action.payload,
      }
      state.message = 'Sửa thông tin thành công'
    }).addCase(deleteData.fulfilled, (state, action) => {
      let index = state.data.findIndex(({id}) => id === action.payload.id);
      state.data.splice(index, 1)
      state.message = 'Xóa thông tin thành công'
    }).addMatcher(
      isPending(createData, getData, updateData, deleteData),
      (state) => {
        state.loading = LOADING_STATUS.pending
      }
    ).addMatcher(
      isFulfilled(createData, getData, updateData, deleteData),
      (state) => {
        console.log('aaa');
        state.loading = LOADING_STATUS.succeeded
      }
    ).addMatcher(
      isRejected(createData, getData, updateData, deleteData),
      (state, action) => {
        state.loading = LOADING_STATUS.failed
        state.message = action?.error?.message
      }
    )
  },
});

const {reducer} = customerCareSlice;

export default reducer;
