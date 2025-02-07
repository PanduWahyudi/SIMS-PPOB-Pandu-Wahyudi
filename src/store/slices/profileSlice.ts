import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../axios/axios";

interface Profile {
  first_name: string;
  last_name: string;
  profile_image: string;
  email: string;
}

const token = JSON.parse(localStorage.getItem("token") || "").value;
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async () => {
    const response = await axiosInstance.get("/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null as Profile | null, // Change this to Profile | null
    isLoading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchProfile.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.data = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(fetchProfile.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default profileSlice.reducer;
