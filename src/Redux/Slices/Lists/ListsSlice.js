import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../apiclient";

const initialState = {
  isLoading: false,
  error: "",
  developers: [],
  newdevelopers: [],
  // developersCount: 0,
  newdevelopersCount: 0,
  developersProject:[],
  projects: [],
  projectManagers: [],  
  techStacks: [],
  designations: [],
  teamDesignations: [],
  totalDevelopers: [],
  groups: [],
  dataPerPage: 10,
  totalCount: 0,
  currentPage: 0,
};
export const getDevelopers = createAsyncThunk(
  "lists/developers",
  async (data, thunkAPI) => {
    const { dataPerPage, currentPage } = thunkAPI.getState().lists;
    console.log(dataPerPage, "checkigdataperpage");
    try {
      let res = await api.get(
        `api/v2/users/search?limit=${dataPerPage}&page=${currentPage}`,
        {}
      );
      //main api for dashboard
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const getDevelopersProject = createAsyncThunk(
  "lists/getDevelopersProject",
  async (totalDevelopers) => {
    console.log("devvvvvvv",totalDevelopers)
    try {
      let res = await api.get(
        `api/v2/users/list?limit=${totalDevelopers.availableCount}&page=0`,
        {}
      );
      //main api for dashboard
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const getnewDevelopers = createAsyncThunk(
  "lists/newdevelopers",
  async () => {
    try {
      let res = await api.get(`api/v2/users/getDashboardData`, {});
      //main api for dashboard
      console.log("developer>>>>>", res);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const getProjects = createAsyncThunk("lists/projects", async () => {
  // const designation = localStorage.getItem("designation");
  const designation = "AVP";
  // const user_id = localStorage.getItem("user_id");
  const user_id = "10sfffsa01";
  const projects_url = `/api/v2/projects/viewall?user_id=${user_id}&designation=${designation}`;
  try {
    let res = await api.get(projects_url);
    // console.log('>>>>>>>>>>>>>>?',res);
    console.log(res.data.data.data, "2222");
    return res.data;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
});

export const getAllProjectManagers = createAsyncThunk(
  "lists/projectManagers",
  async (projectManagerId) => {
    const projectManager_url = `api/v2/users/search?role=PM`;
    try {
      const res = await api.get(projectManager_url, {
        designation: projectManagerId,
      });
      // console.log("getMemberByDesignation",res.data)
      return res?.data;
    } catch (error) {
      console.log(error);
      // return error?.response
    }
  }
);

export const getTechStacks = createAsyncThunk(
  "lists/getTechStacks",
  async () => {
    const techStack_url = "/techStack/getAll";
    try {
      let res = await api.get(techStack_url);
      return res?.data;
    } catch (error) {
      // console.log(error.response);
      return error.response;
    }
  }
);

export const getDesignations = createAsyncThunk(
  "lists/getDesignations",
  async () => {
    const designation_url = "/devDesignation/getAllDesignation";
    try {
      let res = await api.get(designation_url);
      // console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error.response);
      // return error.response;
    }
  }
);

// export const getTeamDesignations = createAsyncThunk(
//   "lists/getTeamDesignations",
//   async () => {
//     const designation_url = "/designation/getAllDesignation";
//     try {
//       let res = await api.get(designation_url);
//       // console.log(res.data);
//       return res.data;
//     } catch (error) {
//       console.log(error.response);
//       // return error.response;
//     }
//   }
// );
export const getTotalDevelopers = createAsyncThunk(
  "lists/getTotalDevelopers",
  async () => {
    try {
      let res = await api.get("/api/v2/users/getDashboardData");
      return res.data;
    } catch (error) {
      return error.res;
    }
  }
);
export const getGroups = createAsyncThunk("lists/getGroups", async () => {
  try {
    const group_url = `api/v2/group/viewall?isDelete=${false}`;
    let res = await api.get(group_url);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error.response);
    // return error.response;
  }
});

const ListsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setDataPerPage(state, action) {
      state.dataPerPage = action.payload;
      console.log("dataper", state.dataPerPage);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDevelopers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.developers = action?.payload?.data;
      console.log("develist", state.developers);
      state.totalCount = action?.payload?.count;
      state.error = "";
    });
    builder.addCase(getDevelopers.pending, (state, action) => {
      state.developers = [];
      state.isLoading = true;
    });
    builder.addCase(getDevelopers.rejected, (state, action) => {
      state.isLoading = false;
      state.developers = [];
      state.error = action.error.message;
    });

    builder.addCase(getDevelopersProject.fulfilled, (state, action) => {
      state.isLoading = false;
      state.developersProject = action?.payload?.data;
      console.log("develist", state.developersProject);
      state.totalCount = action?.payload?.count;
      state.error = "";
    });
    builder.addCase(getDevelopersProject.pending, (state, action) => {
      state.developersProject = [];
      state.isLoading = true;
    });
    builder.addCase(getDevelopersProject.rejected, (state, action) => {
      state.isLoading = false;
      state.developersProject = [];
      state.error = action.error.message;
    });

    builder.addCase(getnewDevelopers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newdevelopers = action?.payload?.data;
      console.log("develist", state.newdevelopers);
      state.newdevelopersCount = action?.payload?.count;
      state.error = "";
    });
    builder.addCase(getnewDevelopers.pending, (state, action) => {
      state.newdevelopers = [];
      state.isLoading = true;
    });
    builder.addCase(getnewDevelopers.rejected, (state, action) => {
      state.isLoading = false;
      state.newdevelopers = [];
      state.error = action.error.message;
    });

    builder.addCase(getProjects.fulfilled, (state, action) => {
      console.log(action.payload, "111111111111111");
      state.isLoading = false;
      state.projects = action.payload?.data;
      state.error = "";
    });
    builder.addCase(getProjects.pending, (state, action) => {
      state.projects = [];
      state.isLoading = true;
    });
    builder.addCase(getProjects.rejected, (state, action) => {
      state.isLoading = false;
      state.projects = [];
      state.error = action.error.message;
    });

    builder.addCase(getAllProjectManagers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.projectManagers = action?.payload?.data;
      state.error = "";
    });
    builder.addCase(getAllProjectManagers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllProjectManagers.rejected, (state, action) => {
      state.isLoading = false;
      state.projectManagers = [];
      state.error = action.error.message;
    });
    builder.addCase(getTechStacks.fulfilled, (state, action) => {
      // console.log(action.payload.data);
      state.isLoading = false;
      state.techStacks = action?.payload?.data;
      state.error = "";
    });
    builder.addCase(getTechStacks.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getTechStacks.rejected, (state, action) => {
      state.isLoading = false;
      state.techStacks = [];
      state.error = action.error.message;
    });
    builder.addCase(getDesignations.fulfilled, (state, action) => {
      // console.log(action.payload.data);
      state.isLoading = false;
      state.designations = action?.payload?.data;
      state.error = "";
    });
    builder.addCase(getDesignations.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getDesignations.rejected, (state, action) => {
      state.isLoading = false;
      state.designations = [];
      state.error = action.error.message;
    });
    builder.addCase(getTotalDevelopers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.totalDevelopers = action?.payload.data;
      state.error = "";
    });
    builder.addCase(getTotalDevelopers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getTotalDevelopers.rejected, (state, action) => {
      state.isLoading = false;
      state.totalDevelopers = [];
      state.error = action.error.message;
    });
    builder.addCase(getGroups.fulfilled, (state, action) => {
      // console.log(action.payload.data);
      state.isLoading = false;
      state.groups = action?.payload?.resp;
      console.log(action?.payload?.resp, "masummmm");
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
  },
});

export const { setCurrentPage, setDataPerPage } = ListsSlice.actions;
export default ListsSlice.reducer;
