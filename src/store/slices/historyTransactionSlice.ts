import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivateInstance } from "../../utils/axiosInstance";

interface TransactionRecord {
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
  created_on: string;
}

interface TransactionState {
  histories: TransactionRecord[];
  offset: number;
  hasMore: boolean;
  isLoading: boolean;
}

const initialState: TransactionState = {
  histories: [],
  offset: 0,
  hasMore: true,
  isLoading: false,
};

export const fetchHistories = createAsyncThunk(
  "transactions/fetchHistories",
  async (offset: number) => {
    const response = await axiosPrivateInstance.get(
      `/transaction/history?offset=${offset}&limit=5`
    );
    return response.data.data.records;
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    resetState(state) {
      state.histories = [];
      state.offset = 0;
      state.hasMore = true;
      state.isLoading = false;
    },
    incrementOffset(state) {
      state.offset += 5;
    },
    setHasMore(state, action) {
      state.hasMore = action.payload;
    },
    addHistories(state, action) {
      const newHistories = action.payload.filter(
        (newHistory: { invoice_number: string }) =>
          !state.histories.some(
            (existingHistory) =>
              existingHistory.invoice_number === newHistory.invoice_number
          )
      );
      state.histories.push(...newHistories);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHistories.fulfilled, (state, action) => {
        state.hasMore = action.payload.length === 5;
        state.isLoading = false;
        const newHistories = action.payload.filter(
          (newHistory: { invoice_number: string }) =>
            !state.histories.some(
              (existingHistory) =>
                existingHistory.invoice_number === newHistory.invoice_number
            )
        );
        state.histories.push(...newHistories);
      })
      .addCase(fetchHistories.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetState, incrementOffset, setHasMore, addHistories } =
  transactionsSlice.actions;

export default transactionsSlice.reducer;
