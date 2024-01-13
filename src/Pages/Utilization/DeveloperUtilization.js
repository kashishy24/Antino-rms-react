import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, MenuItem, TextField, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import AddStatus from "./AddStatus";
import UserLog from "./UserLog";
import { getGroups } from "../../Redux/Slices/Lists/ListsSlice";
import { Box } from "@mui/system";

const developers = [
  {
    name: "deepak Jindal",
    statusLastWeek: "Task assigned and able to do",
    utilizationLastWeek: "76-100%",
    statusCurrentWeek: "Task assigned and able to do",
    utilizationCurrentWeek: "76-100%",
    remark: "Keep it up",
  },
  {
    name: "deepak Jindal",
    statusLastWeek: "Task assigned and able to do",
    utilizationLastWeek: "76-100%",
    statusCurrentWeek: "Task assigned and able to do",
    utilizationCurrentWeek: "76-100%",
    remark: "Keep it up",
  },
  {
    name: "deepak Jindal",
    statusLastWeek: "Task assigned and able to do",
    utilizationLastWeek: "76-100%",
    statusCurrentWeek: "Task assigned and able to do",
    utilizationCurrentWeek: "76-100%",
    remark: "Keep it up",
  },
  {
    name: "deepak Jindal",
    statusLastWeek: "Task assigned and able to do",
    utilizationLastWeek: "76-100%",
    statusCurrentWeek: "Task assigned and able to do",
    utilizationCurrentWeek: "76-100%",
    remark: "Keep it up",
  },
];

const columns = [
  { id: "developerName", label: "Name", align: "center" },
  { id: "statusLastWeek", label: "Status", align: "center" },
  {
    id: "utilizationLastWeek",
    label: "Utilization %",
    align: "center",
  },
  // {
  //   id: "remarkLast",
  //   label: "",
  //   align: "right",
  // },
  { id: "statusCurrentWeek", label: "Status", align: "center" },
  {
    id: "utilizationCurrentWeek",
    label: "Utilization %",
    align: "center",
  },
  // {
  //   id: "remarkCurrent",
  //   label: "",
  //   align: "right",
  // },
  {
    id: "add",
    label: "Add",
    align: "center",
  },
  {
    id: "log",
    label: "",
    align: "center",
  },
];

function createData(
  developerName,
  statusLastWeek,
  utilizationLastWeek,
  remarkLast,
  statusCurrentWeek,
  utilizationCurrentWeek,
  remarkCurrent
) {
  return {
    developerName,
    statusLastWeek: (
      <Tooltip title={statusLastWeek} placement="right" arrow>
        <Box
          component="p"
          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {statusLastWeek}
        </Box>
      </Tooltip>
    ),
    utilizationLastWeek: (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>{utilizationLastWeek}</div>
        <Tooltip title={remarkLast} placement="right" arrow>
          <InfoIcon />
        </Tooltip>
      </div>
    ),
    statusCurrentWeek: (
      <Tooltip title={statusCurrentWeek} placement="right" arrow>
        <Box
          component="p"
          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {statusCurrentWeek}
        </Box>
      </Tooltip>
    ),
    utilizationCurrentWeek: (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>{utilizationCurrentWeek}</div>
        <Tooltip title={remarkCurrent} placement="right" arrow>
          <InfoIcon />
        </Tooltip>
      </div>
    ),
    remarkCurrent,
    add: <EditIcon sx={{ cursor: "pointer" }} />,
    log: <Button>LOG</Button>,
  };
}

const requiredRow = developers.map((developer) =>
  createData(
    developer.name,
    developer.statusLastWeek,
    developer.utilizationLastWeek,
    developer.remark,
    developer.statusCurrentWeek,
    developer.utilizationCurrentWeek,
    developer.remark
  )
);

export default function DeveloperUtilization() {
  const [page, setPage] = useState(0);
  const [openAddStatus, setOpenAddStatus] = useState(false);
  const [openUserLog, setOpenUserLog] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [userLogName, setUserLogName] = useState("");
  const dispatch = useDispatch();
  const { groups } = useSelector((store) => store.getUsers);

  useEffect(() => {
    dispatch(getGroups());
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const clickHandler = () => {
    console.log("clicked");
  };

  const handleGroupChange = (event) => {
    console.log(event.target?.value);
  };

  const addHandler = () => {
    setOpenAddStatus(true);
  };

  const closeAddHandler = () => {
    setOpenAddStatus(false);
  };

  const logHandler = (developerName) => {
    setUserLogName(developerName);
    // console.log(userLogName);
    setOpenUserLog(true);
  };

  const closeLogHandler = () => {
    setOpenUserLog(false);
  };

  return (
    <>
      <AddStatus
        open={openAddStatus}
        onClose={closeAddHandler}
        passedFrom="developer"
      />
      <UserLog
        userLogName={userLogName}
        open={openUserLog}
        onClose={closeLogHandler}
        passedFrom="developer"
      />
      <TableContainer sx={{ height: "80vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead
            sx={{
              "& .MuiTableCell-root": {
                background: "black",
                color: "white",
                whiteSpace: "nowrap",
                padding: "0px",
                top: "0px",
              },
            }}
          >
            <TableRow sx={{ height: "45px" }}>
              <TableCell align="center"></TableCell>
              <TableCell
                align="center"
                colSpan={2}
                sx={{
                  borderLeft: "1px white solid",
                  borderRight: "1px solid white",
                }}
              >
                Last Week Status
              </TableCell>
              <TableCell
                align="center"
                colSpan={3}
                sx={{ borderRight: "1px solid white" }}
              >
                Current Week Status
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
            <TableRow sx={{ height: "45px" }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={
                    {
                      // Set width using column
                      // minWidth: column.minWidth
                    }
                  }
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {requiredRow
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                    sx={{
                      height: "40px",
                      whiteSpace: "nowrap",
                      // overflow: "hidden",
                      // textOverflow: "ellipsis",
                    }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{
                            padding: "0px 10px !important",
                            maxWidth:
                              column.id === "add"
                                ? 75
                                : column.id === "log"
                                ? 75
                                : 125,
                            minWidth:
                              column.id === "add"
                                ? 75
                                : column.id === "log"
                                ? 75
                                : 125,
                            // overflow: "hidden",
                            // textOverflow: "ellipsis",
                          }}
                          onClick={
                            column.id === "add"
                              ? addHandler
                              : column.id === "log"
                              ? () => logHandler(row.developerName)
                              : () => {
                                  return;
                                }
                          }
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
