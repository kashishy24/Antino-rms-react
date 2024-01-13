import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../apiclient";
const url = "https://rms-be.antino.ca";

// const url="http://localhost:3030";
const initialState = {
  isLoading: false,
  msg: "",
  code: "",
  status: "",
  userData: [],
  keyword: "",
};
//reg_dev_vld - registedeveloper_validation
export const reg_dev_vld = createAsyncThunk(
  "registerDeveloper/reg_dev_vld",
  async (data, { rejectWithValue }) => {
    try {
      let res = await api.post("/api/v2/users/add-user", data);
      toast("Developer Added Successfully");
      return res.data;
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        console.log(error.response.data);
        // alert(error.response.message)
        toast.error(error.response.data.message)

        return rejectWithValue(error.response.data);
      }
      return error.response;
    }
  }
);
export const get_user = createAsyncThunk(
  "registerDeveloper/get_user",
  async (data) => {
    const user_url = "/api/v2/users/getDetails?userId=" + data;
    console.log("hellosingle",data)
    try {
      let res = await api.get(user_url);
      return res.data;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }
);

export const update_user = createAsyncThunk(
  "registerDeveloper/update_user",
  async (data, { rejectWithValue }) => {
    const update_url = "/api/v2/users/edit-user";
    const requiredData = data;
    // const _id= requiredData.id;
    const payload = { ...requiredData.data , id : requiredData.id }
    // console.log("masummasum",_id)
    // const payload = { ...requiredData.data , id : requiredData.id }
    try {
      let res = await api.put(update_url, payload);
      toast("Developer Updated Successfully");
      console.log(res);
      return res.data;
    } catch (error) {
      // console.log(error.response,"datachhhhh");
      // if (error.response.status === 409) {
        toast.error(error.response.data.message)
        console.log(error.response,"datachhhhh");
        return rejectWithValue(error.response.data);
      // }
      return error.response;
    }
  }
);

const RegDevSlice = createSlice({
  name: "registerDeveloper",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "";
    },
    addEditData: (state, action) => {
      // console.log(action.payload);
      state.editData = action.payload.thisRow;
      state.id = action.payload.id;
    },
    emptyUserData: (state) => {
      state.userData = {};
    },
  },
  extraReducers: {
    [reg_dev_vld.pending]: (state) => {
      state.isLoading = true;
    },
    [reg_dev_vld.fulfilled]: (state, action) => {
      // console.log(action.payload);
      state.msg = action.payload.msg;
      state.isLoading = false;
      // if (state.msg == undefined)
      // state.msg = action.payload.data.msg;

      state.code = action.payload.code;
      state.status = action.payload.status;
      // console.log(state.msg);
      // console.log(state.code);
      // console.log(state.status);
    },
    [reg_dev_vld.rejected]: (state, action) => {
      // console.log(action.payload);
      state.isLoading = false;
      state.msg = action.payload.message;
      // state.code = action.payload.code;
      state.status = action.payload.status;
    },
    [get_user.pending]: (state) => {
      state.isLoading = true;
      state.userData = {};
    },
    [get_user.fulfilled]: (state, action) => {
      state.msg = action.payload.msg;
      state.isLoading = false;
      console.log("actionpayload",action.payload)
      state.userData = action.payload.data;
      console.log(state.userData,"userdataname")
      //onclick pageload

      // if (state.msg == undefined)
      // state.msg = action.payload.data.msg;
      state.code = action.payload.code;
      // if (state.code == undefined) state.status = action.payload.status;
    },
    [get_user.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [update_user.pending]: (state) => {
      state.isLoading = true;
    },
    [update_user.fulfilled]: (state, action) => {
      // console.log("your are inside successful update");
      // console.log(action.payload);
      state.msg = action.payload.msg;
      state.isLoading = false;

      // state.userData = action.payload.data;
      // console.log(state.userData);

      // if (state.msg == undefined)
      // state.msg = action.payload.data.msg;
      state.code = action.payload.code;
      state.status = action.payload.status;

      console.log(state.status);
      // console.log(state.msg);
      // console.log(state.code);
      // console.log(state.status);
    },
    [update_user.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.keyword = action.payload.keyValue;
      state.msg = action.payload.msg;
      state.status = action.payload.status;
      console.log(state.status);
    },
  },
});

export const { resetStatus, addEditData, emptyUserData } = RegDevSlice.actions;

export default RegDevSlice.reducer;
