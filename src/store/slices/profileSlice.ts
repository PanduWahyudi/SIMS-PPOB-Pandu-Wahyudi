import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosPrivateInstance } from "../../axios/axios";

interface Profile {
  first_name: string;
  last_name: string;
  profile_image: string;
  email: string;
}


export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async () => {
    const response = await axiosPrivateInstance.get("/profile");
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
