import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './slices/auth';
import events from './slices/events';
import customerCare from './slices/customerCare';
import financeKnowledgeReducer from './slices/financeKnowledge';
import managementContentReducer from './slices/managementContent';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

import userManagement from './slices/userManagement';

const rootReducer = combineReducers({
  customerCare: customerCare,
  auth: authReducer,
  financeKnowledgeReducer: financeKnowledgeReducer,
  managementContentReducer: managementContentReducer,
  events: events,
  userManagement: userManagement,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export const persistor = persistStore(store);
export default store;
