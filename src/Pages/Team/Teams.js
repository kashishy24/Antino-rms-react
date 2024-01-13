import React, { useEffect, useMemo, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Grid,
  TextField,
  Box,
  Typography,
  useTheme,
  DialogTitle,
  Dialog,
  Divider,
  DialogContent,
  Autocomplete,
  Tooltip,
  MenuItem,
} from "@mui/material";
import "../../Assets/CSS/Developer/Developer.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import FilterSchema from "../Auth/Register/FilterSchema";
import { makeStyles } from "@mui/styles";
import { getTeams } from "../../Redux/Slices/Teams/TeamSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { assignGroup, unassignGroup, removeTeam } from "../../apis/TeamsApi";
import LoadingSpinner from "../../utils/LoadingSpinner";
import ConfirmationDialog from "../../utils/ConfirmationDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import { getGroups } from "../../Redux/Slices/Lists/ListsSlice";
import { toast } from "react-toastify";
import CreateEditTeam from "./component/CreateEditTeam";
import AssignGroup from "./component/AssignGroup";
import UnassignGroup from "./component/UnassignGroup";

const Teams = () => {
  const theme = useTheme();

  const [dataPerPage, setDataPerPage] = useState(10);
  const [openCreateTeam, setOpenCreateTeam] = useState(false);
  const [openAssignGroup, setOpenAssignGroup] = useState(false);
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [gpid,setGpid]=useState();
  const [gpName,setGpname]=useState();
  const useStyles = makeStyles((theme) => ({
    filterField: {
      backgroundColor: "white",
      width: "200px",
    },
    primaryBtn: {
      padding: "0px !important",
      "& button": {
        color: "white !important",
      },
    },
  }));

  const classes = useStyles();

  const query = "api/v2/users/search";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openUnassignGroup, setOpenUnassignGroup] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [status, setStatus] = useState(false);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FilterSchema),
  });

  const { loading, teams, message } = useSelector((store) => store.team);
  // const { data } = useSelector((store) => store.regDev);

  useEffect(() => {
    dispatch(getTeams());
  }, []);

  const columns = [
    {
      field: "actionEdit",
      headerName: "",
      sortable: false,
      align: "center",
      headerAlign: "center",
      width: "70",
      hide: status,
      renderCell: (params) => {
        const editHandler = () => {
          console.log(params,"grupnamemmmmmm");
          setUser(params?.row);
          setOpenCreateTeam(true);
        };
        return (
          <Button
            onClick={editHandler}
            style={{
              backgroundColor: "rgba(128, 128, 128, 0.4)",
              marginRight: "3px",
              padding: "0px 3px",
              fontSize: "12px",
              minWidth: "45px",
            }}
            disabled={params?.row?.isDeleted}
          >
            <EditIcon />
          </Button>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      headerAlign: "center",
      width: 160,
      flex: status ? 1 : "",
      // align: "center",
      // textAlign: "left",
      // renderCell: (param) => (
      //   <Tooltip title={param.value} placement="right" arrow>
      //     <span
      //       style={{
      //         textOverflow: "ellipsis",
      //         whiteSpace: "nowrap",
      //         overflow: "hidden",
      //         cursor: "context-menu",
      //       }}
      //     >
      //       {param.value}
      //     </span>
      //   </Tooltip>
      // ),
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      width: 150,
      flex: status ? 1 : "",
      renderCell: (param) => (
        <Tooltip title={param.value} placement="right" arrow>
          <span
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              cursor: "context-menu",
            }}
          >
            {param.value}
          </span>
        </Tooltip>
      ),
    },
    {
      field: "designationName",
      headerName: "Designation",
      headerAlign: "center",
      flex: status ? 1 : "",
      width: 160,
      align : "center",
      renderCell: (param) => (
        <Tooltip title={param.value} placement="right" arrow>
          <span
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              cursor: "context-menu",
            }}
          >
            {param.value}
          </span>
        </Tooltip>
      ),
    },
    {
      field: "group",
      headerName: "Group",
      headerAlign: "center",
      flex: status ? 1 : "",
      width: 160,
      renderCell: (params) => {
        console.log(params,"paramaparams")
        let groupName = params.formattedValue;
        if (Array.isArray(groupName)) {
          groupName = params?.formattedValue
            ?.map((item) => item.groupName)
            .join(", ");
        }
        return (
          <Tooltip title={groupName} placement="right" arrow>
            <span
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                cursor: "context-menu",
              }}
            >
              {groupName}
            </span>
          </Tooltip>
        );
      },
    },
    {
      field: "groupActions",
      headerName: "Group Actions",
      sortable: false,
      headerAlign: "center",
      width: 170,
      align: "center",
      hide: status,
      renderCell: (params) => {
        return (
          <>
            <Button
              sx={{
                background: "rgba(128, 128, 128, 0.4)",
                fontSize: "12px",
                padding: "0.25rem 0.5rem",
              }}
              onClick={() => {
                setUserId(params?.id);
                setOpenAssignGroup(true);
              }}
            >
              Assign
            </Button>
            <Button
              sx={{
                marginLeft: "8px",
                background: "rgba(128, 128, 128, 0.4)",
                fontSize: "12px",
                padding: "0.25rem 0.5rem",
              }}
              onClick={() => {
                if(params?.row?.group !== "N/A"){     
                  setOpenUnassignGroup(true);
                  setGpid(params?.row?.group[0]?._id);
                  setGpname(params?.row?.group);
                  setUser(params?.row);
                }
              }}
            >
              Unassign
            </Button>
          </>
        );
      },
    },
    {
      field: "actionDelete",
      headerName: "",
      sortable: false,
      headerAlign: "center",
      align: "center",
      width: "70",
      hide: status,
      renderCell: (params) => {
        const deleteHandler = () => {
          setOpenRemoveDialog(true);
          setConfirmMessage("Are you sure you want to remove ?");
          setIsSuccess(false);
          setUser(params?.row);
        };
        return (
          <Button
            onClick={deleteHandler}
            style={{
              backgroundColor: "rgba(128, 128, 128, 0.4)",
              marginRight: "3px",
              padding: "0px 3px",
              fontSize: "12px",
              minWidth: "45px",
            }}
          >
            <DeleteIcon />
          </Button>
        );
      },
    },
  ];

  const rows = teams
    ?.filter((user) => user.isDeleted === status)
    ?.map((user) => {
      return {
        id: user?._id,
        email: user?.email,
        name: user?.lastName ? user?.fullName :  user?.fullName ,
        designationName: user?.role,
        designation: user?.designation,
        group: user?.groupDetails?.length === 0 ? "N/A" : user?.groupDetails,
        // group: ["hardCoded"],
      };
    });

  const handleCloseCreateTeamDialog = () => {
    setOpenCreateTeam(false);
  };

  const handleCloseAssignGroupDialog = () => {
    setOpenAssignGroup(false);
  };

  // const handleCloseConfirmDialog = () => {
  //   setOpenConfirmDialog(false);
  // };

  const handleCloseRemoveDialog = () => {
    setOpenRemoveDialog(false);
  };

  const handleCloseUnassignGroup = () => {
    setOpenUnassignGroup(false);
  };

  const handleRemoveMember = () => {
    const obj = {
      id: user?.id,
    };
    console.log(obj);
    removeTeam(obj)
      .then((res) => {
        toast("Member deleted successfully");
        dispatch(getTeams());
        setIsSuccess(true);
      })
      .catch((error) => {
        console.log(error);
        toast(error.msg);
      });
  };

  // const handleUnassignGroup = () => {
  //   const obj = {
  //     group_id: user?.group?._id,
  //     user_id: user?.id,
  //   };
  //   unassignGroup(obj)
  //     .then((res) => {
  //       toast("Group unassigned successfully");
  //       dispatch(getTeams());
  //       setIsSuccess(true);
  //     })
  //     .catch((error) => toast(error));
  // };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Box sx={{ height: "90vh" }}>
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
                size="small"
                className={classes.filterField}
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
                <MenuItem key="Active" value={false}>
                  Active
                </MenuItem>
                <MenuItem key="Inactive" value={true}>
                  Deleted
                  
                </MenuItem>
              </TextField>
              {/* <SearchIcon
              onClick={handleSearch}
              sx={{
                cursor: "pointer",
              }}
            /> */}
            </Box>
            <Box>
              <Button
                variant="contained"
                sx={{
                  color: "white",
                }}
                onClick={() => {
                  setUser(null);
                  setOpenCreateTeam(true);
                }}
              >
                Add Team Member
              </Button>
            </Box>
          </Box>

          <div style={{ height: "85%", width: "100%" }}>
            <DataGrid
              rows={rows}
              rowHeight={40}
              columns={columns}
              pageSize={dataPerPage}
              onPageSizeChange={(value) => setDataPerPage(value)}
              rowsPerPageOptions={[10, 25, 50, 100]}
              // disableSelectionOnClick
              pagination
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
                    columnField: "name",
                    operatorValue: "contains",
                    value: `${name}`,
                  },
                ],
              }}
              // components={{ Pagination: CustomPagination }}
              // initialState={{
              //   sorting: {
              //     sortModel: [{field:"Deleted"  }],
              //   },
              // }}
            />
          </div>
          {openCreateTeam && (
            <CreateEditTeam
              open={openCreateTeam}
              onClose={handleCloseCreateTeamDialog}
              user={user}
            />
          )}
          {openAssignGroup && (
            <AssignGroup
              open={openAssignGroup}
              userId={userId}
              onClose={handleCloseAssignGroupDialog}
            />
          )}
          {openUnassignGroup && (


            <UnassignGroup
              open={openUnassignGroup}
              onClose={handleCloseUnassignGroup}
              groupData={user}
              gpName={gpName}
              gpid={gpid}
            />
          )}
          {/* {openConfirmDialog && (
            <ConfirmationDialog
              open={openConfirmDialog}
              message={confirmMessage}
              onClose={handleCloseConfirmDialog}
              onConfirm={handleUnassignGroup}
              isSuccess={isSuccess}
              // user={user}
            />
          )} */}
          {openRemoveDialog && (
            <ConfirmationDialog
              open={openRemoveDialog}
              message={confirmMessage}
              onClose={handleCloseRemoveDialog}
              onConfirm={handleRemoveMember}
              isSuccess={isSuccess}
              // user={user}
            />
          )}
        </Box>
      )}
    </>
  );
};

export default Teams;
