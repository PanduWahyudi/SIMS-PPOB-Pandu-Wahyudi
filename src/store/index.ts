import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/profileSlice";
import balanceReducer from "./slices/balanceSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    balance: balanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
