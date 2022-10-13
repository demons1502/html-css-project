import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getAppointments, getSpeechScript, getAppointmentsById, getCustomerContract, postSaveFinance, 
  getFinanceSolutions, getCustomer, getIllustrationHistory,getPreparedIllustration, getIllustrationById
} from '../services/financialSolutions';
import { formatDate} from '../helper';

const initialState = {
  data: [],
  customerAppRecords: [],
  getSpeechScript: null,
  customerSelect: {},
  customerContract: [],
  historyList: [],
  preparedIllustration: null,
  history:null
};

export const getAppointment = createAsyncThunk(
  'financialSolutions/getAppointment',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getAppointments(payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getSpeechScriptType = createAsyncThunk(
  'financialSolutions/getSpeechScriptType',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getSpeechScript(payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAppointmentByIds = createAsyncThunk(
  'financialSolutions/getAppointmentByIds',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getAppointmentsById(payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getCustomerByIdAndType = createAsyncThunk(
  'financialSolutions/getCustomer',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getCustomer(payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getCustomerContracts = createAsyncThunk(
  'financialSolutions/getCustomerContract',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getCustomerContract(payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const postSaveFinances = createAsyncThunk(
  'financialSolutions/postSaveFinances',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await postSaveFinance(payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getFinanceSolution = createAsyncThunk(
  'financialSolutions/postSaveFinances',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getFinanceSolutions(payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getPreparedIllustrations = createAsyncThunk(
  'financialSolutions/getPreparedIllustration',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getPreparedIllustration(payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getIllustrationHistoryS = createAsyncThunk(
  'financialSolutions/getIllustrationHistory',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getIllustrationHistory(payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getIllustrationByIds = createAsyncThunk(
  'financialSolutions/getIllustrationById',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await getIllustrationById(payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const financialSolutions = createSlice({
  name: 'financialSolutions',
  initialState,
  reducers: {
    updateSelectCustomer: (state, action) => {
      state.customerSelect = action.payload
    }
  },
  extraReducers: {
    [getAppointment.pending]: (state) => {
      state.customerAppRecords = []
    },
    [getAppointment.fulfilled]: (state, action) => {
      state.customerAppRecords = action.payload.data
    },
    [getAppointmentByIds.pending]: (state) => {
      state.customerAppRecords = []
    },
    [getAppointmentByIds.fulfilled]: (state, action) => {
      state.customerAppRecords = action.payload.data
    },
    [getSpeechScriptType.pending]: (state) => {
      state.getSpeechScript = null
    },
    [getSpeechScriptType.fulfilled]: (state, action) => {
      state.getSpeechScript = action.payload
    },
    [getCustomerContracts.pending]: (state) => {
      state.customerContract = []
    },
    [getCustomerContracts.fulfilled]: (state, action) => {
      state.customerContract = action.payload
    },
    [getCustomerContracts.fulfilled]: (state, action) => {
      state.getFinanceSolution = action.payload
    },
    [getCustomerByIdAndType.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.customerSelect.age = action.payload.age
    },
    [getPreparedIllustrations.fulfilled]: (state, action) => {
      state.preparedIllustration = action.payload
    },
    [getIllustrationHistoryS.fulfilled]: (state, action) => {
      const data=action.payload.illustrations.map(i=>{
        return{
          ...i,
          createdAt: formatDate(i.createdAt)
        }
      })
      state.historyList = data
    },
    [getIllustrationByIds.fulfilled]: (state, action) => {
      state.history = action.payload.illustration
    },
  },
});

export const { updateSelectCustomer } = financialSolutions.actions
const { reducer } = financialSolutions;

export default reducer;
