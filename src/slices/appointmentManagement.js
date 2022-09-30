import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAppointmentsApi,
  creactAppointmentApi,
} from '../services/appointment';
import { formatLocalTime } from '../ultis/date';

const initialState = {
  data: [],
  loading: false,
};

export const getAppointments = createAsyncThunk(
  'appointment/getAppointment',
  async (data) => {
    try {
      const res = await getAppointmentsApi(data);
      return res.data;
    } catch (error) {
      return Promise.reject(error.data);
    }
  }
);

export const createAppointment = createAsyncThunk(
  'appointment/createAppointment',
  async (data) => {
    try {
      const res = await creactAppointmentApi(data);
      return res.data;
    } catch (error) {
      return Promise.reject(error.data);
    }
  }
);

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      state.accessToken = '';
      state.me = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAppointments.pending, (state) => {
      state.status = 'pending';
      state.loading = true;
    });
    builder.addCase(getAppointments.fulfilled, (state, action) => {
      state.status = 'success';
      const appointments = action.payload.data.map((i) => {
        return {
          ...i,
          start: formatLocalTime(i.startTime),
          end: formatLocalTime(i.endTime),
        };
      });
      state.data = appointments;
      state.loading = false;
    });
    builder.addCase(getAppointments.rejected, (state) => {
      state.status = 'rejected';
      state.loading = false;
    });
    builder.addCase(createAppointment.pending, (state) => {
      state.status = 'pending';
      state.loading = true;
    });
    builder.addCase(createAppointment.fulfilled, (state, action) => {
      state.status = 'success';
      const data = action.payload;
      const appointment = {
        ...data,
        start: formatLocalTime(data.startTime),
        end: formatLocalTime(data.endTime),
      };
      const appointments = [...state.data, { ...appointment }];
      console.log('dsadsads', appointments);
      state.data = appointments;
      state.loading = false;
    });
    builder.addCase(createAppointment.rejected, (state) => {
      state.status = 'rejected';
      state.loading = false;
    });
  },
});

const { reducer } = appointmentSlice;
export default reducer;
