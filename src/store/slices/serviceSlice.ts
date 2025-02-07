import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivateInstance } from "../../axios/axios";

interface Service {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

interface ServiceState {
  data: Service[];
  loading: boolean;
}

const initialState: ServiceState = {
  data: [],
  loading: true,
};

export const fetchServices = createAsyncThunk(
  "service/fetchServices",
  async () => {
    const response = await axiosPrivateInstance.get("/services");
    return response.data.data;
  }
);

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchServices.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default serviceSlice.reducer;
