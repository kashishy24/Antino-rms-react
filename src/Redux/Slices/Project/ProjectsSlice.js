import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../apiclient";

const initialState = {
  isLoading: false,
  error: "",
  projects: [],
  dataPerPage: 1,
  totalCount: 0,
  currentPage: 1,
};

export const getProjects = createAsyncThunk(
  "project/getProjects",
  async (status,thunkAPI) => {
    // const user_id = localStorage.getItem("user_id");
    const designation="AVP"
    const user_id="10sfffsa01";
    // const designation = localStorage.getItem("designation");

    try {
      let res = await api.get(
        `api/v2/projects/viewall`
      ,{
        params:{
          designation:designation,
          user_id:user_id,
          status:status?status:null
        }
      });
      
      return res?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const searchProject = createAsyncThunk(
  "project/searchProject",
  async ({ dataPerPage, currentPage, searchField }, thunkAPI) => {
    try {
      let res = await api.post(`project/api/v1/projects/search`, {
        keyword: searchField,
        // page: currentPage,
        // limit: dataPerPage,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeDeveloper = createAsyncThunk(
  "project/removeDeveloper",
  async (data) => {
    try {
      const remove_url = "api/v2/projects/offboard";
      let res = await api.post(
        // `${remove_url}/${data?.projectId}/${data?.developerId}`
        `${remove_url}`, {
          projectId: data?.projectId,
          userId: data?.developerId,
        }
        
      );
    } catch (error) {
      return error.response;
    }
  }
);

const ProjectsSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setFilterParameters(state, action) {
      state.searchFilters = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.isLoading = false;
      state.projects = action?.payload?.data;
      state.error = "";
      state.totalCount = action?.payload?.count;
    });
    builder.addCase(getProjects.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProjects.rejected, (state, action) => {
      state.isLoading = false;
      state.projects = [];
      state.error = action?.payload?.message;
    });
    builder.addCase(searchProject.rejected, (state, action) => {
      state.isLoading = false;
      state.projects = [];
      state.error = action?.error?.message;
    });
    builder.addCase(searchProject.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(searchProject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.projects = action?.payload?.data;
      state.error = "";
      state.totalCount = action?.payload?.count;
    });
    builder.addCase(removeDeveloper.fulfilled, (state, action) => {
      // console.log(action.payload)
    });
  },
});

export const { setFilterParameters, setCurrentPage } = ProjectsSlice.actions;
export default ProjectsSlice.reducer;
