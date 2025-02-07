import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/profileSlice";
import balanceReducer from "./slices/balanceSlice";
import bannerReducer from "./slices/bannerSlice";
import serviceReducer from "./slices/serviceSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    balance: balanceReducer,
    banner: bannerReducer,
    service: serviceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
