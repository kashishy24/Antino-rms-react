import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import api from "../../apiclient"
import { toast } from "react-toastify"

const initialState = {
  isLoading: false,
  users: [],
  searchFilters: {},
  msg: "",
  status: "",
  totalExport: [],
  totalExport: 0,
  totalExportPage: 0,
  dataPerPage: 10,
  totalCount: 0,
  currentPage: 0,
  searching: false,
  // searchedUser: [],
}
export const get_users = createAsyncThunk(
  "getUsers/get_users",
  async (data, thunkAPI) => {
    const { dataPerPage, currentPage, searchFilters } =
      thunkAPI.getState().getUsers
    try {
      let res = await api.get(
        `/api/v2/users/search?limit=${dataPerPage}&page=${currentPage}&seniority=${searchFilters.seniority}`,
        {
          // params: {
          //   page: data.currentPage,
          //   limit: data.dataPerPage,
          // },
        }
      )
      console.log(res.data)
      return res.data
    } catch (error) {
      console.log(error.response)
      return error.response
    }
  }
)

export const fetch_users = createAsyncThunk(
  "FetchUsers/get_users",
  async (data, thunkAPI) => {
    const { totalExport, totalExportPage, searchFilters } =
      thunkAPI.getState().getUsers
    try {
      let res = await api.get(
        `/api/v2/users/search?limit=${totalExport}&page=${totalExportPage}&seniority=${searchFilters.seniority}`,
        {
          // params: {
          //   page: data.currentPage,
          //   limit: data.dataPerPage,
          // },
        }
      )
      console.log(res.data)
      return res.data
    } catch (error) {
      console.log(error.response)
      return error.response
    }
  }
)

export const delete_user = createAsyncThunk(
  "getUsers/delete_user",
  async data => {
    try {
      let res = await api.delete(data.deleteQuery)
      // console.log("deletedasyncdata",res.data)
      return res.data
    } catch (error) {
      console.log(error?.response)
      return error?.response
    }
  }
)

export const search_user = createAsyncThunk(
  "api/v2/users/search",
  async data => {
    try {
      let res = await api.get(`${data.url}`, {
        params: data.data,
      })

      return res?.data
    } catch (error) {
      return error.response
    }
  }
)

export const assign_group = createAsyncThunk(
  "getUsers/assign_group",
  async data => {
    const assign_group_url = "/developer/assignGroup"
    try {
      let res = await axios.post(assign_group_url, data)
      // console.log(res.data);
      return res.data
    } catch (error) {
      console.log(error.response)
      return error.response
    }
  }
)

const getUsersSlice = createSlice({
  name: "getUsers",
  initialState,
  reducers: {
    setFilterParameters(state, action) {
      state.searchFilters = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setDataPerPage(state, action) {
      state.dataPerPage = action.payload
    },
    setExportPage(state, action) {
      state.totalExportPage = action.payload
    },
    setExportPerPage(state, action) {
      state.totalExport = action.payload
    },
  },
  extraReducers: {
    [get_users.pending]: state => {
      state.isLoading = true
    },
    [get_users.fulfilled]: (state, action) => {
      console.log("working fine", action.payload)
      // state = action.payload.users ? action.payload.data : action
      state.msg = action.payload.msg
      if (Array.isArray(action.payload.data)) {
        // console.log(action.payload.data);
        state.users = action.payload?.data
      }
      state.isLoading = false
      state.totalCount = action?.payload?.count
      // state.searching = false;
    },
    [get_users.rejected]: state => {
      state.isLoading = false
      // state.status=action.error.status;
    },
    [fetch_users.pending]: state => {
      state.isLoading = true
    },
    [fetch_users.fulfilled]: (state, action) => {
      console.log("working fine", action.payload)
      // state = action.payload.users ? action.payload.data : action
      state.msg = action.payload.msg
      if (Array.isArray(action.payload.data)) {
        // console.log(action.payload.data);
        state.totalExport = action.payload?.data
      }
      state.isLoading = false
      state.totalCount = action?.payload?.count
      toast.success("Export Successfully")
      // state.searching = false;
    },
    [fetch_users.rejected]: state => {
      state.isLoading = false
      // state.status=action.error.status;
    },
    [delete_user.pending]: state => {
      state.isLoading = true
    },
    [delete_user.fulfilled]: (state, action) => {
      state.msg = action.payload.msg
      state.isLoading = false
    },
    [delete_user.rejected]: state => {
      console.log("deleteuerdatat")
      state.isLoading = false
      // state.status=action.error.status;
    },
    [search_user.pending]: state => {
      console.log("deleteuerdatat")
      state.searching = true
      state.users = []
    },
    [search_user.fulfilled]: (state, action) => {
      // console.log(action.payload);
      state.users = action.payload.data
      state.totalCount = action?.payload?.count
      state.isLoading = false
      state.searching = false
    },
    [assign_group.fulfilled]: (state, action) => {},
  },
})

export const { setFilterParameters, setCurrentPage, setDataPerPage,setExportPerPage,setExportPage } =
  getUsersSlice.actions

export default getUsersSlice.reducer
