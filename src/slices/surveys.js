import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addSurvey, getSurvey, getCustomerHistory, getCompanyHistory, patchSurvey } from "../services/surveys";
import { message } from "antd";

const initialState = {
  data: {},
  survey: {},
  customerHistories: [],
  companyHistories: [],
  surveyScript: {},
  isLoading: false,
  isError: false,
  error: "",
  isClearSurvey: false,
};

export const createSurvey = createAsyncThunk("surveys/create", async (data) => {
  try {
    const res = await addSurvey(data);
    if (res?.status === 201 || res?.status === 200) {
      message.success("Lưu khảo sát thành công");
      return res.data;
    } else {
      message.error("Có lỗi xảy ra khi lưu thông tin khảo sát");
    }
  } catch (error) {
    return Promise.reject(error.data);
  }
});

export const getSurveyDetails = createAsyncThunk("surveys/details", async (id) => {
  try {
    const res = await getSurvey(id);
    return res.data;
  } catch (error) {
    return Promise.reject(error.data);
  }
});

export const getCustomerHistoryById = createAsyncThunk("surveys/customer-history", async (id) => {
  try {
    const res = await getCustomerHistory(id);
    return res.data;
  } catch (error) {
    return Promise.reject(error.data);
  }
});

export const getCompanyHistoryById = createAsyncThunk("surveys/company-history", async (id) => {
  try {
    const res = await getCompanyHistory(id);
    return res.data;
  } catch (error) {
    return Promise.reject(error.data);
  }
});

// export const getSppechScriptInfo = createAsyncThunk("surveys/speech-script", async () => {
//   try {
//     const res = await getSpeechScript();
//     return res.data;
//   } catch (error) {
//     return Promise.reject(error.data);
//   }
// });
const surveySlice = createSlice({
  name: "surveys",
  initialState,
  reducers: {
    clearSurvey: (state) => {
      state.survey = {};
      state.isClearSurvey = true;
    },
  },
  extraReducers: (builder) => {
    // add survey
    builder.addCase(createSurvey.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(createSurvey.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(createSurvey.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error?.message;
      state.data = [];
    });

    // get survey details
    builder.addCase(getSurveyDetails.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getSurveyDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.survey = action.payload;
      state.error = "";
    });
    builder.addCase(getSurveyDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error?.message;
      state.survey = {};
    });

    // get customer history list
    builder.addCase(getCustomerHistoryById.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getCustomerHistoryById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.customerHistories = action.payload;
      state.error = "";
    });
    builder.addCase(getCustomerHistoryById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error?.message;
      state.customerHistories = [];
    });

    // get compony history list
    builder.addCase(getCompanyHistoryById.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getCompanyHistoryById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.companyHistories = action.payload;
      state.error = "";
    });
    builder.addCase(getCompanyHistoryById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error?.message;
      state.companyHistories = [];
    });

    // .addCase(getSppechScriptInfo.fulfilled, (state, action) => {
    //   state.surveyScript = action.payload;
    // });
  },
});

export const { clearSurvey } = surveySlice.actions;
const { reducer } = surveySlice;

export default reducer;