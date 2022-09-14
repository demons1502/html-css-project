import { configureStore } from '@reduxjs/toolkit';
import customerCare from './slices/customerCare';
import authReducer from './slices/auth';
import financeKnowledgeReducer from './slices/financeKnowledge';
const reducer = {
  customerCare: customerCare,
  authReducer: authReducer,
  financeKnowledgeReducer: financeKnowledgeReducer,
};
const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
