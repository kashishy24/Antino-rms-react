import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../apiclient";
import { toast } from "react-toastify";
import { ConstructionOutlined } from "@mui/icons-material";

const initialState = {
  isLoading: false,
  groups: [],
  error: "",
};

export const getGroups = createAsyncThunk("groups/getGroups", async (status) => {
  try {
    const isDeleted = status? status : false;
    const group_url = `api/v2/group/viewall?isDelete=${isDeleted}`;
    let res = await api.get(group_url);   
    console.log("ASDASDSA",res.data);
    return res.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
});

export const addGroup = createAsyncThunk(
  "groups/addGroup",
  async (data, { rejectWithValue }) => {
    try {
      const group_url =   "api/v2/group/add-group";
      let res = await api.post(group_url, data);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log("groupname>.",error.response.data);
      toast(error.response.data.resp.message);
      return rejectWithValue(error.response);
      // return error.response;
    }
  }
);

export const addDevelopers = createAsyncThunk(
  "groups/addDevelopers",
  async (data, { rejectWithValue }) => {
    try {
      const payload = {...data , Action : "Assigned"};
      const group_url = "api/v2/group/onboard";
      let res = await api.post(group_url, payload);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const removeDeveloper = createAsyncThunk(
  "groups/removeDeveloper",
  async (data) => {
    
    try {
      const payload = { Action : "Unassigned",userId : [data.developerId] , groupId : data.groupName};
      const remove_url = "api/v2/group/onboard";
      // console.log(data);
      let res = await api.post(remove_url,payload );
      return res.data;
    } catch (error) {
      return error.response;
    }
  }
);

// export const getDeveloperName = createAsyncThunk('groups/getGroups', async () => {
//    try {
//       const group_url = '/group/get-groupData';
//       let res = await api.get(group_url);
//       // console.log(res.data);
//       return res.data;
//    } catch (error) {
//       console.log(error.response);
//       return error.response;
//    }
// });

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGroups.fulfilled, (state, action) => {
      state.isLoading = false;
      state.groups = action?.payload?.resp;
      state.error = "";
    });
    builder.addCase(getGroups.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getGroups.rejected, (state, action) => {
      state.isLoading = false;
      state.groups = [];
      state.error = action.error.message;
    });
    builder.addCase(addGroup.fulfilled, (state, action) => {
      // console.log(action.payload.data);
    });
    builder.addCase(addGroup.rejected, (state, action) => {
      state.error = action.payload.data;
    });
    builder.addCase(addDevelopers.fulfilled, (state, action) => {
      // console.log(action.payload);
    });
    builder.addCase(removeDeveloper.fulfilled, (state, action) => {
      // console.log(action?.payload);
    });
  },
});

export const GroupsReducer = groupsSlice.reducer;
