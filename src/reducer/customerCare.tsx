import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import { IPayload } from '../helper/types';
import { create, getAll, update, remove } from '../services/customerCare';

const initialState: any = {
  data: []
};

export const createData: any = createAsyncThunk(
  'customerCare/create',
  async (payload: IPayload) => {    
    const res = await create();
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
  async (id: number) => {
    const res = await update(id);
    return res.data;
  }
);
export const deleteData = createAsyncThunk(
  'customerCare/delete',
  async (id: number) => {
    await remove(id);
    return { id };
  }
);

const customerCareSlice = createSlice({
  name: 'tutorial',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createData.fulfilled, (state, { payload }) => {
      state.data.push(payload)
    }),
    builder.addCase(retrieveData.fulfilled, (state, { payload }) => {
      state.data = payload;
    }),
    builder.addCase(updateData.fulfilled, (state, { payload }) => {
      const index = state.findIndex((data: any) => data.id === payload.id);
      state.data[index] = {
        ...state[index],
        ...payload,
      };
    }),
    builder.addCase(deleteData.fulfilled, (state, { payload }) => {
      const index = state.findIndex((data: any) => data.id === payload.id);
      state.splice(index, 1);
    })
  },
});

export default customerCareSlice.reducer