import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createCallTransferApi,
  getAppointmentScheduleApi,
  getCallScheduleApi,
  getCustomerCareApi,
  getMissedAppointmentApi,
  getRatioContractApi,
  getRemindFeeApi,
  getSignedContractApi,
  getTopPotentialCustomerApi,
  sendEmailApi,
  sendSMSApi,
  setNextCallApi,
  updateAppointmentScheduleApi,
} from '../services/dashboard';

// CallSchedule
export const getCallSchedules = createAsyncThunk('dashboard/GET_CALL_SCHEDULES', async (data) => {
  try {
    const response = await getCallScheduleApi(data);
    return response.data;
  } catch (error) {
    return Promise.reject(error.data);
  }
});
export const setNextCall = createAsyncThunk('dashboard/SET_NEXT_CALL', async (data) => {
  try {
    const response = await setNextCallApi(data);
    return response.data;
  } catch (error) {
    return Promise.reject(error.data);
  }
});

// CustomerCareDashboard
export const getCustomerCares = createAsyncThunk('dashboard/GET_CUSTOMER_CARES', async (data) => {
  try {
    const response = await getCustomerCareApi(data);
    return response.data;
  } catch (error) {
    return Promise.reject(error.data);
  }
});
export const getRemindFees = createAsyncThunk('dashboard/GET_REMIND_FEES', async (data) => {
  try {
    const response = await getRemindFeeApi(data);
    return response.data;
  } catch (error) {
    return Promise.reject(error.data);
  }
});
export const sendSMS = createAsyncThunk('dashboard/SEND_SMS', async (data) => {
  try {
    const response = await sendSMSApi(data);
    return response.data;
  } catch (error) {
    return Promise.reject(error.data);
  }
});
export const sendEmail = createAsyncThunk('dashboard/SEND_EMAIL', async (data) => {
  try {
    const response = await sendEmailApi(data);
    return response.data;
  } catch (error) {
    return Promise.reject(error.data);
  }
});

// MissedAppointment
export const getMissedAppointments = createAsyncThunk('dashboard/GET_MISSED_APPOINTMENTS', async (data) => {
  try {
    const response = await getMissedAppointmentApi(data);
    return response.data;
  } catch (error) {
    return Promise.reject(error.data);
  }
});

// AppointmentSchedule
export const getAppointmentSchedules = createAsyncThunk('dashboard/GET_APPOINTMENT_SCHEDULES', async (data) => {
  try {
    const response = await getAppointmentScheduleApi(data);
    return response.data;
  } catch (error) {
    return Promise.reject(error.data);
  }
});
export const updateAppointmentSchedules = createAsyncThunk('dashboard/UPDATE_APPOINTMENT_SCHEDULES', async (data) => {
  try {
    const response = await updateAppointmentScheduleApi(data);
    return response.data;
  } catch (error) {
    return Promise.reject(error.data);
  }
});

// TopPotentialCustomer
export const getTopPotentialCustomers = createAsyncThunk('dashboard/GET_TOP_POTENTIAL_CUSTOMERS', async (data) => {
  try {
    const response = await getTopPotentialCustomerApi(data);
    return response.data;
  } catch (error) {
    return Promise.reject(error.data);
  }
});
export const createCallTransfer = createAsyncThunk('dashboard/CREATE_CALL_TRANSFER', async (data) => {
  try {
    const response = await createCallTransferApi(data);
    return response.data;
  } catch (error) {
    return Promise.reject(error.data);
  }
});

// SignedContract
export const getSignedContracts = createAsyncThunk('contracts/GET_SIGNED_CONTRACTS', async (data) => {
  try {
    const response = await getSignedContractApi(data);
    return response.data;
  } catch (error) {
    return Promise.reject(error.data);
  }
});

// RatioContract
export const getRatioContracts = createAsyncThunk('contracts/GET_RATIO_CONTRACTS', async (data) => {
  try {
    const response = await getRatioContractApi(data);
    return response.data;
  } catch (error) {
    return Promise.reject(error.data);
  }
});

const initialState = {
  // CallSchedule
  callSchedules: {},
  callSchedule: {},
  // CustomerCareDashboard
  customerCares: {},
  remindFees: {},
  // MissedAppointment
  missedAppointments: {},
  // AppointmentSchedule
  appointmentSchedules: {},
  appointmentSchedule: {},
  // TopPotentialCustomer
  topPotentialCustomers: {},
  callTransfer: false,
  // SignedContract
  signedContracts: {},
  // RatioContract
  ratioContracts: {},
  loadingCallSchedule: false,
  loadingCustomerCare: false,
  loadingMissedAppointment: false,
  loadingAppointmentSchedule: false,
  loadingTopPotential: false,
  loadingSignedContract: false,
  loadingRatioContract: false,
  error: {},
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: {
    // CallSchedule
    [getCallSchedules.fulfilled]: (state, action) => {
      state.loadingCallSchedule = false;
      state.callSchedules = action.payload;
    },
    [getCallSchedules.pending]: (state) => {
      state.loadingCallSchedule = true;
    },
    [getCallSchedules.rejected]: (state, action) => {
      state.loadingCallSchedule = false;
      state.error = action.error;
    },
    [setNextCall.fulfilled]: (state, action) => {
      state.loadingCallSchedule = false;
      state.callSchedule = action.payload;
    },
    [setNextCall.pending]: (state) => {
      state.loadingCallSchedule = true;
    },
    [setNextCall.rejected]: (state, action) => {
      state.loadingCallSchedule = false;
      state.error = action.error;
    },

    // CustomerCareDashboard
    [getCustomerCares.fulfilled]: (state, action) => {
      state.loadingCustomerCare = false;
      state.customerCares = action.payload;
    },
    [getCustomerCares.pending]: (state) => {
      state.loadingCustomerCare = true;
    },
    [getCustomerCares.rejected]: (state, action) => {
      state.loadingCustomerCare = false;
      state.error = action.error;
    },
    [getRemindFees.fulfilled]: (state, action) => {
      state.loadingCustomerCare = false;
      state.remindFees = action.payload;
    },
    [getRemindFees.pending]: (state) => {
      state.loadingCustomerCare = true;
    },
    [getRemindFees.rejected]: (state, action) => {
      state.loadingCustomerCare = false;
      state.error = action.error;
    },
    [sendSMS.fulfilled]: (state, action) => {
      state.error.sms = '';
    },
    [sendSMS.rejected]: (state, action) => {
      state.error = { sms: action.error };
    },

    // MissedAppointment
    [getMissedAppointments.fulfilled]: (state, action) => {
      state.loadingMissedAppointment = false;
      state.missedAppointments = action.payload;
    },
    [getMissedAppointments.pending]: (state) => {
      state.loadingMissedAppointment = true;
    },
    [getMissedAppointments.rejected]: (state, action) => {
      state.loadingMissedAppointment = false;
      state.error = action.error;
    },

    // AppointmentSchedule
    [getAppointmentSchedules.fulfilled]: (state, action) => {
      state.loadingAppointmentSchedule = false;
      state.appointmentSchedules = action.payload;
    },
    [getAppointmentSchedules.pending]: (state) => {
      state.loadingAppointmentSchedule = true;
    },
    [getAppointmentSchedules.rejected]: (state, action) => {
      state.loadingAppointmentSchedule = false;
      state.error = action.error;
    },

    [updateAppointmentSchedules.fulfilled]: (state, action) => {
      state.loadingAppointmentSchedule = false;
      state.appointmentSchedule = action.payload;
    },
    [updateAppointmentSchedules.pending]: (state) => {
      state.loadingAppointmentSchedule = true;
    },
    [updateAppointmentSchedules.rejected]: (state, action) => {
      state.loadingAppointmentSchedule = false;
      state.error = action.error;
    },

    // TopPotentialCustomer
    [getTopPotentialCustomers.fulfilled]: (state, action) => {
      state.loadingTopPotential = false;
      state.topPotentialCustomers = action.payload;
    },
    [getTopPotentialCustomers.pending]: (state) => {
      state.loadingTopPotential = true;
    },
    [getTopPotentialCustomers.rejected]: (state, action) => {
      state.loadingTopPotential = false;
      state.error = action.error;
    },
    [createCallTransfer.fulfilled]: (state, action) => {
      state.loadingTopPotential = false;
      state.callTransfer = !state.callTransfer;
    },
    [createCallTransfer.pending]: (state) => {
      state.loadingTopPotential = true;
    },
    [createCallTransfer.rejected]: (state, action) => {
      state.loadingTopPotential = false;
      state.error = action.error;
    },

    // SignedContract
    [getSignedContracts.fulfilled]: (state, action) => {
      state.loadingSignedContract = false;
      state.signedContracts = action.payload;
    },
    [getSignedContracts.pending]: (state) => {
      state.loadingSignedContract = true;
    },
    [getSignedContracts.rejected]: (state, action) => {
      state.loadingSignedContract = false;
      state.error = action.error;
    },

    // RatioContract
    [getRatioContracts.fulfilled]: (state, action) => {
      state.loadingRatioContract = false;
      state.ratioContracts = action.payload;
    },
    [getRatioContracts.pending]: (state) => {
      state.loadingRatioContract = true;
    },
    [getRatioContracts.rejected]: (state, action) => {
      state.loadingRatioContract = false;
      state.error = action.error;
    },
  },
});

export default dashboardSlice.reducer;
