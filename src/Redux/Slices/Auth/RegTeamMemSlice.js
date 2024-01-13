import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiclient";
// const url = "https://rms-be.antino.ca";

const initialState = {
  isLoading: false,
  msg: "",
};
//reg_tm_member_vld - registe_team_member_validation
export const reg_tm_member_vld = createAsyncThunk(
  "registerTeamMember/reg_tm_member_vld",
  async (data) => {
    console.log(data);
    try {
      let res = await api.post('/teamMember/register', data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const RegTeamMemSlice = createSlice({
  name: "registerTeamMember",
  initialState,
  reducer: {},
  extraReducers: {
    [reg_tm_member_vld.pending]: (state) => {
      state.isLoading = true;
    },
    [reg_tm_member_vld.fulfilled]: (state, action) => {
      console.log(action);
      console.log(action.payload);
      state.msg = action.payload.msg;
    },
    [reg_tm_member_vld.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default RegTeamMemSlice.reducer;
