import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import useAxiosPrivateInstance from "../../hooks/useAxiosPrivateInstance";

interface Profile {
  first_name: string;
  last_name: string;
  profile_image: string;
}

interface ProfileState {
  data: Profile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    fetchProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProfileSuccess: (state, action: PayloadAction<Profile>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchProfileError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    },
  },
});

export const { fetchProfileStart, fetchProfileSuccess, fetchProfileError } =
  profileSlice.actions;

export default profileSlice.reducer;


// Thunk function (in a separate file or same file)
export const fetchProfile =
  () =>
  async (dispatch: any, _: any,) => {
    dispatch(fetchProfileStart());
    const axiosPrivate = useAxiosPrivateInstance();

    try {
      const response = await axiosPrivate.get("/profile");
      const profileData = response.data.data || {
        first_name: "",
        last_name: "",
        profile_image: "",
      };
      dispatch(fetchProfileSuccess(profileData));
    } catch (error) {
      dispatch(fetchProfileError("Failed to fetch profile"));
    }
  };
