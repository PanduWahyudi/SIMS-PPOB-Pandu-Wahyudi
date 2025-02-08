import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/profileSlice";
import balanceReducer from "./slices/balanceSlice";
import bannerReducer from "./slices/bannerSlice";
import serviceReducer from "./slices/serviceSlice";
import transactionsReducer from "./slices/historyTransactionSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    balance: balanceReducer,
    banner: bannerReducer,
    service: serviceReducer,
    transactions: transactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
