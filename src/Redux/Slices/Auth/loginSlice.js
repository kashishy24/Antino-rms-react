import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../../../apiclient";
import { BASE_URL } from "../../../constant";

const initialState = {
  isLoading: false,
  designation: "",
  status: false,
  message: "",
  user_id: "",
  token: localStorage.getItem("accessToken"),
};
// const designation="AVP";
export const getLoginValidation = createAsyncThunk(
  "login/getLoginValidation",
  async ({ data, navigate }) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/v2/auth/login`, data);

      if (res.data.status == true) {
        console.log('logincheckup',res.data.data);
        localStorage.setItem("accessToken", res.data.data.token);
        localStorage.setItem("user_id", res.data.data.user_id);
        localStorage.setItem("designation", res.data.data.role);
        localStorage.setItem("name", res.data.data.fullName);
        localStorage.setItem("email", res.data.data.email);

        navigate("/dashboard");
      }
      return res.data;
    } catch (error) {
      toast(error?.response?.data?.message);
      return error;
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducer: {},
  extraReducers: {
    [getLoginValidation.pending]: (state) => {
      state.isLoading = false;
    },
    [getLoginValidation.fulfilled]: (state, action) => {
      state.status = action?.payload?.data?.status;
      state.message = action?.payload?.data?.msg;
      state.designation = action?.payload?.data?.designation;
      state.user_id = action?.payload?.data?.user_id;
      state.token = action?.payload?.data?.token;
    },
    [getLoginValidation.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  },
});

export default loginSlice.reducer;
