import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { create, getUser,getAll, update, getSearch, remove,removeUsers,uploadFile, resetUser } from '../services/userManagement';

const initialState = [];

export const searchUser = createAsyncThunk('userManagement/getSearch', async (payload) => {
  const res = await getSearch(payload);
  return res.data;
});

export const createUser = createAsyncThunk( //
  'userManagement/createUser',
  async (payload) => {
    const res = await create(payload);
    return res.data;
  }
);
export const getUserProfile = createAsyncThunk('userManagement/getUser', async () => {
  const res = await getUser();
  return res.data;
});
export const updateUser = createAsyncThunk(//
  'userManagement/updateUser',
  async ( data ) => {
    const res = await update(data);
    return res.data;
  }
);
export const resetUserId = createAsyncThunk(//
  'userManagement/updateUser',
  async ( data ) => {
    const res = await resetUser(data);
    return res.data;
  }
);
export const uploadFiles = createAsyncThunk(//
  'userManagement/uploadFile',
  async ( data ) => {
    const res = await uploadFile(data);
    return res.data;
  }
);
export const retrieveData = createAsyncThunk(//
  'userManagement/retrieve',
  async () => {
    const res = await getAll();
    return res.data;
  }
);
export const removeUser = createAsyncThunk(//
  'userManagement/removeUser',
  async (id) => {
    await remove(id);
    return { id };
  }
);
export const removeUserIds = createAsyncThunk(//
  'userManagement/removeUser',
  async (id) => {
    console.log(id);
    await removeUsers(id);
    return { id };
  }
);

const useManagement = createSlice({
  name: 'userManagement',
  initialState,
  extraReducers: {
    [searchUser.fulfilled]: (state, action) => {
      return [...action.payload.data];
    },
    [createUser.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveData.fulfilled]: (state, action) => {
      return [...action.payload.data];
    },
    [updateUser.fulfilled]: (state, action) => {
      const index = state.findIndex((data) => data.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [removeUser.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
  },
});

const { reducer } = useManagement;

export default reducer;
