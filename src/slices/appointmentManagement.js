import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAppointmentsApi,
  creactAppointmentApi,
  editAppointmentApi,
  deleteAppointmentApi,
  getAppointmentApi,
} from '../services/appointment';
import { getTitleAppointment } from '../ultis/appointment';
import { formatLocalTime } from '../ultis/date';

const initialState = {
  data: [],
  loading: false,
};

export const getAppointments = createAsyncThunk('appointment/getAppointments', async (data) => {
  try {
    const res = await getAppointmentsApi(data);
    return res.data;
  } catch (error) {
    return Promise.reject(error.data);
  }
});

export const getAppointment = createAsyncThunk('appointment/getAppointment', async (id) => {
  try {
    const res = await getAppointmentApi(id);
    return res.data;
  } catch (error) {
    return Promise.reject(error.data);
  }
});

export const createAppointment = createAsyncThunk('appointment/createAppointment', async (data) => {
  try {
    const res = await creactAppointmentApi(data);
    return res.data;
  } catch (error) {
    return Promise.reject(error.data);
  }
});

export const editAppointment = createAsyncThunk('appointment/editAppointment', async ({ id, data }) => {
  try {
    const res = await editAppointmentApi(id, data);
    return res.data;
  } catch (error) {
    return Promise.reject(error.data);
  }
});

export const deleteAppointment = createAsyncThunk('appointment/deleteAppointment', async ({ id }) => {
  try {
    await deleteAppointmentApi(id);
    return id;
  } catch (error) {
    return Promise.reject(error.data);
  }
});

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  extraReducers: (builder) => {
    // GET APPOINTMENTS
    builder.addCase(getAppointments.pending, (state) => {
      state.status = 'pending';
      state.loading = true;
    });
    builder.addCase(getAppointments.fulfilled, (state, action) => {
      state.status = 'success';
      const appointments = action.payload.data.map((i) => {
        return {
          ...i,
          start: formatLocalTime(i.startTime, 0),
          end: formatLocalTime(i.endTime, 1),
          title: getTitleAppointment(i.title)
        };
      });
      state.data = appointments;
      state.loading = false;
    });
    builder.addCase(getAppointments.rejected, (state) => {
      state.status = 'rejected';
      state.loading = false;
      state.data = [];
    });

    // CREATE APPOINTMENTS
    builder.addCase(createAppointment.pending, (state) => {
      state.status = 'pending';
      state.loading = true;
    });
    builder.addCase(createAppointment.fulfilled, (state, action) => {
      state.status = 'success';
      const data = action.payload;
      const appointment = {
        ...data,
        start: formatLocalTime(data.startTime, 0),
        end: formatLocalTime(data.endTime, 1),
      };
      const appointments = [...state.data, { ...appointment }];
      state.data = appointments;
      state.loading = false;
    });
    builder.addCase(createAppointment.rejected, (state) => {
      state.status = 'rejected';
      state.loading = false;
    });

    // EDITS APPOINTMENTS
    builder.addCase(editAppointment.pending, (state) => {
      state.status = 'pending';
      state.loading = true;
    });
    builder.addCase(editAppointment.fulfilled, (state, action) => {
      state.status = 'success';
      const data = action.payload;
      const appointment = {
        ...data,
        start: formatLocalTime(data.startTime, 0),
        end: formatLocalTime(data.endTime, 1),
        title: getTitleAppointment(i.title)
      };
      let appointments = [...state.data];
      state.data = appointments.map((i) => (i.apptId === data.apptId ? appointment : i));
      state.loading = false;
    });
    builder.addCase(editAppointment.rejected, (state) => {
      state.status = 'rejected';
      state.loading = false;
    });

    // DELETE APPOINTMENTS
    builder.addCase(deleteAppointment.pending, (state) => {
      state.status = 'pending';
      state.loading = true;
    });
    builder.addCase(deleteAppointment.fulfilled, (state, action) => {
      state.status = 'success';
      const apptId = action.payload;
      const appointments = state.data;
      state.data = appointments.filter((i) => i.apptId !== apptId);
      state.loading = false;
    });
    builder.addCase(deleteAppointment.rejected, (state) => {
      state.status = 'rejected';
      state.loading = false;
    });

    // GET APPOINTMENT
    builder.addCase(getAppointment.pending, (state) => {
      state.status = 'pending';
      state.loading = true;
    });
    builder.addCase(getAppointment.fulfilled, (state, action) => {
      state.status = 'success';
      const data = action.payload;
      const appointment = {
        ...data,
        start: formatLocalTime(data.startTime),
        end: formatLocalTime(data.endTime),
        title: getTitleAppointment(data.title)
      };
      const appointments = [{ ...appointment }, ...state.data];
      state.data = appointments;
      state.loading = false;
    });
    builder.addCase(getAppointment.rejected, (state) => {
      state.status = 'rejected';
      state.loading = false;
    });
  },
});

const { reducer } = appointmentSlice;
export default reducer;
