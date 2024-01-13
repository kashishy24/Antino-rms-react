import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import React, { useState } from "react";

const years = [
  { _id: 1, name: 2020 },
  { _id: 2, name: 2021 },
  { _id: 3, name: 2022 },
];

const months = [
  { _id: 1, name: "January" },
  { _id: 2, name: "February" },
  { _id: 3, name: "March" },
  { _id: 4, name: "April" },
  { _id: 5, name: "May" },
  { _id: 6, name: "June" },
  { _id: 7, name: "July" },
  { _id: 8, name: "August" },
  { _id: 9, name: "September" },
  { _id: 10, name: "October" },
  { _id: 11, name: "November" },
  { _id: 12, name: "December" },
];

const columns = [
  { id: "week1", label: "Week 1", align: "center" },
  { id: "week2", label: "Week 2", align: "center" },
  {
    id: "week3",
    label: "Week 3",
    align: "center",
  },
  { id: "Week4", label: "Week 4", align: "center" },
];

const UserLog = ({ userLogName, open, onClose, passedFrom }) => {
  const useStyles = makeStyles({
    // container: {
    //   gap: "10px",
    // },
    // containerItem: {
    //   width: "100%",
    //   display: "flex",
    //   justifyContent: "space-between",
    // },
    // inputItem: {
    //   width: "40%",
    // },
    paper: { minWidth: "500px" },
  });

  const classes = useStyles();
  const [isFresher, setIsFresher] = useState("true");

  const handleChange = (event) => {
    setIsFresher(event.target.value);
  };
  return (
    <>
      <Box>
        <Dialog
          // className={classes.paper}
          // maxWidth={"md"}
          open={open}
          close={onClose}
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "100%", // Set your width here
              },
            },
          }}
        >
          <DialogTitle sx={{ padding: "16px 16px 6px 24px" }}>
            <Grid
              container
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                // color: "#49C5B6",
              }}
            >
              LOG
              <Button
                sx={{
                  fontSize: "13px",
                  minWidth: "0px",
                  padding: "0px",
                }}
                onClick={onClose}
              >
                X
              </Button>
            </Grid>
          </DialogTitle>
          <DialogContent sx={{ margin: "16px 16px 6px 24px" }}>
            <Box mt={1}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Grid container>
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <TextField
                        id="outlined-required"
                        select
                        label="Year"
                        size="small"
                        type={"text"}
                        onChange={handleChange}
                        // defaultValue={
                        //   Object.keys(searchFilters).length === 0
                        //     ? ""
                        //     : searchFilters?.role
                        // }
                        sx={{
                          width: "100%",
                          backgroundColor: "white",
                          fontSize: "10px",
                        }}
                        name="year"
                        // style={{ width: "100%", backgroundColor: "white" }}
                        // {...register("role")}
                        // error={errors.role ? true : false}
                        // helperText={errors.role?.message}
                      >
                        {years?.map((role) => (
                          <MenuItem
                            sx={{
                              fontSize: "12px",
                              paddingTop: "3px",
                              paddingBottom: "3px",
                            }}
                            key={role.name}
                            value={role._id}
                          >
                            {role.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={2}>
                      <TextField
                        id="outlined-required"
                        select
                        label="Month"
                        size="small"
                        type={"text"}
                        onChange={handleChange}
                        sx={{
                          width: "100%",
                          backgroundColor: "white",
                          fontSize: "10px",
                        }}
                        name="month"
                        // style={{ width: "100%", backgroundColor: "white" }}
                        // {...register("role")}
                        // error={errors.role ? true : false}
                        // helperText={errors.role?.message}
                      >
                        {months?.map((role) => (
                          <MenuItem
                            sx={{
                              fontSize: "12px",
                              paddingTop: "3px",
                              paddingBottom: "3px",
                            }}
                            key={role.name}
                            value={role._id}
                          >
                            {role.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                  <Grid container mt={2}>
                    <TableContainer
                    // sx={{ maxHeight: 440 }}
                    >
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          {/* <TableRow>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center" colSpan={2}>
                              Last Week Status
                            </TableCell>
                            <TableCell align="center" colSpan={3}>
                              Current Week Status
                            </TableCell>
                            <TableCell align="center"></TableCell>
                          </TableRow> */}
                          <TableRow>
                            <TableCell align="center"></TableCell>
                            {columns.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                // style={{ top: 57, minWidth: column.minWidth }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell
                              align="center"
                              rowSpan={passedFrom === "developer" ? 2 : 1}
                            >
                              {userLogName}
                            </TableCell>
                            {columns.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                // style={{ top: 57, minWidth: column.minWidth }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                          {passedFrom === "developer" && (
                            <TableRow>
                              {columns.map((column) => (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  // style={{ top: 57, minWidth: column.minWidth }}
                                >
                                  {column.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          )}

                          {/* {requiredRow
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => {
                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  tabIndex={-1}
                                  key={row.code}
                                >
                                  {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                      <TableCell
                                        key={column.id}
                                        align={column.align}
                                        onClick={
                                          column.id === "add"
                                            ? addHandler
                                            : column.id === "log"
                                            ? logHandler
                                            : () => {
                                                return;
                                              }
                                        }
                                      >
                                        {column.format &&
                                        typeof value === "number"
                                          ? column.format(value)
                                          : value}
                                      </TableCell>
                                    );
                                  })}
                                </TableRow>
                              );
                            })} */}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </div>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default UserLog;
