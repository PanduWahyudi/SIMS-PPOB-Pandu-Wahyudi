import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { axiosPrivateInstance } from "../../axios/axios";

interface BalanceState {
  data: number;
  isLoading: boolean;
}

export const fetchBalance = createAsyncThunk(
  "balance/fetchBalance",
  async () => {
    const response = await axiosPrivateInstance.get("/balance");
    return response.data.data.balance;
  }
);

const initialState: BalanceState = {
  data: 0,
  isLoading: true,
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchBalance.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default balanceSlice.reducer;
