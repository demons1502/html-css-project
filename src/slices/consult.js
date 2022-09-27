import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAll } from '../services/consult';

const initialState = { isReload: false, data: [] };

export const getConsult = createAsyncThunk(
  'consult/getall',
  async (params, { rejectWithValue }) => {
    try {
      const res = await getAll(params);
      console.log(res)
      return { data: res.data, message: '' };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const ConsultSlice = createSlice({
  name: 'consult',
  initialState,
  extraReducers: {
    [getConsult.fulfilled]: (state, action) => {
      state.data = action.payload.data;
      state.isReload = false;
    },
  },
});

const { reducer } = ConsultSlice;

export default reducer;
