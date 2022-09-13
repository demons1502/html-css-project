import { configureStore } from "@reduxjs/toolkit";
import customerCare from "./slices/customerCare";
import authReducer from "./slices/auth";
const reducer = {
  customerCare: customerCare,
  authReducer: authReducer,
};
const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
