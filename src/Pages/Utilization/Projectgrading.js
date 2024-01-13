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
import { get_groups } from "../../Redux/Slices/getUsersSlice";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import AddStatus from "./AddStatus";
import UserLog from "./UserLog";
import { Box } from "@mui/system";

const projects = [
  {
    projectName: "Antino-RMS",
    statusLastWeek: "All Good",
    statusCurrentWeek: "Need Improvement",
    remark: "Keep it up",
  },
  {
    projectName: "Antino-RMS",
    statusLastWeek: "All Good",
    statusCurrentWeek: "Need Improvement",
    remark: "Keep it up",
  },
  {
    projectName: "Antino-RMS",
    statusLastWeek: "All Good",
    statusCurrentWeek: "Need Improvement",
    remark: "Keep it up",
  },
  {
    projectName: "Antino-RMS",
    statusLastWeek: "All Good",
    statusCurrentWeek: "Need Improvement",
    remark: "Keep it up",
  },
  {
    projectName: "Antino-RMS",
    statusLastWeek: "All Good",
    statusCurrentWeek: "Need Improvement",
    remark: "Keep it up",
  },
];

const columns = [
  { id: "projectName", label: "Project Name", align: "center" },
  { id: "statusLastWeek", label: "Last Week Status", align: "center" },
  { id: "statusCurrentWeek", label: "Current Week Status", align: "center" },
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
  projectName,
  statusLastWeek,
  remarkLast,
  statusCurrentWeek,
  remarkCurrent
) {
  return {
    projectName,
    statusLastWeek: (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Tooltip title={statusLastWeek} placement="right" arrow>
          <Box
            component="p"
            sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {statusLastWeek}
          </Box>
        </Tooltip>
        <Tooltip title={remarkCurrent} placement="right" arrow>
          <InfoIcon />
        </Tooltip>
      </div>
    ),
    statusCurrentWeek: (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Tooltip title={statusCurrentWeek} placement="right" arrow>
          <Box
            component="p"
            sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {statusCurrentWeek}
          </Box>
        </Tooltip>
        <Tooltip title={remarkCurrent} placement="right" arrow>
          <InfoIcon />
        </Tooltip>
      </div>
    ),
    add: <EditIcon sx={{ cursor: "pointer" }} />,
    log: <Button>LOG</Button>,
  };
}

const requiredRow = projects.map((project) =>
  createData(
    project.projectName,
    project.statusLastWeek,
    project.remark,
    project.statusCurrentWeek,
    project.remark
  )
);

export default function ProjectGrading() {
  const [page, setPage] = useState(0);
  const [openAddStatus, setOpenAddStatus] = useState(false);
  const [openProjectLog, setOpenProjectLog] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [projectLogName, setProjectLogName] = useState("");
  // const dispatch = useDispatch();

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

  const addHandler = () => {
    setOpenAddStatus(true);
  };

  const closeAddHandler = () => {
    setOpenAddStatus(false);
  };

  const logHandler = (projectName) => {
    setProjectLogName(projectName);
    setOpenProjectLog(true);
  };

  const closeLogHandler = () => {
    setOpenProjectLog(false);
  };

  const handleChange = () => {
    console.log("changed");
  };

  return (
    <>
      <AddStatus
        open={openAddStatus}
        onClose={closeAddHandler}
        passedFrom="project"
      />
      <UserLog
        userLogName={projectLogName}
        open={openProjectLog}
        onClose={closeLogHandler}
        passedFrom="project"
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
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    borderLeft: "1px white solid",
                  }}
                  // style={{ top: 57, minWidth: column.minWidth }}
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
                              ? () => logHandler(row.projectName)
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
