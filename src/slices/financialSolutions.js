import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useEffect } from 'react';

import {
  getAppointments,getSpeechScript, getAppointmentsById, getCustomerContract
} from '../services/financialSolutions';

const initialState = {
  data: [],
  customerAppRecords: [],
  getSpeechScript: null,
  customerSelect: null,
  customerContract: [],
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

const financialSolutions = createSlice({
  name: 'financialSolutions',
  initialState,
  reducers:{
    updateSelectCustomer: (state, action)=>{
      console.log(action.payload);
      state.customerSelect= action.payload
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
  },
});

export const {updateSelectCustomer} =financialSolutions.actions
const { reducer } = financialSolutions;

export default reducer;
