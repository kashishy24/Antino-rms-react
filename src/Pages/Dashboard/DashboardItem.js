import { Card, CardContent, Grid, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import WorkSharpIcon from "@mui/icons-material/WorkSharp";
// import PeopleSharpIcon from "@mui/icons-material/PeopleSharp";
import CodeSharpIcon from "@mui/icons-material/CodeSharp";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import {
  getDevelopers,
  getProjects,
} from "../../Redux/Slices/Lists/ListsSlice";
import { setCurrentPage,setDataPerPage ,getTotalDevelopers} from "../../Redux/Slices/Lists/ListsSlice";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { CookieSharp } from "@mui/icons-material";
// import { setCurrentPage,setDataPerPage } from "../../Redux/Slices/getUsersSlice";
// import { get_users,  } from "../../Redux/Slices/getUsersSlice";
const DashboardItem = () => {
  const query = "/api/v2/users/search?isDeleted=false";
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { developers, projects, isLoading, error,totalCount,currentPage ,dataPerPage,totalDevelopers} = useSelector(
    (store) => store.lists
  );
// const {totalCount,currentPage} =useSelector(store=>store.lists)
console.log("deve>>>>",)
useEffect(()=>{
  dispatch(getProjects());
},[])
useEffect(() => {
  dispatch(getTotalDevelopers())
  dispatch(getDevelopers(query));
  // dispatch(get_users(query))
  }, [currentPage,dataPerPage]);


  console.log("developersmmm", developers);
  console.log("projects==========", projects);
  // const users = [];
  // const AvailableDevelopers = developers?.filter(
  //   (developer) =>
  //     developer?.isDeleted !== true &&
  //     (developer?.isAvailable === "available" ||
  //       developer?.isAvailable === null)
  // );
  // console.log("AvailableDevelopers",AvailableDevelopers)
  const developersColumns = [
    {
      field: "empId",
      headerName: "Developer ID",
      headerAlign: "center",
      align: "center",
      minWidth: 100,
      flex: 1,
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
      field: "fullName",
      headerName: "Available Developer",
      headerAlign: "center",
      align: "center",
      minWidth: 100,
      flex: 1,
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
  ];

  const projectsColumns = [
    {
      field: "projectName",
      headerName: "Project Name",
      headerAlign: "center",
      align: "center",
      minWidth: 100,
      flex: 1,
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
      field: "projectManager",
      headerName: "Project Manager",
      headerAlign: "center",
      align: "center",
      minWidth: 100,
      flex: 1,
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
  ];

  console.log(developers , "check developer row")
  const developersRows = developers?.map((developer) => {
    console.log(developer, "check developer row");
    return {
      id: developer?.email + "_" + developer?._id,
      empId: developer?.empId? developer?.empId : "N/A",
      fullName: developer?.fullName ? developer?.fullName : "N/A",
    };
  });

  console.log("project========",projects[0])
  const projectsRows = projects
    // ?.filter((project) => project.status === "Active")
    ?.map((item) => {
      // item.pm.map((e)=>e.firstName)
     {console.log(item,"items")} return {
        id: item.projects?._id,
        projectName: item.projects?.projectName,
        projectManager:item.pm.map((e) => e.fullName).join(',')
          ? item.pm?.map((e)=>e?.fullName).join(',')
          : "N/A",
      };
    });

  return (
    <Grid container rowGap={3} mt={2}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Card
            sx={{
              boxShadow: 4,
              // backgroundColor: "#ffebee",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                "&:last-child": {
                  padding: "21px  16px!important",
                },
              }}
            >
              <Box component="div" sx={{ width: "50%" }}>
                <Typography variant="h5" component="div">
                  Developers
                </Typography>
                <Box
                  component="div"
                  sx={{
                    padding: "5px 0px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <CodeSharpIcon
                    sx={{
                      backgroundColor: "white",
                      padding: "4px",
                      fontSize: "2rem",
                      borderRadius: "2rem",
                    }}
                  />
                </Box>
              </Box>
              <Box
                component="div"
                sx={{
                  width: "50%",
                  // margin: "6.3px 0px"
                }}
              >
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Tooltip title="Total Developers" placement="right" arrow>
                    <Typography
                      sx={{
                        width: "80%",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      Total Developers
                    </Typography>
                  </Tooltip>
                  <Typography
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    {/* {
                      developers?.filter(
                        (developer) => developer.isDeleted !== true
                      )?.length
                    } */}
                    {totalDevelopers.totalCount}
                  </Typography>
                </Box>
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "green",
                  }}
                >
                  <Typography sx={{ width: "80%" }}>Engaged</Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    {
                      // developers?.filter(
                      //   (developer) =>
                      //     developer.isDeleted !== true &&
                      //     developer.isAvailable === "Not Available"
                          
                      // )?.length
                      totalDevelopers.engagedCount
                    }
                  </Typography>
                </Box>
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "red",
                  }}
                >
                  <Typography sx={{ width: "80%" }}>Available</Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    {
                      // developers?.filter(
                      //   (developer) =>
                      //     developer.isDeleted !== true &&
                      //     developer.isAvailable === "Available"
                          
                      // )?.length
                      totalDevelopers.availableCount
                    }
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {/* <Grid item xs={4}>
          <Card
            sx={{
              //  backgroundColor: "#e3f2fd"
              boxShadow: 4,
            }}
          >
            <CardContent
              sx={{
                "&:last-child": {
                  paddingBottom: "16px !important",
                },
              }}
            >
              <Typography variant="h5" component="div">
                Available
              </Typography>
              <Box
                component="div"
                sx={{
                  padding: "5px 0px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <EventAvailableIcon
                  sx={{
                    backgroundColor: "white",
                    padding: "4px",
                    fontSize: "2rem",
                    borderRadius: "2rem",
                  }}
                />
                <Box component="div">
                  <Typography>Total</Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    {AvailableDevelopers?.length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid> */}
        <Grid item xs={4}>
          <Card
            sx={{
              boxShadow: 4,
              // backgroundColor: "#e0f2f1"
            }}
          >
            <CardContent
              sx={{
                "&:last-child": {
                  paddingBottom: "16px !important",
                },
              }}
            >
              <Typography variant="h5" component="div">
                Projects
              </Typography>
              <Box
                component="div"
                sx={{
                  padding: "5px 0px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
              <WorkSharpIcon
                  sx={{
                    backgroundColor: "white",
                    padding: "4px",
                    fontSize: "2rem",
                    borderRadius: "2rem",
                    color:"black"
                  }}
                />
                <Box component="div">
                  <Typography>Total</Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    {projects?.length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={6} sx={{ height: "80vh" }}>
          <DataGrid
            rows={developersRows}
            columns={developersColumns}
            rowCount={totalCount}
            rowsPerPageOptions={[10,20,30,50]}
            pageSize={dataPerPage}
            // rowsPerPageOptions={[1]}
            // pagination={false}
            // disableSelectionOnClick
            // pageSize={pageSize}
            paginationMode="server"
            loading={isLoading}
            pagination
            page={currentPage}
            onPageChange={(page)=>dispatch(setCurrentPage(page))}
            onPageSizeChange={(dataPerPage)=>dispatch(setDataPerPage(dataPerPage))}



            // components={
            //   {
            //     // Pagination: CustomPagination,
            //   }
            // }
            // initialState={
            //   {
            //     // pinnedColumns: { left: ["empId"] },
            //   }
            // }
            // componentsProps={
            //   {
            //     // pagination: {
            //     //   totalCount: totalCount,
            //     //   currentPage: currentPage,
            //     //   dataPerPage: dataPerPage,
            //     //   handlePageChange: handlePageChange,
            //     // },
            //     // toolbar: {
            //     //   showQuickFilter: true,
            //     //   quickFilterProps: { debounceMs: 500 },
            //     // },
            //   }
            // }
            // loading={}
            sx={{
              backgroundColor: "white",
              // ".MuiDataGrid-columnSeparator": {
              //   display: "none",
              // },
              "& .MuiDataGrid-columnHeaders": {
                // fontSize: "1rem",
                background: "black",
                color: "white",
              },
              "& .MuiDataGrid-sortIcon": {
                color: "white",
              },
            }}
            showCellRightBorder={true}
            disableColumnMenu={true}
            rowHeight={40}
          />
        </Grid>
        
        {/* rows={projectsRows}
            columns={projectsColumns}
            getRowId={(row)=>row.id} */}
        <Grid item xs={6} sx={{ height: "80vh" }}>
          <DataGrid
            rows={projectsRows}
            columns={projectsColumns}
            getRowId={(row)=>row.id}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 25, 50, 100]}
            // rowsPerPageOptions={[1]}
            pagination={false}
            // disableSelectionOnClick
            loading={isLoading}
            // rowsPerPageOptions={[25, 50, 100]}
            components={
              {
                // Pagination: CustomPagination,
              }
            }
            initialState={
              {
                // pinnedColumns: { left: ["empId"] },
              }
            }
            componentsProps={
              {
                // pagination: {
                //   totalCount: totalCount,
                //   currentPage: currentPage,
                //   dataPerPage: dataPerPage,
                //   handlePageChange: handlePageChange,
                // },
                // toolbar: {
                //   showQuickFilter: true,
                //   quickFilterProps: { debounceMs: 500 },
                // },
              }
            }
            sx={{
              backgroundColor: "white",
              // ".MuiDataGrid-columnSeparator": {
              //   display: "none",
              // },
              "& .MuiDataGrid-columnHeaders": {
                // fontSize: "1rem",
                background: "black",
                color: "white",
              },
              "& .MuiDataGrid-sortIcon": {
                color: "white",
              },
            }}
            disableColumnMenu
            showCellRightBorder={true}
            rowHeight={40}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardItem;
