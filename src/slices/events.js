import {createSlice, createAsyncThunk, isPending, isRejected, isFulfilled} from '@reduxjs/toolkit';
import {getEvents, addEvents, patchEvents, deleteEvents} from '../services/events';
import {FORMAT_DATE, LOADING_STATUS} from '../ultis/constant'
import moment from 'moment'

const initialState = {
  data: [],
  loading: LOADING_STATUS.idle,
  message: ""
};

export const getData = createAsyncThunk('events/get', async (payload) => {
  const res = await getEvents(payload);
  return res.data;
});

export const createData = createAsyncThunk(
  'events/create',
  async (payload) => {
    const res = await addEvents(payload);
    return res.data
  }
);
export const updateData = createAsyncThunk(
  'events/update', 
  async (payload) => {
    await patchEvents(payload.id, payload);
    return payload;
  }
);
export const deleteData = createAsyncThunk(
  'events/delete',
  async (id) => {
    await deleteEvents(id);
    return {id};
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload
    }).addCase(createData.fulfilled, (state, action) => {
      state.data.push(action.payload)
      state.message = 'Tạo sự kiện thành công'
    }).addCase(updateData.fulfilled, (state, action) => {
      action.payload.date = moment(action.payload.date).format(FORMAT_DATE)
      const index = state.data.findIndex((data) => data.id === action.payload.id);
      state.data[index] = {
        ...state[index],
        ...action.payload,
      }
      state.message = 'Sửa sự kiện thành công'
    }).addCase(deleteData.fulfilled, (state, action) => {
      let index = state.data.findIndex(({id}) => id === action.payload.id);
      state.data.splice(index, 1)
      state.message = 'Xóa sự kiện thành công'
    }).addMatcher(
      isPending(createData, getData, updateData, deleteData),
      (state) => {
        state.loading = LOADING_STATUS.pending
      }
    ).addMatcher(
      isFulfilled(createData, getData, updateData, deleteData),
      (state) => {
        state.loading = LOADING_STATUS.succeeded
      }
    ).addMatcher(
      isRejected(createData, getData, updateData, deleteData),
      (state, action) => {
        state.loading = LOADING_STATUS.failed
        state.message = action?.error?.message
      }
    )
  },
});

const {reducer} = eventsSlice;

export default reducer;
