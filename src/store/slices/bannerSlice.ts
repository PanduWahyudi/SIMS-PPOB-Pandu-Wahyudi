import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivateInstance } from "../../axios/axios";

interface Banner {
  banner_name: string;
  banner_image: string;
  description: string;
}

interface BannerState {
  data: Banner[];
  isLoading: boolean;
}

export const fetchBanners = createAsyncThunk(
  "banner/fetchBanners",
  async () => {
    const response = await axiosPrivateInstance.get("/banner");
    return response.data.data;
  }
);

const initialState: BannerState = {
  data: [],
  isLoading: true,
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.data = action.payload; // Perbaiki di sini
        state.isLoading = false;
      })
      .addCase(fetchBanners.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default bannerSlice.reducer;
