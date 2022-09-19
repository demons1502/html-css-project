import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from '../services/auth';

const initialState = {
  accessToken: '',
};

export const login = createAsyncThunk('auth/login', async (data) => {
  try {
    const res = await loginApi(data);
    return res.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
  },
});

const { reducer } = authSlice;

export default reducer;
