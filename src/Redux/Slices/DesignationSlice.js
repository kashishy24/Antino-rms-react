import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../apiclient";

const initialState = {
    isLoading: false,
    error: "",
    designations: [],
};


export const getAllDesignation = createAsyncThunk("designation/getAllDesignation", async (thunkAPI) => {
    try {
      let res = await api.get(`designation/getAllDesignation`);
      return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
  

const DesignationSlice = createSlice({
    name: "designation",
    initialState,
    reducers: {
    //   setFilterParameters(state, action) {
    //     state.searchFilters = action.payload;
    //   },
    //   setCurrentPage(state, action) {
    //     state.currentPage = action.payload;
    //   },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllDesignation.fulfilled, (state, action) => {
            state.isLoading = false;
            state.designations = action?.payload?.data;
            state.error = "";
        });
        builder.addCase(getAllDesignation.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getAllDesignation.rejected, (state, action) => {
            state.isLoading = false;
            state.designations = [];
            state.error = action?.payload?.message;
        });
    },
})


export default DesignationSlice.reducer
