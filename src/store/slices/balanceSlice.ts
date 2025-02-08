import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivateInstance } from "../../utils/axiosInstance";

interface BalanceState {
  data: number;
  isLoading: boolean;
  isBalanceVisible: boolean; // Tambahkan state ini
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
  isBalanceVisible: false, // Nilai default
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    // Tambahkan reducer untuk mengubah isBalanceVisible
    toggleBalanceVisibility: (state) => {
      state.isBalanceVisible = !state.isBalanceVisible;
    },
  },
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

// Export action dan reducer
export const { toggleBalanceVisibility } = balanceSlice.actions;
export default balanceSlice.reducer;
