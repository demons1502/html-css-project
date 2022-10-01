import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getAppointmentScheduleApi,
  getMissedAppointmentApi,
  getTopPotentialCustomerApi,
  updateAppointmentScheduleApi
} from '../services/dashboard';

export const getMissedAppointments = createAsyncThunk('dashboard/GET_MISSED_APPOINTMENTS', async (data) => {
  try {
    const response = await getMissedAppointmentApi(data);
    return response.data;
  } catch (error) {
    return Promise.reject(error.data);
  }
});

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

export const getTopPotentialCustomers = createAsyncThunk('dashboard/GET_TOP_POTENTIAL_CUSTOMERS', async (data) => {
  try {
    const response = await getTopPotentialCustomerApi(data);
    return response.data;
  } catch (error) {
    return Promise.reject(error.data);
  }
});

const initialState = {
  appointmentSchedules: {},
  appointmentSchedule: {},
  missedAppointments: {},
  topPotentialCustomers: {},
  loading: false,
  error: {},
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: {
    [getAppointmentSchedules.fulfilled]: (state, action) => {
      state.loading = false;
      state.appointmentSchedules = action.payload;
    },
    [getAppointmentSchedules.pending]: (state) => {
      state.loading = true;
    },
    [getAppointmentSchedules.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    [updateAppointmentSchedules.fulfilled]: (state, action) => {
      state.loading = false;
      state.appointmentSchedule = action.payload;
    },
    [updateAppointmentSchedules.pending]: (state) => {
      state.loading = true;
    },
    [updateAppointmentSchedules.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    [getMissedAppointments.fulfilled]: (state, action) => {
      state.loading = false;
      state.missedAppointments = action.payload;
    },
    [getMissedAppointments.pending]: (state) => {
      state.loading = true;
    },
    [getMissedAppointments.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    [getTopPotentialCustomers.fulfilled]: (state, action) => {
      state.loading = false;
      state.topPotentialCustomers = action.payload;
    },
    [getTopPotentialCustomers.pending]: (state) => {
      state.loading = true;
    },
    [getTopPotentialCustomers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default dashboardSlice.reducer;
