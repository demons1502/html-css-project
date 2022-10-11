import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createCustomerCallRecord,
  updateCustomerCallRecord,
  getCustomerCallById,
  getSpeechScript,
} from '../services/customerCalls';
import { creactAppointmentApi } from '../services/appointment';

const initialState = {
  newCallRecordResponse: {
    status: '',
    data: null,
    error: null
  },
  updateCallRecordResponse: {
    status: '',
    data: null,
    error: null
  },
  callRecord: {
    createdAt: null,
    updatedAt: null,
    completedAt: null,
    deletedAt: null,
    id: 0,
    isCompleted: null,
  },
  customerInfo: null,
  customerCall: {
    noteCount: 0,
    id: 0,
    isPotential: null,
  },
  speechScript: null,
};

export const getCustomerCallsData = createAsyncThunk('customerCall/getCustomerCallsData', async (customerCallId) => {
  try {
    const response = await getCustomerCallById(customerCallId);
    return response;
  } catch (error) {
    return Promise.reject(error.data);
  }
});

export const getSpeechScriptData = createAsyncThunk('customerCall/getSpeechScriptData', async (params) => {
  try {
    const response = await getSpeechScript(params);
    return response;
  } catch (error) {
    return Promise.reject(error.data);
  }
});

export const updateCallRecord = createAsyncThunk('customerCall/updateCallRecord', async (params) => {
  try {
    const response = await updateCustomerCallRecord(params);
    return response;
  } catch (error) {
    return Promise.reject(error.data);
  }
});

export const createCallRecord = createAsyncThunk('customerCall/createCallRecord', async (customerCallId) => {
  try {
    const response = await createCustomerCallRecord(customerCallId);
    return response;
  } catch (error) {
    return Promise.reject(error.data);
  }
});

export const createAppointment = createAsyncThunk('customerCall/createAppointment', async (data) => {
  try {
    const res = await creactAppointmentApi(data);
    return res.data;
  } catch (error) {
    return Promise.reject(error.data);
  }
});

const customerCallSlice = createSlice({
  name: 'customerCall',
  initialState,
  reducers: {
    reset: (currentState) => {
      currentState.callRecord = initialState.callRecord;
      currentState.customerCall = initialState.customerCall;
      currentState.customerInfo = initialState.customerInfo;
      currentState.newCallRecordResponse = initialState.newCallRecordResponse;
      currentState.speechScript = initialState.speechScript;
      currentState.updateCallRecordResponse = initialState.updateCallRecordResponse;
    },
  },
  extraReducers: (builder) => {
    // GET CALL-DATA
    builder.addCase(getCustomerCallsData.pending, (state) => {
      state.status = 'pending';
      state.loading = true;
    });
    builder.addCase(getCustomerCallsData.fulfilled, (state, action) => {
      state.callRecord = action.payload?.latestCall;
      state.customerInfo = action.payload?.customerCall?.customer;
      state.customerCall = {
        noteCount: action.payload?.customerCall?.noteCount,
        id: action.payload?.customerCall?.id,
        isPotential: action.payload?.customerCall?.isPotential,
      };
      state.status = 'success';
      state.loading = false;
    });
    builder.addCase(getCustomerCallsData.rejected, (state) => {
      state.status = 'rejected';
      state.loading = false;
    });

    // GET SCRIPT-DATA
    builder.addCase(getSpeechScriptData.pending, (state) => {
      state.status = 'pending';
      state.loading = true;
    });
    builder.addCase(getSpeechScriptData.fulfilled, (state, action) => {
      state.speechScript = action.payload;
      state.status = 'success';
      state.loading = false;
    });
    builder.addCase(getSpeechScriptData.rejected, (state) => {
      state.status = 'rejected';
      state.loading = false;
    });

    // UPDATE CALL-RECORD
    builder.addCase(updateCallRecord.pending, (state) => {
      state.status = 'pending';
      state.loading = true;
    });
    builder.addCase(updateCallRecord.fulfilled, (state, action) => {
      // console.log('scriptData', action.payload);
      // state.speechScript = action.payload;
      state.status = 'success';
      state.loading = false;

      state.updateCallRecordResponse.status = 'success';
      state.updateCallRecordResponse.data = action.payload;

      state.newCallRecordResponse = initialState.newCallRecordResponse;
    });
    builder.addCase(updateCallRecord.rejected, (state) => {
      state.status = 'rejected';
      state.loading = false;

      state.updateCallRecordResponse.status = 'failed';
      state.updateCallRecordResponse.error = action.payload;
    });

    // CREATE CALL-RECORD
    builder.addCase(createCallRecord.pending, (state) => {
      state.status = 'pending';
      state.loading = true;
    });
    builder.addCase(createCallRecord.fulfilled, (state, action) => {
      state.status = 'success';
      state.loading = false;
      state.newCallRecordResponse.status = 'success';
      state.newCallRecordResponse.data = action.payload;
    });
    builder.addCase(createCallRecord.rejected, (state) => {
      state.status = 'rejected';
      state.loading = false;
      state.newCallRecordResponse.status = 'failed';
      state.newCallRecordResponse.error = action.payload;
    });

    // CREATE APPOINTMENT
    builder.addCase(createAppointment.pending, (state) => {
      state.status = 'pending';
      state.loading = true;
    });
    builder.addCase(createAppointment.fulfilled, (state, action) => {
      // console.log('scriptData', action.payload);
      // state.speechScript = action.payload;
      state.status = 'success';
      state.loading = false;
    });
    builder.addCase(createAppointment.rejected, (state) => {
      state.status = 'rejected';
      state.loading = false;
    });
  },
});

const { reducer } = customerCallSlice;
export const { reset } = customerCallSlice.actions;
export default reducer;
