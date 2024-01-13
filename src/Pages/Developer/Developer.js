import React, { useEffect, useState } from "react";
import { Button, Stack, Tooltip } from "@mui/material";
import "../../Assets/CSS/Developer/Developer.css";
import { useDispatch, useSelector } from "react-redux";
import { get_user, emptyUserData } from "../../Redux/Slices/Auth/RegDevSlice";
import { useNavigate } from "react-router-dom";
import {
  get_users,
  delete_user,
  search_user,
  setFilterParameters,
  setCurrentPage,
  setDataPerPage,
} from "../../Redux/Slices/getUsersSlice";
import { DataGrid } from "@mui/x-data-grid";
import LoadingSpinner from "../../utils/LoadingSpinner";
import CustomPagination from "../../utils/CustomPagination";
import DeveloperFilter from "./DevelopersFilter";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "../../Assets/CSS/Developer/Developer.module.css";
import moment from "moment/moment";
import DeveloperDetails from "./DeveloperDetails";
import { Box } from "@mui/system";
import { ContentPasteOffSharp, Palette } from "@mui/icons-material";
import ConfirmationDialog from "../../utils/ConfirmationDialog";
import { toast } from "react-toastify";
import DeletedDevFilter from "./DeletedDevFilter";
import EditDevModal from "./EditDevModal";
import { getDeveloperfullname } from "../../apis/DeveloperApi";
import { getDeveloperDetalis } from "../../apis/DeveloperApi";
const Developer = () => {
  const query = "/api/v2/users/search?isDeleted=false";
  let deleteQuery = "api/v2/users/delete-user/";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFresher, setIsFresher] = useState("true");
  const [deleted, setDeleted] = useState(false);
  const [openDeveloperDetails, setOpenDeveloperDetails] = useState(false);
  const [openEditDevModal, setOpenEditDevModal] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userId, setUserId] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [getDevelopermodal, setGetdevelopermodal] = useState([]);
  console.log("developerdetalisstate", getDevelopermodal);
  const [developerpopupstate, setDeveloperpopupstate] = useState([]);
  console.log("developerdetalisstate", developerpopupstate);
  const {
    isLoading,
    users,
    dataPerPage,
    totalCount,
    currentPage,
    searching,
    searchFilters,
    onClose,
  } = useSelector((store) => store.getUsers);
  console.log(users, "ooooo");
  const role = localStorage.getItem("designation");

  const { userData, isLoading: modalLoading } = useSelector(
    (store) => store.regDev
  );

  console.log("userdatach", userData);
  useEffect(() => {
    dispatch(get_users(query));
  }, [currentPage, dataPerPage]);

  useEffect(() => {
    if (Object.keys(searchFilters).length === 0) {
      dispatch(
        get_users({
          query,
          // currentPage,
          // dataPerPage,
        })
      );
    } else {
      const requiredData = {
        ...searchFilters,
        // page: currentPage
      };
      dispatch(setFilterParameters(requiredData));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(searchFilters).length === 0) return;
    const url = "api/v2/users/search";
    dispatch(search_user({ url, data: searchFilters }));
  }, [searchFilters]);

  // const seniority=["Junior", "Assistant","Intern","Senior","Full Time"];

  const columns = [
    {
      field: "editAction",
      headerName: "Edit",
      sortable: false,
      width: 70,
      hide: role === "PM" ? true : false,
      // width: 140,
      renderCell: (params) => {
        // const editHandler = (e) => {
        //   e.stopPropagation(); // don't select this row after clicking

        //   // console.log(params.row.objId);
        //   dispatch(get_user(params.row.objId));
        //   navigate("Edit-developer");
        // };
        const editModalHandler = (e) => {
          e.stopPropagation();
          console.log("hiiminsideonmodall");
          dispatch(get_user(params.row.objId)).then((res) => {
            setOpenEditDevModal(true);
          });
        };
        return (
          <div>
            {/* <Button
              onClick={editHandler}
              style={{
                // backgroundColor: " #fffde7",
                backgroundColor: " #80808066",
                // backgroundColor: " #f1f1f1",
                marginRight: "3px",
                padding: "2px 3px",
                fontSize: "13px",
                minWidth: "55px",
              }}
              disabled={params.row.isDeleted}
            >
              <EditIcon sx={{ fontSize: "22px" }} />
            </Button> */}
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
              disabled={params.row.isDeleted}
            >
              <EditIcon sx={{ fontSize: "22px" }} />
            </Button>
          </div>
        );
      },
    },
    // {
    //   field: "empId",
    //   headerName: "Developer ID",
    //   sortable: false,
    //   width: 100,
    //   renderCell: (params) => {
    //     const openDeveloperDetailHandler = () => {
    //       dispatch(get_user(params.row.objId));
    //       setOpenDeveloperDetails(true);
    //     };
    //     return (
    //       <div>
    //         <p
    //           style={{
    //             fontSize: "13px",
    //             cursor: "pointer",
    //             textDecoration: "underline",
    //           }}
    //           onClick={openDeveloperDetailHandler}
    //         >
    //           {params.value}
    //         </p>
    //       </div>
    //     );
    //   },
    // },
    {
      field: "fullName",
      headerName: "Full name",
      width: 100,
      renderCell: (params) => {
        const openDeveloperDetailHandler = () => {
          // dispatch();
          getDeveloperfullname(params.row.objId).then((data) => {
            setGetdevelopermodal(data);
          });
          console.log("datatid", params.row.objId);
          // setGetdevelopermodal()

          setOpenDeveloperDetails(true);
        };
        return (
          <Tooltip title={params.value} placement="right" arrow>
            <span
              className={styles.tooltip}
              style={{
                fontSize: "13px",
                cursor: "pointer",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
              onClick={openDeveloperDetailHandler}
            >
              {params.value}
            </span>
          </Tooltip>
        );
      },
    },
    {
      field: "isAvailable",
      headerName: "Availability",
      width: 100,
      renderCell: (params) => (
        <Tooltip title={params.value} placement="right" arrow>
          <span className={styles.tooltip}>{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: "group",
      headerName: "Group",
      width: 100,
      renderCell: (params) => (
        <Tooltip title={params.value} placement="right" arrow>
          <span className={styles.tooltip}>{params.value}</span>
        </Tooltip>
      ),
    },
    // {
    //   field: "billable",
    //   headerName: "Billable",
    //   width: 100,
    //   // renderCell: (params) => (
    //   //   <Tooltip title={params.value} placement="right" arrow>
    //   //     <span className={styles.tooltip}>{params.value}</span>
    //   //   </Tooltip>
    //   // ),
    // },
    {
      field: "reportingPm",
      headerName: "Project Manager",
      width: 100,
      renderCell: (params) => (
        <Tooltip title={params.value} placement="right" arrow>
          <span className={styles.tooltip}>{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: "projects",
      headerName: "Projects",
      width: 100,
      renderCell: (params) => (
        <Tooltip title={params.value} placement="right" arrow>
          <span className={styles.tooltip}>{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: "experience",
      headerName: "Experience",
      type: "string ",
      width: 150,
      renderCell: (params) => (
        <Tooltip title={params.value} placement="right" arrow>
          <span className={styles.tooltip}>{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: "seniority",
      headerName: "Seniority",
      width: 100,
      renderCell: (params) => (
        <Tooltip title={params.value} placement="right" arrow>
          <span>{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: "techStack",
      headerName: "Tech Stack",
      width: 100,
      renderCell: (params) => {
        console.log(params, "textext");
        const techStack =
          params.value === undefined || "" ? "N/A" : params.value;
        return (
          <Tooltip title={techStack} placement="right" arrow>
            <span className={styles.tooltip}>{techStack}</span>
          </Tooltip>
        );
      },
    },
    {
      field: "secondaryTechStack",
      headerName: "Secondary Tech Stack ",
      width: 100,
      // renderCell: (params) => (
      //   <Tooltip title={params.value} placement="right" arrow>
      //     <span>{params.value}</span>
      //   </Tooltip>
      // ),
    },
    {
      field: "designation",
      headerName: "Designation",
      width: 100,
      renderCell: (params) => (
        <Tooltip title={params.value} placement="right" arrow>
          <span className={styles.tooltip}>{params.value}</span>
        </Tooltip>
      ),
    },

    {
      field: "phoneNumber",
      headerName: "Phone No.",
      type: "string",
      width: 110,
      renderCell: (params) => {
        const phoneNumber = params.value === "" ? "N/A" : params.value;
        return (
          <Tooltip title={phoneNumber} placement="right" arrow>
            <span className={styles.tooltip}>{phoneNumber}</span>
          </Tooltip>
        );
      },
    },
    {
      field: "emergencyContactNumber",
      headerName: "Emergency Number",
      type: "string",
      width: 110,
      renderCell: (params) => {
        const eemergencyCn = params.value === "" ? "N/A" : params.value;
        return (
          <Tooltip title={eemergencyCn} placement="right" arrow>
            <span className={styles.tooltip}>{eemergencyCn}</span>
          </Tooltip>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 100,
      renderCell: (params) => {
        const email = params.value === "" ? "N/A" : params.value;
        return (
          <Tooltip title={email} placement="right" arrow>
            <span className={styles.tooltip}>{email}</span>
          </Tooltip>
        );
      },
    },

    {
      field: "joiningDate",
      headerName: "Joining Date",
      width: 100,
      // renderCell: (params) => (
      //   <Tooltip title={params.value} placement="right" arrow>
      //     <span>{params.value}</span>
      //   </Tooltip>
      // ),
    },
    {
      field: "remarks",
      headerName: "Remarks",
      width: 100,
      renderCell: (params) => (
        <Tooltip title={params.value} placement="right" arrow>
          <span className={styles.tooltip}>{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: "deleteAction",
      headerName: "",
      sortable: false,
      width: 70,
      hide: role === "PM" ? true : false,
      renderCell: (params) => {
        // const editHandler = (e) => {
        //   e.stopPropagation(); // don't select this row after clicking
        //   const api = params.api;
        //   const thisRow = {};
        //   api
        //     .getAllColumns()
        //     .filter((c) => c.field !== "__check__" && !!c)
        //     .forEach(
        //       (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
        //     );
        //   // console.log(params.row.objId);
        //   dispatch(get_user(params.row.objId));
        //   navigate("Edit-developer");
        // };
        const handleDelete = (e) => {
          // console.log(params.row.objId);
          setIsSuccess(false);
          setOpenConfirmDialog(true);
          setUserId(params?.row?.objId);
          // deleteQuery = deleteQuery + params.row.objId;
          // dispatch(delete_user({ deleteQuery, dataPerPage, currentPage }));
        };
        return (
          <div>
            {/* <Button
              onClick={editHandler}
              style={{
                // backgroundColor: " #fffde7",
                backgroundColor: " #80808066",
                // backgroundColor: " #f1f1f1",
                marginRight: "3px",
                padding: "2px 3px",
                fontSize: "13px",
                minWidth: "55px",
              }}
              disabled={params.row.isDeleted}
            >
              <EditIcon sx={{ fontSize: "22px" }} />
            </Button> */}
            <Button
              onClick={handleDelete}
              style={{
                // backgroundColor: " #f1f1f1",
                backgroundColor: " #80808066",
                // backgroundColor: " #ffebee",
                padding: "2px 3px",
                fontSize: "13px",
                minWidth: "55px",
              }}
              disabled={params.row.isDeleted}
            >
              <DeleteIcon sx={{ fontSize: "22px" }} />
            </Button>
          </div>
        );
      },
    },
  ];
  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }

  console.log("checkingusrrrrr", users);
  const rows = users
    ?.filter((user) => user.isDeleted === deleted)
    ?.map((user) => {
      // let grrr=user.groupName.map((e)=>e.groupName);
      // console.log("chhhhhgroup",grrr)
      const joinDate = moment(
        user?.joiningDate,
        "YYYY-MM-DDTHH:mm:ssZ"
      ).format();
      const currentDate = moment().format("YYYY-MM-DDTHH:mm:ssZ");
      const experienceAfterJoining = Math.floor(
        moment(currentDate).diff(moment(joinDate), "months", true)
      );
      const totalExperience =
        user?.workingExperienceInMonths + experienceAfterJoining;
      const years = Math.floor(totalExperience / 12);
      const months = totalExperience - years * 12;
      const yearString =
        years === 0 ? "" : years === 1 ? years + " Year " : years + " Years ";
      const monthString =
        months === 0
          ? years === 0
            ? "0 Month"
            : ""
          : months === 1
          ? months + " Month "
          : months + " Months ";
      return {
        empId: user?.empId,
        fullName: user?.fullName,
        techStack:
          user?.techStack?.length > 0
            ? user?.techStack[0]?.name
            : user?.techStack
            ? user?.techStack.name
            : "N/A",
        projects:
          user?.projects?.length === 0
            ? "N/A"
            : user?.projects
                ?.map((project) => project?.projectDetail.projectName)
                .join(","),
        // group:
        //   user?.group?.length === 0
        //     ? "N/A"
        //     : user?.groupName,
        // reportingPm: user.reportingPm,
        workingExperienceInMonths: user?.workingExperienceInMonths,
        experience: yearString + monthString,

        // isFresher: user?.isFresher?.toString(),
        // isFresher: user.isFresher ? "Yes" : "No",
        phoneNumber: user?.phoneNumber,
        secondaryTechStack:
          user?.secondaryTechStack?.length === 0
            ? "N/A"
            : user?.secondaryTechStack && user?.secondaryTechStack[0]?.name,
        email: user?.email,
        remarks: user?.remarks ? user?.remarks : "N/A",
        emergencyContactNumber: user?.emergencyContactNumber,
        designation:
          user?.designation?.length === 0
            ? "N/A"
            : user?.designation && user?.designation[0]?.name,
        group: user?.group?.length === 0 ? "N/A" : user?.group[0]?.groupName,

        // groupName: user?.groupName ? user?.groupName : "N/A",
        //  joiningDate: new Date(user.joiningDate).toDateString(),
        joiningDate:
          moment(user?.joiningDate)?.format("DD/MM/YYYY") === "Invalid date"
            ? "N/A"
            : moment(user?.joiningDate)?.format("DD/MM/YYYY"),

        // new Date(user?.joiningDate)?.getDate() +
        // "/" +
        // (new Date(user?.joiningDate)?.getMonth() + 1) +
        // "/" +
        // new Date(user?.joiningDate)?.getFullYear(),

        seniority: user?.seniority,
        id: user?.email + "_" + user?._id, // for time being
        objId: user?._id,
        isAvailable: user?.isAvailable === null ? "N/A" : user?.isAvailable,
        isDeleted: user?.isDeleted,
        reportingPm: user?.pms?.length === 0 ? "N/A" : user?.pms?.join(", "),
        // billable: user?.billable,
      };
    });
  const closeDeveloperDetailsHandler = () => {
    dispatch(emptyUserData());
    setOpenDeveloperDetails(false);
  };
  const handleChange = (event) => {
    setIsFresher(event.target?.value);
  };

  const handlePageChange = (value) => {
    dispatch(setCurrentPage(value));
  };

  const closeEditDevHandler = () => {
    setOpenEditDevModal(false);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const deleteDeveloper = () => {
    deleteQuery = deleteQuery + userId;
    dispatch(
      delete_user({
        deleteQuery,
        // dataPerPage, currentPage
      })
    ).then(() => {
      setIsSuccess(true);
      toast("Developer Deleted Successfully");
      dispatch(get_users("api/v2/users/search?isDeleted=false"));
      onClose();
      // dispatch(
      //   get_users({
      //     query: "/api/v2/users/search?isDeleted=false",
      //   })
      // );
      // dispatch(get_users("api/v2/users/search"));
    });
  };
  const devStatusHandler = (value) => {
    setDeleted(value);
    dispatch(get_users(`api/v2/users/search?isDeleted=${value}`));
    console.log("deleteddata", deleted);
  };
  console.log(rows, "rows");

  return (
    <Box
      sx={{
        height: "75vh",
      }}
    >
      {deleted === false && (
        <DeveloperFilter status={deleted} devStatusHandler={devStatusHandler} />
      )}
      {deleted === true && (
        <DeletedDevFilter
          status={deleted}
          devStatusHandler={devStatusHandler}
        />
      )}
      <DeveloperDetails
        open={openDeveloperDetails}
        onClose={closeDeveloperDetailsHandler}
        data={getDevelopermodal}
      />
      {openEditDevModal && (
        <EditDevModal
          open={openEditDevModal}
          onClose={closeEditDevHandler}
          userData={userData}
        />
      )}

      <div style={{ height: "100%", width: "100%" }}>
        {console.log(rows, "deleteddatagrid")}
        {!isLoading ? (
          <DataGrid
            rows={rows}
            pageSize={dataPerPage}
            columns={columns}
            rowCount={totalCount}
            paginationMode="server"
            pagination
            page={currentPage}
            onPageChange={(page) => dispatch(setCurrentPage(page))}
            // pageSize={pageSize}
            onPageSizeChange={(dataPerPage) =>
              dispatch(setDataPerPage(dataPerPage))
            }
            loading={searching}
            rowsPerPageOptions={[10, 25, 50, 100]}
            components={{
              // Pagination: CustomPagination,
              NoRowsOverlay: () => (
                <Stack
                  height="100%"
                  alignItems="center"
                  justifyContent="center"
                >
                  No Results Found
                </Stack>
              ),
            }}
            initialState={{
              pinnedColumns: { left: ["empId"] },
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
            sx={{
              backgroundColor: "white",
              "& .MuiDataGrid-columnSeparator": {
                // display: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                // fontSize: "1rem",
                background: "black",
                color: "white",
              },
              "& .MuiDataGrid-sortIcon": {
                color: "white",
              },
              // "& .MuiDataGrid-columnHeaders": {
              //   // color: "#49C5B6",
              //   fontSize: "1rem",
              // },
            }}
            disableColumnMenu
            rowHeight={40}
          />
        ) : (
          <LoadingSpinner />
        )}
      </div>
      {openConfirmDialog && (
        <ConfirmationDialog
          open={openConfirmDialog}
          message={"Are you sure you want to delete?"}
          onClose={handleCloseConfirmDialog}
          onConfirm={deleteDeveloper}
          isSuccess={isSuccess}
          // user={user}
        />
      )}
    </Box>
  );
};

export default Developer;
