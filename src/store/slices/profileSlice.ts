import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivateInstance } from "../../utils/axiosInstance";

interface ProfileState {
  data: {
    first_name: string;

    last_name: string;

    profile_image: string;
    email: string;
  } | null;

  isLoading: boolean;
}

const initialState: ProfileState = {
  data: null,
  isLoading: true,
};

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async () => {
    const response = await axiosPrivateInstance.get("/profile");
    localStorage.setItem("profile_image", response.data.data.profile_image);
    localStorage.setItem("email", response.data.data.email);
    localStorage.setItem("first_name", response.data.data.first_name);
    localStorage.setItem("last_name", response.data.data.last_name);
    return response.data.data;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default profileSlice.reducer;
