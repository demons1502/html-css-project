import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getAppointments,
} from '../services/financialSolutions';

const initialState = {
  data: [],
  customerAppRecords: [],

};



export const getAppointment = createAsyncThunk(
  'financialSolotions/getAppointments',
  async (payload) => {
    const res = await getAppointments(payload);
    return res.data
  }
);

// export const login = createAsyncThunk(
//   'financialSolotions/changePassword',
//   async (payload, { rejectWithValue }) => {
//     try {
//       const res = await loginApi(payload);
//       return res.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const changePassword = createAsyncThunk(
//   'financialSolotions/changePassword',
//   async (payload, { rejectWithValue }) => {
//     try {
//       const res = await changePasswordApi(payload);
//       return { data: res.data, message: 'Thay đổi mật khẩu thành công' };
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const sendAvatars = createAsyncThunk(
//   'financialSolotions/sendAvatar',
//   async (payload, { rejectWithValue }) => {
//     try {
//       const res = await sendAvatar(payload);
//       return { data: res.data, message: 'Thay đổi người dùng thành công!' };
//       // dispath(getme())
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
// export const updateUsers = createAsyncThunk(
//   'financialSolotions/updateUser',
//   async (payload, { rejectWithValue }) => {
//     try {
//       const res = await updateUser(payload);
//       return { data: res.data, message: 'Thay đổi người dùng thành công!' };
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

const financialSolotions = createSlice({
  name: 'financialSolotions',
  initialState,
  extraReducers: {
    [getAppointment.fulfilled]: (state, action) => {
      state.customerAppRecords = action.payload.data
    },
  },
});

const { reducer } = financialSolotions;

export default reducer;
