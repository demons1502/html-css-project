import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  updateUser,
  sendAvatar,
  updatePassword,
} from '../services/configUser';

const initialState = {
  data: [],
  totalItem: 0,
  custom: [],
  contractById: null,
  refreshData: false,
};

export const changePassword = createAsyncThunk(
  'configUser/changePassword',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await updatePassword(payload);
      return { data: res.data, message: 'Thay đổi mật khẩu thành công' };
    } catch (error) {
      return rejectWithValue(error.response.data.message = "Mật khẩu cũ không đúng");
    }
  }
);

export const sendAvatars = createAsyncThunk(
  'configUser/sendAvatar',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await sendAvatar(payload);
      return { data: res.data, message: 'Thay đổi người dùng thành công!' };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateUsers = createAsyncThunk(
  'configUser/updateUser',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await updateUser(payload);
      return { data: res.data, message: 'Thay đổi người dùng thành công!' };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const configUser = createSlice({
  name: 'configUser',
  initialState,
  extraReducers: {
    [changePassword.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
    [updateUsers.rejected]: (state, action) => {
      console.log(action.payload);
    }
  },
});

const { reducer } = configUser;

export default reducer;
