import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { formatDate, formatDataNumber } from '../helper/index';
import { createContracts, getAll, update, getCustom, getById } from '../services/contractManagement';
import { getDepositTermLabel } from '../ultis/despositTerm';

const initialState = {
  data: [],
  dataEdit: [],
  totalItem: 0,
  custom: null,
  contractById: null,
  refreshData: false,
};

export const createContract = createAsyncThunk(
  'contractManagement/createContract',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await createContracts(payload);
      return { data: res.data, message: res.statusText };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCustoms = createAsyncThunk(
  'contractManagement/getCustoms',
  async (payload) => {
    const res = await getCustom(payload);
    return res.data;
  }
);

export const getByIdApi = createAsyncThunk(
  'contractManagement/getContractId',
  async (payload) => {
    const res = await getById(payload);
    return res.data;
  }
);

export const updateContract = createAsyncThunk(
  'contractManagement/updateContract',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await update({ id, data });
      console.log(data);
      return { data: res.data, message: res.statusText };
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);

export const retrieveData = createAsyncThunk(
  'contractManagement/retrieveData',
  async (payload) => {
    const res = await getAll(payload);
    return res.data;
  }
);

const contractManagement = createSlice({
  name: 'contractManagement',
  initialState,
  extraReducers: {
    [createContract.fulfilled]: (state) => {
      // contractManagement.caseReducers.retrieveData()
      state.refreshData = true;
    },
    [retrieveData.fulfilled]: (state, action) => {
      // state.data = [...action.payload.contracts];
      const data = action.payload.contracts.map((i) => {
        return {
          ...i,
          value: formatDataNumber(i.value),
          startDate: formatDate(i.startDate),
          lastDepositDate: formatDate(i.lastDepositDate),
          nextDepositDue: formatDate(i.nextDepositDue),
          depositTerm: getDepositTermLabel(i.depositTerm),
          duration: i.duration + ' Năm'
        };
      });

      state.data = data;
      state.totalItem = action.payload.total;
      state.refreshData = true;
      state.refreshData = false
    },
    [getCustoms.fulfilled]: (state, action) => {
      state.custom = [...action.payload.data];
    },
    [updateContract.fulfilled]: (state) => {
      state.refreshData = true;
    },
    [getByIdApi.fulfilled]: (state, action) => {
      // (action.payload.depositTerm == 30) ? action.payload.depositTerm = "Tháng" : (action.payload.depositTerm == 180) ? action.payload.depositTerm = "Nửa năm" : (action.payload.depositTerm == 360) ? action.payload.depositTerm = "Năm" : action.payload.depositTerm
      // state.dataEdit = action.payload
      const data = action.payload;
      const contract = {
        ...data,
        depositTermLabel: getDepositTermLabel(data.depositTerm)
      }
      state.dataEdit = contract;
    },
  },
});

export const { setRefresh } = contractManagement.actions;

const { reducer } = contractManagement;

export default reducer;
