import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { BASE_URL } from "../../constant";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  LinearProgress,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import "../../Assets/CSS/Project/Project.css";
import { useEffect } from "react";
import {
  assignProjectManager,
  getDeveloper,
  GetProjects,
} from "../../apis/ProjectApi";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateProject from "./Components/CreateProject";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjects,
  removeDeveloper,
  searchProject,
} from "../../Redux/Slices/Project/ProjectsSlice";
import { get_user } from "../../Redux/Slices/Auth/RegDevSlice";
// import { getDeveloper } from "../apis/ProjectApi";
import EditProject from "./Components/EditProject";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../utils/CustomPagination";
import { setCurrentPage } from "../../Redux/Slices/Project/ProjectsSlice";
import OnboardDialog from "./Components/OnboardDialog";
import DeboardDialog from "./Components/DeboardDialog";
import { useFormik } from "formik";
import { getAllDesignation } from "../../Redux/Slices/DesignationSlice";
import moment from "moment";
import { getAllProjectManagers,getTotalDevelopers } from "../../Redux/Slices/Lists/ListsSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from "@mui/styles";
import LoadingSpinner from "../../utils/LoadingSpinner";
import Developer from "../Developer/Developer";
import DeveloperModal from "../../utils/DeveloperModal";
import { getDevelopers } from "../../Redux/Slices/Lists/ListsSlice";

// toast.configure()
const AssignPmDialog = ({ open, onClose, projectId }) => {
  const { dataPerPage, currentPage } = useSelector((state) => state?.project);
  const { developers, projectManagers } = useSelector((state) => state?.lists);

  const formik = useFormik({
    initialValues: {
      projectId: "",
      userId: "",
    },
    onSubmit: (values) => {
      if (values.userId === "") {
        toast("Please select project manager");
      } else {
        assignProjectManager(values)
          .then((res) => {
            toast(res?.message);
            dispatch(getProjects());
            onClose();
          })
          .catch((err) => toast(err?.response?.data?.message));
      }
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    formik.setFieldValue("projectId", projectId);
    // formik.setFieldValue("projectId", projectId);

    // dispatch(getAllDesignation());
  }, [projectId]);
  const projectManagerId = useSelector((store) => {
    return store?.designation?.designations?.filter(
      (item) => item?.name === "PM"
    )[0]?._id;
  });
  useEffect(() => {
    dispatch(getAllProjectManagers(projectManagerId));
    dispatch(getTotalDevelopers())
  }, [projectManagerId]);
  // console.log("assPM",projectManagerId)

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Dialog open={open} onClose={onClose}>
          <DialogTitle>
            <Box
              sx={{
                display: "flex",
                width: "300px",
                justifyContent: "space-between",
              }}
            >
              <Typography>Assign project manager</Typography>
              <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box mt={1} mb={2}>
              <Autocomplete
                options={projectManagers || []}
                getOptionLabel={(option) =>
                  option?.isDeleted ? "" : `${option?.fullName}`
                }
                onChange={(event, value) =>
                  formik.setFieldValue("userId", value?._id)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    sx={{
                      minWidth: "200px  !important",
                    }}
                    value={developers?.name}
                    name="projectManager"
                    label="Project Managers"
                  />
                )}
              />
            </Box>

            <Box
              sx={{
                marginTop: "2rem !important",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Button onClick={formik.handleSubmit} variant="contained">
                Submit
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </form>
    </>
  );
};

const Projects = () => {
  const { projects, dataPerPage, currentPage, totalCount, error, isLoading } =
    useSelector((state) => state?.project);
  const [pageSize, setPageSize] = useState(10);
  const [status, setStatus] = useState("Active");

  const useStyles = makeStyles({
    filterField: {
      backgroundColor: "white",
      width: "200px",
    },
  });

  const classes = useStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openCreateProject, setOpenCreateProject] = useState(false);
  const [openEditProject, setOpenEditProject] = useState(false);
  const [openOnboardProjectDialog, setOpenOnboardProjectDialog] =
    useState(false);
  const [openRemoveDeveloperDialog, setOpenRemoveDeveloperDialog] =
    useState(false);
  const [openDeveloperModal, setOpenDeveloperModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState("");
  const [project, setProject] = useState();
  const [developerList, setDeveloperList] = useState([]);
  const [developerData, setDeveloperData] = useState([]);
  const [pms, setPms] = useState([]);
  const [isDeveloper, setIsDeveloper] = useState(null);

  const role = localStorage.getItem("designation");

  // useEffect(() => {
  //   dispatch(getProjects({ dataPerPage, currentPage }));
  //   dispatch(getAllDesignation());
  // }, [currentPage]);

  useEffect(() => {
    dispatch(getProjects());
  }, []);
  useEffect(() => {
    if (status !== "") {
      dispatch(getProjects(status));
    }
  }, [status]);

  const handleSearch = () => {
    // dispatch(setCurrentPageS(1));
    // dispatch(searchProject({ dataPerPage, currentPage, searchField }));
    // rows = rows.filter(item => item.projectName.includes(searchField))
  };

  const findDeveloper = async (id) => {
    try {
      const res = await getDeveloper(id);
      if (res) {
        setDeveloperData(res.data.developers);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const columns = [
    {
      field: "action",
      headerName: "",
      sortable: false,
      width: 60,
      headerAlign: "center",
      hide: role !== "PM" ? false : true,
      align: "center",
      renderCell: (params) => {
        const editHandler = async (e) => {
          e.stopPropagation(); // don't select this row after clicking
          // const api = params.api;
          // const thisRow = {};
          // api
          // .getAllColumns()
          // .filter((c) => c.field !== "__check__" && !!c)
          // .forEach(
          //   (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          //   );
          // await dispatch(get_user(params.row.objId));
          // navigate("Edit-developer");
          setProjectId(params?.row?.key);
          setProject(params?.row);
          setOpenEditProject(true);
          // console.log("project id ",projectId)

          // console.log(params?.row,">>>>>>>>>>>?????????????????");
        };
        // const deleteHandler = (e) => {
        // console.log(params.row.key);
        // deleteProject(params.row.key).then(() => {
        //   dispatch(getProjects());
        // });
        // deleteQuery = deleteQuery + params.row.objId;
        // dispatch(delete_user({ deleteQuery, dataPerPage, currentPage }));
        // };
        return (
          <div>
            <Button
              onClick={editHandler}
              style={{
                backgroundColor: " rgba(128, 128, 128, 0.4)",
                marginRight: "3px",
                padding: "1px 3px",
                fontSize: "12px",
                minWidth: "45px",
              }}
              disabled={params?.row?.isDeleted}
            >
              <EditIcon />
            </Button>
            {/* <Button
              onClick={deleteHandler}
              style={{
                backgroundColor: " #fffde7",
                // color: "black",
                padding: "0px 3px",
                fontSize: "12px",
                minWidth: "45px",
              }}
              disabled={params.row.isDeleted}
            >
              <DeleteIcon />
            </Button> */}
          </div>
        );
      },
    },
    { field: "projectName", headerName: "Project name", width: 150 },
    {
      field: "projectManager",
      headerName: "Project manager",
      width: 150,
      // renderCell: (params) =>
      // (
      //   <Typography variant="p">
      //     {params?.row?.pm?.firstName ? params?.row?.pm?.firstName : "N/A"}
      //   </Typography>
      // ),
      renderCell: (params) => {
        const projectManagers =
          params?.formattedValue?.length === 0
            ? "N/A"
            : params?.formattedValue
                ?.map((item) =>
                  item?.lastName ? item?.fullName : item?.fullName
                )
                .join(", ");
        return (
          <Tooltip title={projectManagers} placement="right" arrow>
            <span
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                cursor: "context-menu",
              }}
            >
              {projectManagers}
            </span>
          </Tooltip>
        );
      },
    },
    {
      field: "developers",
      headerName: "Developers",
      align: "center",
      headerAlign: "center",
      width: 125,
      // renderCell: (params) => (
      //   <Tooltip title={params.value} placement="right" arrow>
      //     <span
      //       style={{
      //         textOverflow: "ellipsis",
      //         whiteSpace: "nowrap",
      //         overflow: "hidden",
      //         cursor: "context-menu",
      //       }}
      //     >
      //       {params.value}
      //     </span>
      //   </Tooltip>
      // ),
      renderCell: (params) => {
        // console.log(params?.formattedValue);
        // params?.formattedValue?.map((item) => {
        //   data += `${item?.firstName} ${item?.lastName}, `;
        // });
        // setDeveloperList(para,s)
        // console.log(params?.formattedValue);
        return params?.formattedValue?.length ? (
          <div
            style={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            <Button
              onClick={() => {
                setProjectId(params?.row?.key);
                findDeveloper(params?.row?.key);
                setPms(params.row.projectManager);
                setOpenDeveloperModal(true);
              }}
            >
              {params?.formattedValue?.length}
            </Button>
          </div>
        ) : (
          <Typography component="p" sx={{ cursor: "context-menu" }}>
            {params?.formattedValue?.length}
          </Typography>
        );
      },
    },
    {
      field: "clientName",
      headerName: "Client name",
      width: 125,
      renderCell: (params) => {
        const clientName =
          params?.row?.clientName === "" ? "N/A" : params?.row?.clientName;
        return (
          <Tooltip title={clientName} placement="right" arrow>
            <span
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                cursor: "context-menu",
              }}
            >
              {clientName}
            </span>
          </Tooltip>
        );
      },
    },
    { field: "status", headerName: "Status", width: 125 },
    {
      field: "techStack",
      headerName: "Tech stack",
      width: 125,
      renderCell: (params) => {
        const techstackName =
          params?.formattedValue?.length === 0
            ? "N/A"
            : params?.formattedValue?.map((item) => item?.name).join(",");
        return (
          <Tooltip title={techstackName} placement="right" arrow>
            <span
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                cursor: "context-menu",
              }}
            >
              {techstackName}
            </span>
          </Tooltip>
        );
      },
    },
    {
      field: "typeOfProject",
      headerName: "Project type",
      width: 125,
      renderCell: (params) => (
        <Tooltip title={params.value} placement="right" arrow>
          <span
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              cursor: "context-menu",
            }}
          >
            {params.value}
          </span>
        </Tooltip>
      ),
    },
    {
      field: "startDate",
      headerName: "Start date",
      width: 125,
      renderCell: (params) => {
        console.log(params, "startdate");
        const startDate = params.value === "" ? "N/A" : params.value;
        return (
          <Tooltip title={params.value} placement="right" arrow>
            <span
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                cursor: "context-menu",
              }}
            >
              {startDate}
            </span>
          </Tooltip>
        );
      },
    },
    {
      field: "estimatedEndDate",
      headerName: "Estimated end date",
      width: 125,
      renderCell: (params) => {
        const estimatedEndDate = params.value === "" ? "N/A" : params.value;
        return (
          <Tooltip title={params.value} placement="right" arrow>
            <span
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                cursor: "context-menu",
              }}
            >
              {estimatedEndDate}
            </span>
          </Tooltip>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      width: 125,
      renderCell: (params) => (
        <Tooltip title={params.value} placement="right" arrow>
          <span
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              cursor: "context-menu",
            }}
          >
            {params.value}
          </span>
        </Tooltip>
      ),
    },
    {
      field: "actions",
      headerName: "Developer Actions",
      headerAlign: "center",
      sortable: false,
      align: "center",
      width: 125,
      // width: role === "TL" ? 210 : 150,
      renderCell: (params) => {
        const onBoardHandler = async (e) => {
          e.stopPropagation();
          // console.log("hello i m onboarding")
          setProjectId(params?.row?.key);
          setIsDeveloper(true);
          setOpenOnboardProjectDialog(true);
          // await dispatch(get_user(params.row.objId));
          // navigate("Edit-developer");
        };
        // const offboardHandler = async (e) => {
        //   e.stopPropagation();
        //   setProjectId(params?.row?.key);
        //   setDeveloperList(params?.row?.arrayOfDevelopers);
        //   setOpenRemoveDeveloperDialog(true);
        // };
        return (
          <div>
            <Button
              onClick={onBoardHandler}
              style={{
                backgroundColor: "rgba(128, 128, 128, 0.4)",
                marginRight: "6px",
                padding: "6px",
                fontSize: "10px",
                minWidth: "45px",
              }}
              disabled={params.row.isDeleted}
            >
              Onboard
            </Button>
            {/* <Button
              onClick={offboardHandler}
              style={{
                backgroundColor: "rgba(128, 128, 128, 0.4)",
                marginRight: "6px",
                padding: "6px",
                fontSize: "10px",
                minWidth: "45px",
              }}
              disabled={params.row.isDeleted}
            >
              Offboard
            </Button> */}
            {/* {role !== "PM" && (
              <Button
                onClick={assignPMHandler}
                style={{
                  backgroundColor: "rgba(128, 128, 128, 0.4)",
                  marginRight: "3px",
                  padding: "6px",
                  fontSize: "10px",
                  minWidth: "45px",
                }}
                disabled={params.row.isDeleted}
              >
                Assign PM
              </Button>
            )} */}
          </div>
        );
      },
    },
    {
      field: "pmAction",
      headerName: "",
      headerAlign: "center",
      sortable: false,
      align: "center",
      hide: role !== "PM" ? false : true,
      width: 80,
      renderCell: (params) => {
        const assignPMHandler = async (e) => {
          e.stopPropagation();
          setProjectId(params?.row?.key);
          setIsDeveloper(false);
          setOpenOnboardProjectDialog(true);
        };
        return (
          <div>
            <Button
              onClick={assignPMHandler}
              style={{
                backgroundColor: "rgba(128, 128, 128, 0.4)",
                marginRight: "3px",
                padding: "6px",
                fontSize: "10px",
                minWidth: "45px",
              }}
            >
              Assign PM
            </Button>
          </div>
        );
      },
    },
  ];

  const rows = projects?.map((item) => {
    return {
      key: item.projects?._id,
      // projectManager: item?.pm[0]?.firstName + " " + item?.pm[0]?.lastName,
      projectManager: item?.pm,
      projectName: item.projects?.projectName,
      // developers: project?.developers,
      // developers:
      //   project?.developers?.length === 0
      //     ? "N/A"
      //     : project?.developers
      //         ?.map(
      //           (developer) =>
      //             `${developer?.firstName} ${developer?.lastName}`
      //         )
      //         .join(","),
      developers: item?.developers,
      arrayOfDevelopers: item?.developers,
      clientName: item?.projects?.clientName,
      status: item?.projects?.status,
      techStack: item?.projects?.techStack,
      typeOfProject: item?.projects?.typeOfProject,
      startDate: item?.projects?.startDate,
      estimatedEndDate: item?.projects?.estimatedEndDate,
      internalMeetingDaysAndTimings: item?.internalMeetingDaysAndTimings,
      clientMeetingDaysAndTimings: item?.clientMeetingDaysAndTimings,
      description: item?.projects?.description
        ? item?.projects?.description
        : "N/A",
    };
  });

  // const handleOpenAddProjectDialog = () => {
  //   setOpenCreateProject(true);
  // };

  const handleCloseAddProjectDialog = () => {
    setOpenCreateProject(false);
  };

  const handleCloseEditProjectDialog = () => {
    setOpenEditProject(false);
  };

  const handleCloseDeveloperModal = () => {
    setOpenDeveloperModal(false);
  };

  // const handleCloseOnboardDialog = () => {
  //   setOpenOnboardProjectDialog(false);
  // };

  const handlePageChange = (value) => {
    // console.log(value);
    dispatch(setCurrentPage(value));
  };

  // const handleRowClick = (project) => {
  //   console.log(project);
  //   // navigate(`/dashboard/project/${project.id}`);
  // };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <Box
        sx={{
          height: "90vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1rem",
            marginBottom: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <TextField
              id="outlined-required"
              select
              className={classes.filterField}
              sx={{ width: "100px !important" }}
              label="Status"
              defaultValue={status}
              type={"text"}
              name="Status"
              size="small"
              onChange={(event) => {
                setStatus(event.target.value);
              }}
            >
              <MenuItem key="Active" value="Active">
                Active
              </MenuItem>
              <MenuItem key="Inactive" value="Inactive">
                Inactive
              </MenuItem>
            </TextField>
            <TextField
              size="small"
              className={classes.filterField}
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              autoComplete={"off"}
            />
          </Box>

          {/* <SearchIcon
              onClick={handleSearch}
              sx={{
                cursor: "pointer",
              }}
            /> */}

          {role !== "PM" && (
            <Box>
              {/* <Button
                component='label'
                variant="contained"
                sx={{
                  color: "white",
                  marginRight: "8px",
                }}
              >
                Bulk Upload
              <input hidden type="file" accept=".csv"/> */}
              {/* </Button> */}
              <Button
                variant="contained"
                sx={{
                  color: "white",
                }}
                onClick={() => setOpenCreateProject(true)}
              >
                Add Project
              </Button>
            </Box>
          )}
        </Box>
        <Box sx={{ width: "100%", height: "85%" }}>
          <DataGrid
            rows={rows}
            getRowId={(row) => row?.key}
            columns={columns}
            pageSize={pageSize}
            rowHeight={40}
            pagination
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 25, 50, 100]}
            // onRowClick={handleRowClick}
            // paginatio
            // disableSelectionOnClick
            // checkboxSelection
            // components={{ Toolbar: CustomToolbar }}
            experimentalFeatures={{ newEditingApi: true }}
            // components={{
            //   Pagination: CustomPagination,
            // }}
            disableColumnMenu
            disableColumnFilter
            sx={{
              backgroundColor: "white",
              "& .MuiDataGrid-columnHeaders": {
                // fontSize: "1rem",
                background: "black",
                color: "white",
              },
              "& .MuiDataGrid-sortIcon": {
                color: "white",
              },
              "& 	.MuiDataGrid-menuIconButton": {
                color: "white",
              },
              "& 	.MuiDataGrid-filterIcon": {
                color: "white",
              },
            }}
            filterModel={{
              items: [
                {
                  columnField: "projectName",
                  operatorValue: "contains",
                  value: `${projectName}`,
                },
              ],
            }}
            componentsProps={{
              // pagination: {
              //   totalCount: totalCount,
              //   currentPage: currentPage,
              //   dataPerPage: dataPerPage,
              //   handlePageChange: handlePageChange,
              // },
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
        </Box>
        {openCreateProject && (
          <CreateProject
            open={openCreateProject}
            onClose={handleCloseAddProjectDialog}
          />
        )}
        <DeboardDialog
          open={openRemoveDeveloperDialog}
          onClose={() => setOpenRemoveDeveloperDialog(false)}
          developers={developerList}
          projectId={projectId}
        />
        {isDeveloper ? (
          <OnboardDialog
            open={openOnboardProjectDialog}
            onClose={() => setOpenOnboardProjectDialog(false)}
            projectId={projectId}
          />
        ) : (
          <AssignPmDialog
            open={openOnboardProjectDialog}
            onClose={() => setOpenOnboardProjectDialog(false)}
            projectId={projectId}
          />
        )}
        {openEditProject && (
          <EditProject
            open={openEditProject}
            id={projectId}
            project={project}
            onClose={handleCloseEditProjectDialog}
          />
        )}
        {openDeveloperModal && (
          <DeveloperModal
            open={openDeveloperModal}
            onClose={handleCloseDeveloperModal}
            data={developerData}
            pms={pms}
            id={projectId}
            removeDeveloper={removeDeveloper}
            fetchAgain={getProjects}
          />
        )}
      </Box>
    </>
  );
};
export default Projects;
