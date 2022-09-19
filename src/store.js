import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import events from './slices/events';
import customerCare from './slices/customerCare';
import financeKnowledgeReducer from './slices/financeKnowledge';
import managementContentReducer from './slices/managementContent';
import userManagement from './slices/userManagement'

const reducer = {
  customerCare: customerCare,
  authReducer: authReducer,
  financeKnowledgeReducer: financeKnowledgeReducer,
  managementContentReducer: managementContentReducer,
  events: events,
  userManagement:userManagement,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
