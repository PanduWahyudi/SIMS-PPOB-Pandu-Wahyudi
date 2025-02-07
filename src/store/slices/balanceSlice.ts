import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosPrivateInstance } from "../../axios/axios";

export const fetchBalance = createAsyncThunk(
  "balance/fetchBalance",
  async () => {
    const response = await axiosPrivateInstance.get("/balance");
    return response.data.data.balance;
  }
);

const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    data: 0,
    isLoading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchBalance.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.data = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(fetchBalance.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default balanceSlice.reducer;
