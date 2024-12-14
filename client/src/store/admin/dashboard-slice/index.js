import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/store/axiosInstance";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

// Fetch feature images
export const getFeatureImages = createAsyncThunk(
  "/order/getFeatureImages",
  async () => {
    const response = await axiosInstance.get(
      `/api/common/feature/get`
    );
    return response.data;
  }
);

// Add a feature image
export const addFeatureImage = createAsyncThunk(
  "/order/addFeatureImage",
  async (image) => {
    const response = await axiosInstance.post(
      `/api/common/feature/add`,
      { image }
    );

    return response.data
    
    ; // Returning the added image
  }
);

// Remove a feature image
export const removeFeatureImage = createAsyncThunk(
  "/order/removeFeatureImage",
  async (id) => {
    const response = await axiosInstance.delete(`/api/common/feature/delete/${id}`);
    return response; // Return the id for easy reference in the reducer
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data; // Assuming your API returns the data in this shape
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      })
      ;
  },
});

export default commonSlice.reducer;
