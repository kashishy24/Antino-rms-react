import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../apiclient";

const initialState = {
  loading: false,
  teams: [],
  error: "",
};

export const getTeams = createAsyncThunk("team/getTeams", async (thunkAPI) => {
  try {
    let res = await api.get(`api/v2/teams/get-data`);
    return res?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const teamSlice = createSlice({
  name: "team",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTeams.fulfilled, (state, action) => {
      state.loading = false;
      state.teams = action.payload?.data;
    });
    builder.addCase(getTeams.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTeams.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message;
    });
  },
});


export const TeamsReducer = teamSlice.reducer
