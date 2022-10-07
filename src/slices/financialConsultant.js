import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addNewConsult, getConsult, getConsultById, getSpeechScript } from '../services/financialConsultant';

const initialState = {
  isReload: false,
  data: [],
  consultScrip: {},
  count: 0,
};

export const AddNewConsultant = createAsyncThunk('financeConsultant/addNew', async (payload, { rejectWithValue }) => {
  try {
    const res = await addNewConsult(payload);
    return { data: res.data, message: 'Tạo mới tư vấn thành công' };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getConsultants = createAsyncThunk(
  'financeConsultant/getConsults',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getConsult(payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getConsultantsById = createAsyncThunk('financeConsultant/getById', async (id, { rejectWithValue }) => {
  try {
    const res = await getConsultById(id);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getConsultScript = createAsyncThunk('financeConsultant/getScript', async (_, { rejectWithValue }) => {
  try {
    const res = await getSpeechScript();

    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const financeConsultantSlice = createSlice({
  name: 'financeConsultant',
  initialState,
  reducers: {},
  extraReducers: {
    [AddNewConsultant.fulfilled]: (state, action) => {
      state.isReload = true;
    },
    [getConsultants.fulfilled]: (state, action) => {
      state.data = action.payload.data;
      state.count = action.payload.total;
      state.isReload = false;
    },
    [getConsultScript.fulfilled]: (state, action) => {
      state.consultScrip = action.payload;
    },
  },
});

const { reducer } = financeConsultantSlice;
export default reducer;
