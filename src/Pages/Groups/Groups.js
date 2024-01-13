import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button, MenuItem, TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import Tooltip from "@mui/material/Tooltip";
import {
  getGroups,
  removeDeveloper,
} from "../../Redux/Slices/Groups/GroupsSlice";
import { useDispatch, useSelector } from "react-redux";
import AddGroup from "./AddGroup";
import { useState } from "react";
import {
  getAllProjectManagers,
  getDevelopers,
  getTeamDesignations,
} from "../../Redux/Slices/Lists/ListsSlice";
import AddRemoveDeveloper from "./AddRemoveDeveloper";
import DevelopersListing from "./DevelopersListing";
import LoadingSpinner from "../../utils/LoadingSpinner";
import ConfirmationDialog from "../../utils/ConfirmationDialog";
import DeveloperModal from "../../utils/DeveloperModal";
import { deleteGroup, getAvailableDevelopers, getGroupDevelopers } from "../../apis/GroupApi";
import { toast } from "react-toastify";

export default function Groups() {
  // Delete query to delete group
  const dispatch = useDispatch();
  const [openAddGroup, setOpenAddGroup] = useState(false);
  const [openAddDeveloper, setOpenAddDeveloper] = useState(false);
  const [openRemoveDeveloper, setOpenRemoveDeveloper] = useState(false);
  const [openDeveloperList, setOpenDeveloperList] = useState(false);
  const { groups, isLoading } = useSelector((store) => store.groups);
  const { developers, teamDesignations , projectManagers  } = useSelector(
    (store) => store?.lists
  );
  const [page, setPage] = useState(10);
  const [groupName, setGroupName] = useState("");
  const [developersList, setDevelopersList] = useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [groupId, setGroupId] = useState("");
  const [openDeveloperModal, setOpenDeveloperModal] = useState(false);
  const [status, setStatus] = useState(false);
  const [groupData, setGroupData] = useState(null);
  const [projectManager , setProjectManagers] = useState([]);


  React.useEffect(() => {
    // dispatch(getTeamDesignations());
    dispatch(getGroups(status));
    dispatch(getDevelopers());
  }, [dispatch,status]);

  React.useEffect(() => {
    const pmId = teamDesignations?.filter((role) => role?.name === "PM")[0]
      ?._id;
    dispatch(getAllProjectManagers(pmId));
  }, [teamDesignations]);

  const closeAddHandler = () => {
    setOpenAddGroup(false);
  };
  const closeDeveloperHandler = () => {
    setOpenAddDeveloper(false);
  };
  const closeRemoveDeveloperHandler = () => {
    setOpenRemoveDeveloper(false);
  };
  const clos = () => {
    setOpenDeveloperList(false);
  };
  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };
  const handleCloseDeveloperModal = () => {
    setOpenDeveloperModal(false);
  };

  const removeGroup = () => {
    deleteGroup(groupId).then(() => {
      setIsSuccess(true);
      toast("Group Deleted Successfully");
      dispatch(getGroups(status));
    });
  };


  const columns = [
    {
      field: "editAction",
      headerName: "",
      sortable: false,
      width: 70,
      hide: status,
      renderCell: (params) => {
        const editModalHandler = (e) => {
          e.stopPropagation();
          console.log(params.row,"lajkhdfobowubc");
          setOpenAddGroup(true);
          setGroupData(params.row);

          // dispatch(get_user(params.row.objId)).then((res) => {
          //   setOpenEditDevModal(true);
          // });
        };
        return (
          <div>
            <Button
              onClick={editModalHandler}
              style={{
                // backgroundColor: " #fffde7",
                backgroundColor: " #80808066",
                // backgroundColor: " #f1f1f1",
                marginRight: "3px",
                padding: "2px 3px",
                fontSize: "13px",
                minWidth: "55px",
              }}
            >
              <EditIcon sx={{ fontSize: "22px" }} />
            </Button>
          </div>
        );
      },
    },
    {
      field: "groupName",
      headerName: "Group Name",
      width: 150,
      // editable: true,
      flex: status ? 1 : "",
      headerAlign: "center",
      align: "center",
      // align: 'center',
      renderCell: (params) => {
        return (
          <Tooltip title={params?.formattedValue} placement="right" arrow>
            <span
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                cursor: "context-menu",
              }}
            >
              {params?.formattedValue}
            </span>
          </Tooltip>
        );
      },
    },
    {
      field: "assignedPm",
      headerName: "Assigned PM",
      width: 150,
      // editable: true,
      flex: status ? 1 : "",
      headerAlign: "center",
      // align: 'center',
      renderCell: (params) => {
        const assignedPm =
          params?.formattedValue?.length === 0
            ? "N/A"
            : params?.formattedValue?.map((item) => item?.lastname
                        ? item.fullName
                        : item?.fullName ).join(", ");
        return (
          <Tooltip title={assignedPm} placement="right" arrow>
            <span
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                cursor: "context-menu",
              }}
            >
              {assignedPm}
            </span>
          </Tooltip>
        );
      },
    },
    {
      field: "teamLead",
      headerName: "Team Lead",
      width: 150,
      flex: status ? 1 : "",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        // const teamLead =
        //   params?.formattedValue?.length === 0
        //     ? "N/A"
        //     : params?.formattedValue?.map((item) => item.name).join(",");
        return (
          <Tooltip title={params?.formattedValue?.name} placement="right" arrow>
            <span
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                cursor: "context-menu",
              }}
            >
              {params?.formattedValue}
            </span>
          </Tooltip>
        );
      },
    },
    {
      field: "developers",
      headerName: "Developers",
      width: 110,
      align: "center",
      flex: status ? 1 : "",
      headerAlign: "center",
      renderCell: (params) => {
        return params?.formattedValue?.length ? (
          <div
            style={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            <Button
              onClick={() => {
                // setDevelopersList(params?.formattedValue);
                setGroupId(params?.row?.id);
                getGroupDevelopers(params?.row?.id).then((data)=>{
                  const dev = data.data;
                  setDevelopersList(dev.developers);
                  setProjectManagers(dev.pms);
                  console.log(dev.pms, "oahdfowonco");
                })

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
      // editable: true,
      // renderCell: (params) => (
      //   <span
      //     onClick={() => {
      //       setOpenDeveloperList(true);
      //       setDevelopersList(params.row.developersList);
      //       // console.log(params.value);
      //     }}
      //     style={{ cursor: "pointer", textDecoration: "underline" }}
      //   >
      //     {params.value}
      //   </span>
      // ),
    },

    {
      field: "edit",
      headerName: "Developer actions",
      width: 180,
      headerAlign: "center",
      align: "center",
      sortable: false,
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
                setOpenAddDeveloper(true);
                setGroupId(params.row.id);
                getAvailableDevelopers().then((data)=>{
                  setDevelopersList(data);
                });
              }}
            >
              Add
            </Button>
            {/* <Button
              sx={{
                marginLeft: "8px",
                background: "rgba(128, 128, 128, 0.4)",
                fontSize: "12px",
                padding: "0.25rem 0.5rem",
              }}
              onClick={() => {
                setOpenRemoveDeveloper(true);
                setGroupName(params.row.groupName);
                setDevelopersList(params.row.developersList);
              }}
            >
              Remove
            </Button> */}
          </>
        );
      },
    },
    {
      field: "deleteAction",
      headerName: "",
      sortable: false,
      width: 70,
      hide: status,
      renderCell: (params) => {
        const deleteHandler = (e) => {
          e.stopPropagation();
          setIsSuccess(false);
          setOpenConfirmDialog(true);
          setGroupId(params?.row?.id);
          // dispatch(get_user(params.row.objId)).then((res) => {
          //   setOpenEditDevModal(true);
          // });
        };
        return (
          <div>
            <Button
              onClick={deleteHandler}
              style={{
                // backgroundColor: " #fffde7",
                backgroundColor: " #80808066",
                // backgroundColor: " #f1f1f1",
                marginRight: "3px",
                padding: "2px 3px",
                fontSize: "13px",
                minWidth: "55px",
              }}
            >
              <DeleteIcon sx={{ fontSize: "22px" }} />
            </Button>
          </div>
        );
      },
    },
  ];

  

  const rows = groups
  ?.map((group) => {
      console.log(group?.group[0]?.teamLead ,"klhadfklhfd")
      return {
        id: group?.group[0]?._id,
        groupName: group?.group[0]?.groupName,
        assignedPm: group?.pms,
        developers: group?.developers,
        teamLead: group?.group[0]?.teamLead  ? group?.group[0]?.teamLead : "N/A",
      };
    });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Box
      component="div"
      sx={{ display: "flex", justifyContent: "center", width: "auto" }}
    >
      <AddGroup
        open={openAddGroup}
        onClose={closeAddHandler}
        projectManagers={projectManagers}
        group={groupData}
        status={status}
      />

      {openAddDeveloper && (
        <AddRemoveDeveloper
          open={openAddDeveloper}
          onClose={closeDeveloperHandler}
          // developers={developers
          //   ?.filter((developer) => developer?.isDeleted !== true)
          //   ?.filter(
          //     (developer) =>
          //       !developersList.filter((dev) => dev._id === developer._id)
          //         ?.length
          //   )}
          developers={developersList}
          groupId={groupId}
          // addedDeveloper={developersList}
        />
      )}

      {/* {openRemoveDeveloper && (
        <AddRemoveDeveloper
          open={openRemoveDeveloper}
          onClose={closeRemoveDeveloperHandler}
          developers={developersList}
          groupName={groupName}
          remove={true}
        />
      )} */}

      {/* <DevelopersListing
        open={openDeveloperList}
        onClose={"closeDeveloperList"}
        developersList={developersList}
      ></DevelopersListing> */}

      <Box sx={{ height: "80vh", width: "100%" }}>
        <Box
          componet="div"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            select
            sx={{ width: "100px !important", backgroundColor: "white" }}
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
          <Button
            variant="contained"
            sx={{
              color: "white",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
            onClick={() => {
              setGroupData(null);
              setOpenAddGroup(true);
            }}
          >
            Add Group
          </Button>
        </Box>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={page}
          getRowId={(rows) => rows?.id}
          onPageSizeChange={(val) => setPage(val)}
          rowsPerPageOptions={[10, 25, 50, 100]}
          disableSelectionOnClick
          disableColumnMenu
          experimentalFeatures={{ newEditingApi: true }}
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
          }}
          rowHeight={40}
        />
        {openConfirmDialog && (
          <ConfirmationDialog
            open={openConfirmDialog}
            message={"Are you sure you want to delete group ?"}
            onClose={handleCloseConfirmDialog}
            onConfirm={removeGroup}
            isSuccess={isSuccess}
            // user={user}
          />
        )}
        {openDeveloperModal && (
          <DeveloperModal
            open={openDeveloperModal}
            onClose={handleCloseDeveloperModal}
            data={developersList}
            pms = {projectManager}
            id={groupId}
            isGroup = {true}
            removeDeveloper={removeDeveloper}
            fetchAgain={getGroups}
            type="group"
          />
        )}
      </Box>
    </Box>
  );
}
