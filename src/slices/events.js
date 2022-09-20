import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getEvents, addEvents, patchEvents, deleteEvents, sendEvents} from '../services/events';
import {FORMAT_DATE} from '../ultis/constant'
import moment from 'moment'

const initialState = {
  data: []
};

export const sendEvent = createAsyncThunk('events/send', async (payload) => {
  const res = await sendEvents(payload);
  return res.data;
});

export const getData = createAsyncThunk('events/get', async (payload) => {
  const res = await getEvents(payload);
  return res.data;
});

export const createData = createAsyncThunk(
  'events/create',
  async (payload, {rejectWithValue}) => {
    try {
      const res = await addEvents(payload);
      return {
        data: res.data,
        message: "Tạo sự kiện thành công"
      };
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);
export const updateData = createAsyncThunk(
  'events/update', 
  async (payload, {rejectWithValue}) => {
    try {
      const res = await patchEvents(payload.id, payload);
      return {
        data: payload,
        message: "Thay đổi sự kiện thành công"
      };
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);
export const deleteData = createAsyncThunk(
  'events/delete',
  async (id, {rejectWithValue}) => {
    try {
      await deleteEvents(id);
      return {
        id: id,
        message: "Xóa sự kiện thành công"
      };
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  extraReducers: {
    [getData.fulfilled]: (state, action) => {
      state.data = action.payload
    },
    [createData.fulfilled]: (state, action) => {
      state.data.push(action.payload.data)
    },
    [updateData.fulfilled]: (state, action) => {
      const index = state.data.findIndex((data) => data.id === action.payload.data.id);
      state.data[index] = {
        ...state.data[index],
        ...action.payload.data,
      }
    },
    [deleteData.fulfilled]: (state, action) => {
      let index = state.data.findIndex(({id}) => id === action.payload.id);
      state.data.splice(index, 1)
    }
  }
});

const {reducer} = eventsSlice;

export default reducer;
