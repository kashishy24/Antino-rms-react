import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Tooltip,
} from "@mui/material";
import styles from "../Assets/CSS/Developer/Developer.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import MenuItem from "@mui/material/MenuItem";
// import "../../Assets/CSS/RegDev/RegDev.css";
// import RegDevSchema from "./RegDevSchema";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// import {
//   getTechStacks,
//   getDesignations,
//   getRoles,
// } from "../../Redux/Slices/Lists/ListsSlice";
// import { reg_dev_vld, clearAll } from "../../Redux/Slices/Auth/RegDevSlice";
// import { get_users } from "../../Redux/Slices/getUsersSlice";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";
import { getProjects } from "../Redux/Slices/Project/ProjectsSlice";
import OffboardingModal from "./OffboardingModal";
import { getDeveloper } from "../apis/ProjectApi";
import { async } from "q";

const DeveloperModal = ({
  open,
  onClose,
  data,
  pms,
  id,
  isGroup,
  removeDeveloper,
  fetchAgain,
  type,
}) => {

  console.log(pms , "lakhdflhafdlkahdf");
  
  const useStyles = makeStyles({
    container: {
      gap: "10px",
    },
    inputItem: {
      width: "100%",
    },
    paper: { minWidth: "500px" },
  });

  const classes = useStyles();

  const handleClose = () => {
    // reset();
    onClose();
  };

  const { status, code, msg, isLoading, role } = useSelector(
    (store) => store.regDev
  );

  const { techStacks, designations, roles } = useSelector(
    (store) => store.lists
  );
  const [isFresher, setIsFresher] = useState("true");
  const dispatch = useDispatch();
  //   const {
  //     register,
  //     handleSubmit,
  //     reset,
  //     control,
  //     formState: { errors },
  //   } = useForm({
  //     resolver: yupResolver(RegDevSchema),
  //   });

  //   dispatch(clearAll());

  //   useEffect(() => {
  //     dispatch(getTechStacks());
  //     dispatch(getDesignations());
  //     dispatch(getRoles());
  //   }, []);

  //   useEffect(() => {
  //     if (status === true) {
  //       setTimeout(() => {
  //         handleClose();
  //         dispatch(get_users("api/v2/users/search"));
  //       }, 1000);
  //     }
  //     if (status === false) {
  //       toast.error(msg);
  //       console.log(msg);
  //     }
  //   }, [status]);

  //   const onSubmit = (data) => {
  //     data.workingExperienceInMonths =
  //       data.workingExperienceInYears * 12 + data.workingExperienceInMonths;
  //     delete data.workingExperienceInYears;
  //     data.seniority =
  //       data.workingExperienceInMonths <= 6
  //         ? "Intern"
  //         : data.workingExperienceInMonths > 6 &&
  //           data.workingExperienceInMonths <= 12
  //         ? "Junior"
  //         : data.workingExperienceInMonths > 12 &&
  //           data.workingExperienceInMonths <= 24
  //         ? "Assistant"
  //         : "Senior";
  //     console.log(data);
  //     dispatch(reg_dev_vld(data));
  //     console.log(status);
  //   };

  //   const handleChange = (event) => {
  //     setIsFresher(event.target.value);
  //   };
const [isOffboardingToggle,setisOffboardingToggle] =useState(false)
// console.log(isOffboardingToggle);
  const columns = [
    {
      field: "OffBoardAction",
      headerName: "",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        const handleOffBoarding = (e) => {
          

          let obj;
          if (type === "group") {
            obj = { developerId: params.row.objId, groupName: id };
          } else {
            obj = { developerId: params.row.objId, projectId: id };
            console.log(obj);
          }
          if (type === "group") {
            dispatch(removeDeveloper(obj)).then((response) => {
              toast("Developers removed successfully");
              setTimeout(() => {
                dispatch(fetchAgain());
                onClose();
              }, 1000);
            });
          } else {
            dispatch(removeDeveloper(obj)).then((response) => {
              toast("Developers removed successfully");
              setTimeout(() => {
                dispatch(fetchAgain());
                onClose();
              }, 1000);
            });
          }

          //   const requiredData = { projectId, ...data };
          //   if (requiredData.developerId === "") {
          //     toast("Add Developer");
          //   } else {
          //     dispatch(removeDeveloper(requiredData)).then((response) => {
          //       toast("Developers removed successfully");
          //       setTimeout(() => {
          //         reset();
          //         dispatch(getProjects());
          //         onClose();
          //       }, 1000);
          //     });
          //   }
          //   setIsSuccess(false);
          //   setOpenConfirmDialog(true);
          //   setUserId(params?.row?.objId);
          // deleteQuery = deleteQuery + params.row.objId;
          // dispatch(delete_user({ deleteQuery, dataPerPage, currentPage }));
        };
        return (
          <div>
            <Button
              onClick={()=>setisOffboardingToggle(true)}
              style={{
                backgroundColor: " #80808066",
                padding: "2px 3px",
                fontSize: "13px",
                minWidth: "55px",
              }}
            >
              Offboard
            </Button>
            {isOffboardingToggle &&
            
            <OffboardingModal 
                handleOffBoarding={handleOffBoarding}
                isOffboardingToggle={isOffboardingToggle}
                setisOffboardingToggle={setisOffboardingToggle}
            />
            }
          </div>
        );
      },
    },
    {
      field: "fullName",
      headerName: "Full name",
      width: 100,
      renderCell: (params) => (
        <Tooltip title={params.value} placement="right" arrow>
          <span className={styles.tooltip}>{params.value}</span>
        </Tooltip>
      ),
      //   renderCell: (params) => {
      //     const openDeveloperDetailHandler = () => {
      //       dispatch(get_user(params.row.objId));
      //       setOpenDeveloperDetails(true);
      //     };
      //     return (
      //       <Tooltip title={params.value} placement="right" arrow>
      //         <span
      //           className={styles.tooltip}
      //           style={{
      //             fontSize: "13px",
      //             cursor: "pointer",
      //             fontWeight: "bold",
      //             textDecoration: "underline",
      //           }}
      //           onClick={openDeveloperDetailHandler}
      //         >
      //           {params.value}
      //         </span>
      //       </Tooltip>
      //     );
      //   },
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
      // renderCell: (params) => (
      //   <Tooltip title={params.value} placement="right" arrow>
      //     <span className={styles.tooltip}>{params.value}</span>
      //   </Tooltip>
      // ),
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
      headerName: type ==='group'?"Reporting manager":"Project Manager",
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
      // renderCell: (params) => (
      //   <Tooltip title={params.value} placement="right" arrow>
      //     <span>{params.value}</span>
      //   </Tooltip>
      // ),
    },
    {
      field: "techStack",
      headerName: "Tech Stack",
      width: 100,
      renderCell: (params) => {
        console.log(params, "Hello")
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
      field: "secondaryTechStack",
      headerName: "Secondary Tech Stack ",
      width: 100,
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
      // renderCell: (params) => (
      //   <Tooltip title={params.value} placement="right" arrow>
      //     <span>{params.value}</span>
      //   </Tooltip>
      // ),
    },
    // {
    //   field: "designation",
    //   headerName: "Designation",
    //   width: 100,
    //   renderCell: (params) => (
    //     <Tooltip title={params.value} placement="right" arrow>
    //       <span className={styles.tooltip}>{params.value}</span>
    //     </Tooltip>
    //   ),
    // },

    {
      field: "phoneNumber",
      headerName: "Phone No.",
      type: "string",
      width: 110,
      // renderCell: (params) => (
      //   <Tooltip title={params.value} placement="right" arrow>
      //     <span
      //       className={styles.tooltip}
      //     >
      //       {params.value}
      //     </span>
      //   </Tooltip>
      // ),
    },
    {
      field: "emergencyContactNumber",
      headerName: "Emergency Number",
      type: "string",
      width: 110,
      // renderCell: (params) => (
      //   <Tooltip title={params.value} placement="right" arrow>
      //     <span
      //       className={styles.tooltip}
      //     >
      //       {params.value}
      //     </span>
      //   </Tooltip>
      // ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 100,
      renderCell: (params) => (
        <Tooltip title={params.value} placement="right" arrow>
          <span className={styles.tooltip}>{params.value}</span>
        </Tooltip>
      ),
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
    // {
    //   field: "deleteAction",
    //   headerName: "",
    //   sortable: false,
    //   width: 70,
    //   hide: deleted,
    //   renderCell: (params) => {
    //     // const editHandler = (e) => {
    //     //   e.stopPropagation(); // don't select this row after clicking
    //     //   const api = params.api;
    //     //   const thisRow = {};
    //     //   api
    //     //     .getAllColumns()
    //     //     .filter((c) => c.field !== "__check__" && !!c)
    //     //     .forEach(
    //     //       (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
    //     //     );
    //     //   // console.log(params.row.objId);
    //     //   dispatch(get_user(params.row.objId));
    //     //   navigate("Edit-developer");
    //     // };
    //     const handleDelete = (e) => {
    //       // console.log(params.row.objId);
    //       setIsSuccess(false);
    //       setOpenConfirmDialog(true);
    //       setUserId(params?.row?.objId);
    //       // deleteQuery = deleteQuery + params.row.objId;
    //       // dispatch(delete_user({ deleteQuery, dataPerPage, currentPage }));
    //     };
    //     return (
    //       <div>
    //         {/* <Button
    //           onClick={editHandler}
    //           style={{
    //             // backgroundColor: " #fffde7",
    //             backgroundColor: " #80808066",
    //             // backgroundColor: " #f1f1f1",
    //             marginRight: "3px",
    //             padding: "2px 3px",
    //             fontSize: "13px",
    //             minWidth: "55px",
    //           }}
    //           disabled={params.row.isDeleted}
    //         >
    //           <EditIcon sx={{ fontSize: "22px" }} />
    //         </Button> */}
    //         <Button
    //           onClick={handleDelete}
    //           style={{
    //             // backgroundColor: " #f1f1f1",
    //             backgroundColor: " #80808066",
    //             // backgroundColor: " #ffebee",
    //             padding: "2px 3px",
    //             fontSize: "13px",  
    //             minWidth: "55px",
    //           }}
    //           disabled={params.row.isDeleted}
    //         >
    //           <DeleteIcon sx={{ fontSize: "22px" }} />
    //         </Button>
    //       </div>
    //     );
    //   },
    // },
  ];
  

  const rows = data && data
    // ?.filter((user) => user.isDeleted === false)
    ?.map((user) => {
      console.log(user.details.projects,"projectmanagername")
      const joinDate = moment(
        user?.joiningDate,
        "YYYY-MM-DDTHH:mm:ssZ"
      )?.format();
      const currentDate = moment().format("YYYY-MM-DDTHH:mm:ssZ");
      const experienceAfterJoining = Math.floor(
        moment(currentDate).diff(moment(joinDate), "months", true)
      );
      const totalExperience =
        user?.details?.workingExperienceInMonths;
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
        fullName: user?.details?.fullName,
        techStack: user?.details?.techStack,
        secondaryTechStack: user?.details?.secondaryTechStack,
        projects:
          user?.details?.projects?.length === 0
            ? "N/A"
            : user?.details?.projects?.map((project) => project?.projectName).join(","),
        // reportingPm: user.reportingPm,
        workingExperienceInMonths: user?.details?.workingExperienceInMonths,
        experience: yearString + monthString,

        // isFresher: user?.isFresher?.toString(),
        // isFresher: user.isFresher ? "Yes" : "No",
        phoneNumber: user?.details?.phoneNumber,
        email: user?.details?.email,
        remarks: user?.details?.remarks ? user?.details?.remarks : "N/A",
        emergencyContactNumber: user?.details?.emergencyContactNumber,
        designation: user?.designation?.name,
        group: user?.groups ? user?.groups?.map((group) => group.groupName).join(", ") : "N/A",
        //  joiningDate: new Date(user.joiningDate).toDateString(),
        joiningDate: moment(user?.joiningDate)?.format("DD/MM/YYYY"),

        // new Date(user?.joiningDate)?.getDate() +
        // "/" +
        // (new Date(user?.joiningDate)?.getMonth() + 1) +
        // "/" +
        // new Date(user?.joiningDate)?.getFullYear(),

        seniority: user?.details?.seniority,
        id: user?.email + "_" + user?._id, // for time being
        objId: user?._id,
        isAvailable: user?.details?.isAvailable === null ? "N/A" : user?.details?.isAvailable,
        isDeleted: user?.details?.isDeleted,
        reportingPm: pms ? pms?.map((pm)=> pm.fullName).join(", ") : "N/A",
        billable: user?.billable,
      };
    });
    // pm.firstName).join(", ") : "N/A",
  return (
    <>
      <Box>
        <form>
          <Dialog
            className={classes.paper}
            maxWidth={"lg"}
            open={open}
            close={onClose}
            sx={{
              "& .MuiDialogActions-root": {
                padding: "0px !important",
              },
            }}
          >
            <DialogTitle>
              <Grid
                container
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                Developer
                <Button
                  sx={{
                    color: "black",
                    fontSize: "1rem",
                  }}
                  onClick={handleClose}
                >
                  <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
                </Button>
              </Grid>
            </DialogTitle>
            <DialogContent>
              <div style={{ height: "70vh", width: "75vw" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  //   pageSize={pageSize}
                  //   onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  //   loading={searching}
                  //   rowsPerPageOptions={[10, 25, 50, 100]}
                  components={{
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
              </div>
            </DialogContent>
          </Dialog>
        </form>
      </Box>
    </>
  );
};

export default DeveloperModal;
