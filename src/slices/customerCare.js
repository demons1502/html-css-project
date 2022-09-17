import {createSlice, createAsyncThunk, isPending, isRejected} from '@reduxjs/toolkit';
import {getCustomerCare, addCustomerCare, patchCustomerCare, deleteCustomerCare} from '../services/customerCare';

const initialState = {
  data: [],
  isLoading: false,
  error: {}
};

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
    builder.addCase(getData.fulfilled, (state, action) => {
      state.isLoading = false
      state.data = action.payload.data
    }).addCase(createData.fulfilled, (state, action) => {
      state.isLoading = false
      state.data.push(action.payload)
    }).addCase(updateData.fulfilled, (state, action) => {
      state.isLoading = false
      const index = state.findIndex((data) => data.id === action.payload.id);
      state.data[index] = {
        ...state[index],
        ...action.payload,
      };
    }).addCase(deleteData.fulfilled, (state, action) => {
      let index = state.findIndex(({id}) => id === action.payload.id);
      state.data.splice(index, 1);
    }).addMatcher(
      isPending,
      (state, action) => {
        state.isLoading = true
      }
    ).addMatcher(
      isRejected,
      (state, action) => {
        state.isLoading = true
      }
    )
  },
});

const {reducer} = customerCareSlice;

export default reducer;
